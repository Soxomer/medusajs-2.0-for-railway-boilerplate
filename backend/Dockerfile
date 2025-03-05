FROM node:22-slim AS builder

WORKDIR /app

# Build arguments for required environment variables
ARG NODE_ENV=development
ARG ADMIN_CORS
ARG STORE_CORS
ARG AUTH_CORS
ARG JWT_SECRET
ARG COOKIE_SECRET
ARG DATABASE_URL
ARG REDIS_URL
ARG POSTGRES_USER
ARG POSTGRES_PASSWORD
ARG POSTGRES_DB
ARG REDIS_PORT
ARG MINIO_ENDPOINT
ARG MINIO_ROOT_USER
ARG MINIO_ROOT_PASSWORD
ARG MINIO_BUCKET
ARG MINIO_PORT
ARG MINIO_USE_SSL
ARG MEDUSA_ADMIN_EMAIL
ARG MEDUSA_ADMIN_PASSWORD

# Set build-time environment variables from args
ENV NODE_ENV=${NODE_ENV} \
    ADMIN_CORS=${ADMIN_CORS} \
    STORE_CORS=${STORE_CORS} \
    AUTH_CORS=${AUTH_CORS} \
    JWT_SECRET=${JWT_SECRET} \
    COOKIE_SECRET=${COOKIE_SECRET} \
    DATABASE_URL=${DATABASE_URL} \
    REDIS_URL=${REDIS_URL} \
    POSTGRES_USER=${POSTGRES_USER} \
    POSTGRES_PASSWORD=${POSTGRES_PASSWORD} \
    POSTGRES_DB=${POSTGRES_DB} \
    REDIS_PORT=${REDIS_PORT} \
    MINIO_ENDPOINT=${MINIO_ENDPOINT} \
    MINIO_ROOT_USER=${MINIO_ROOT_USER} \
    MINIO_ROOT_PASSWORD=${MINIO_ROOT_PASSWORD} \
    MINIO_BUCKET=${MINIO_BUCKET} \
    MINIO_PORT=${MINIO_PORT} \
    MINIO_USE_SSL=${MINIO_USE_SSL} \
    MEDUSA_ADMIN_EMAIL=${MEDUSA_ADMIN_EMAIL} \
    MEDUSA_ADMIN_PASSWORD=${MEDUSA_ADMIN_PASSWORD}

# Install build dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy source files
COPY . .

# Build the application
RUN yarn build

# Clean install production dependencies
RUN yarn install --production

# Production stage
FROM node:22-slim

WORKDIR /app

# Install system dependencies required for production
RUN apt-get update && \
    apt-get install -y openssl curl && \
    rm -rf /var/lib/apt/lists/*

# Copy built assets from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.medusa ./.medusa
COPY --from=builder /app/package.json ./package.json

# Set production environment variables with defaults
ENV NODE_ENV=production \ 
    PORT=9000 \
    ADMIN_CORS=${ADMIN_CORS:-http://localhost:7000,http://localhost:7001} \
    STORE_CORS=${STORE_CORS:-http://localhost:8000} \
    AUTH_CORS=${AUTH_CORS:-http://localhost:7000,http://localhost:7001} \
    JWT_SECRET=${JWT_SECRET:-supersecret} \
    COOKIE_SECRET=${COOKIE_SECRET:-supersecret} \
    DATABASE_URL=${DATABASE_URL:-postgresql://postgres:postgres@postgres:5432/medusa-db} \
    REDIS_URL=${REDIS_URL:-redis://redis:6379} \
    POSTGRES_USER=${POSTGRES_USER:-postgres} \
    POSTGRES_PASSWORD=${POSTGRES_PASSWORD:-postgres} \
    POSTGRES_DB=${POSTGRES_DB:-medusa-db} \
    REDIS_PORT=${REDIS_PORT:-6379} \
    MINIO_ENDPOINT=${MINIO_ENDPOINT:-minio} \
    MINIO_ROOT_USER=${MINIO_ROOT_USER:-minioadmin} \
    MINIO_ROOT_PASSWORD=${MINIO_ROOT_PASSWORD:-minioadmin} \
    MINIO_BUCKET=${MINIO_BUCKET:-medusa-media} \
    MINIO_PORT=${MINIO_PORT:-9000} \
    MINIO_USE_SSL=${MINIO_USE_SSL:-false} \
    MEDUSA_ADMIN_EMAIL=${MEDUSA_ADMIN_EMAIL:-admin@medusa.com} \
    MEDUSA_ADMIN_PASSWORD=${MEDUSA_ADMIN_PASSWORD:-password}

EXPOSE 9000

CMD ["yarn", "start"]