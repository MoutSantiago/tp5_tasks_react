import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import type { Response } from 'express';
import { Prisma } from '@prisma/client';

/**
 * Contrato de la forma que tendrá toda respuesta de error que devuelva la API.
 * Permite que el frontend no tenga que adivinar el error según el status code.
 */
interface ErrorBody {
  /** Código legible del error, p.ej. `BAD_REQUEST`, `TASK_NOT_FOUND` */
  error: string;
  /** Mensaje corto pensado para el usuario final */
  message: string;
  /** Detalle adicional (mensaje crudo, metadatos de Prisma, validaciones...) */
  details?: unknown;
}

/**
 * Convierte el nombre de una excepción de tipo "CamelCaseConException" en un
 * código de error legible en formato SCREAMING_SNAKE_CASE.
 *
 * `BadRequestException` -> `BAD_REQUEST`
 * `PrismaClientKnownRequestError` -> `PRISMA_CLIENT_KNOWN_REQUEST_ERROR`
 * `Task not found` -> `TASK_NOT_FOUND`
 */
function toErrorCode(value: string): string {
  return value
    .replace(/Exception$/, '') // quita el sufijo "Exception"
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2') // separa transiciones mayúscula/minúscula
    .replace(/\s+/g, '_') // espacios a guiones bajos
    .replace(/[^A-Za-z0-9_]/g, '') // elimina caracteres inválidos
    .toUpperCase(); // todo en mayúsculas
}

/**
 * Filtro global de excepciones de NestJS.
 *
 * POR QUÉ EXISTE: por defecto NestJS, ante un error no manejado, devuelve una
 * respuesta HTML/JSON con formato de Nest, y ante errores de Prisma devuelve
 * un montón de información interna (stack traces, mensajes crudos de la DB).
 * Este filtro unifica TODOS los errores a una misma forma JSON consistente
 * ({ error, message, details }), oculta los datos sensibles de Prisma y mapea
 * los errores más comunes a sus status codes HTTP correctos.
 *
 * Como está decorado con @Catch() sin argumentos, atrapa cualquier excepción
 * que se lance en la app, sin importar su tipo.
 */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  /**
   * Método que NestJS invoca cuando se lanza una excepción en cualquier
   * controlador/servicio.
   * @param exception El error capturado (puede ser cualquier cosa)
   * @param host Acceso al contexto HTTP para obtener la Response de Express
   */
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // Valor por defecto: error del servidor. Se sobreescribe según el tipo.
    let status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    let body: ErrorBody = {
      error: 'INTERNAL_SERVER_ERROR',
      message: 'Internal server error',
    };

    // Los mensajes de Prisma suelen venir en varias líneas, donde la primera es
    // una cabecera informativa ("Invalid `prisma.task.findFirst()` invocation")
    // y el resto el detalle real. Tomamos solo la primera línea útil para el
    // campo `message` y guardamos el mensaje completo en `details`.
    const firstLine = (message: string) =>
      message.split('\n').find((line) => line.trim().length > 0) ?? message;

    if (exception instanceof Prisma.PrismaClientValidationError) {
      // Error de VALIDACIÓN de Prisma: se intentó una consulta con argumentos
      // inválidos (campo inexistente, tipo incorrecto). Es culpa del cliente,
      // así que corresponde 400.
      status = HttpStatus.BAD_REQUEST;
      body = {
        error: 'BAD_REQUEST',
        message: firstLine(exception.message),
        details: exception.message,
      };
    } else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      // Errores CONOCIDOS de la base de datos, identificados por un código:
      //   P2002: violación de unicidad (duplicado)      -> 409
      //   P2003: violación de integridad referencial     -> 409
      //   P2025: registro no encontrado al operar        -> 404
      // Cualquier otro código se trata como 400.
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
      // Excepciones HTTP propias de NestJS (NotFoundException, BadRequestException,
      // ConflictException, etc.). Mantienen su status y mensaje originales.
      status = exception.getStatus();
      // El cuerpo puede ser un string simple o un objeto (cuando Nest produce
      // el cuerpo de validación con los mensajes de class-validator).
      const res = exception.getResponse();

      if (typeof res === 'string') {
        // Caso simple: la excepción se creó con un solo mensaje de texto.
        body = { error: toErrorCode(exception.name), message: res };
      } else {
        // Caso objeto: extraemos el error y el/los message(s) del cuerpo.
        const resObj = res as Record<string, unknown>;
        // class-validator devuelve `message` como array de strings (uno por
        // campo fallido), así que lo normalizamos a array.
        const messages = Array.isArray(resObj.message) ? resObj.message : [];

        body = {
          error: toErrorCode(
            typeof resObj.error === 'string' ? resObj.error : exception.name,
          ),
          message: messages.length
            ? // Múltiples mensajes de validación -> una sola string separada por coma
              messages.join(', ')
            : typeof resObj.message === 'string'
              ? resObj.message
              : exception.message,
        };

        // Adjuntamos el detalle solo cuando aporta algo: los errores de
        // validación individuales o un `details` explícito definido por nosotros.
        if (messages.length) {
          body.details = messages;
        }

        if (resObj.details !== undefined) {
          body.details = resObj.details;
        }
      }
    }
    // Cualquier otro error (no Prisma, no HttpException): queda como
    // 500 INTERNAL_SERVER_ERROR, sin filtrar información interna alguna.

    response.status(status).json(body);
  }
}