import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import type { Response } from 'express';
import { Prisma } from '@prisma/client';

interface ErrorBody {
  error: string;
  message: string;
  details?: unknown;
}

function toErrorCode(value: string): string {
  return value
    .replace(/Exception$/, '')
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .replace(/\s+/g, '_')
    .replace(/[^A-Za-z0-9_]/g, '')
    .toUpperCase();
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    let body: ErrorBody = {
      error: 'INTERNAL_SERVER_ERROR',
      message: 'Internal server error',
    };

    const firstLine = (message: string) =>
      message.split('\n').find((line) => line.trim().length > 0) ?? message;

    if (exception instanceof Prisma.PrismaClientValidationError) {
      status = HttpStatus.BAD_REQUEST;
      body = {
        error: 'BAD_REQUEST',
        message: firstLine(exception.message),
        details: exception.message,
      };
    } else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      const codes: Record<string, HttpStatus> = {
        P2002: HttpStatus.CONFLICT,
        P2003: HttpStatus.CONFLICT,
        P2025: HttpStatus.NOT_FOUND,
      };
      status = codes[exception.code] ?? HttpStatus.BAD_REQUEST;
      body = {
        error: toErrorCode(exception.name),
        message: firstLine(exception.message),
        details: exception.meta,
      };
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();

      if (typeof res === 'string') {
        body = { error: toErrorCode(exception.name), message: res };
      } else {
        const resObj = res as Record<string, unknown>;
        const messages = Array.isArray(resObj.message) ? resObj.message : [];

        body = {
          error: toErrorCode(
            typeof resObj.error === 'string' ? resObj.error : exception.name,
          ),
          message: messages.length
            ? messages.join(', ')
            : typeof resObj.message === 'string'
              ? resObj.message
              : exception.message,
        };

        if (messages.length) {
          body.details = messages;
        }

        if (resObj.details !== undefined) {
          body.details = resObj.details;
        }
      }
    }

    response.status(status).json(body);
  }
}