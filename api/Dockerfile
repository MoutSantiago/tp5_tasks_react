# Build
FROM node:22-slim AS builder
WORKDIR /opt

RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm ci

COPY prisma ./prisma
RUN npx prisma generate

COPY . .
RUN npm run build

# Producción
FROM node:22-slim AS production
WORKDIR /opt
ENV NODE_ENV=production

RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm ci && npm cache clean --force

COPY --from=builder /opt/dist ./dist
COPY --from=builder /opt/prisma ./prisma
RUN npx prisma generate

USER node
EXPOSE 3000
CMD ["node", "dist/main"]

# Desarrollo
FROM node:22-slim AS development
WORKDIR /opt

RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm ci

COPY . .
RUN npx prisma generate

CMD ["npm", "run", "start:dev"]