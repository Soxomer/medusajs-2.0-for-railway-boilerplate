import { loadEnv } from '@medusajs/utils'
import { assertValue } from '../utils/assert-value'

// Load and expand environment variables
loadEnv(process.env.NODE_ENV || 'development', process.cwd())

// Database connection components
const DB_HOST = process.env.DB_HOST || 'localhost'
const DB_PORT = process.env.POSTGRES_PORT || '5432'
const DB_USER = process.env.POSTGRES_USER || 'postgres'
const DB_PASS = process.env.POSTGRES_PASSWORD || 'postgres'
const DB_NAME = process.env.POSTGRES_DB || 'medusa-db'

// Construct DATABASE_URL
const constructedDatabaseUrl = `postgresql://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}?ssl_mode=disable`

// Required environment variables
const requiredEnvVars = {
  DATABASE_URL: process.env.DATABASE_URL,
  ADMIN_CORS: process.env.ADMIN_CORS,
  AUTH_CORS: process.env.AUTH_CORS,
  STORE_CORS: process.env.STORE_CORS,
  JWT_SECRET: process.env.JWT_SECRET,
  COOKIE_SECRET: process.env.COOKIE_SECRET
}

// Validate required variables (throws if missing)
Object.entries(requiredEnvVars).forEach(([key, value]) => {
  assertValue(value, `Environment variable for ${key} is not set`)
})

// Optional variables with defaults
const optionalEnvVars = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  BACKEND_URL: process.env.MEDUSA_BACKEND_URL ?? process.env.RAILWAY_PUBLIC_DOMAIN_VALUE ?? 'http://localhost:9000',
  REDIS_URL: process.env.REDIS_URL,
  MINIO_ENDPOINT: process.env.MINIO_ENDPOINT,
  MINIO_PORT: process.env.MINIO_PORT,
  MINIO_USE_SSL: process.env.MINIO_USE_SSL,
  MINIO_ACCESS_KEY: process.env.MINIO_ACCESS_KEY,
  MINIO_SECRET_KEY: process.env.MINIO_SECRET_KEY,
  MINIO_BUCKET: process.env.MINIO_BUCKET,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  RESEND_FROM_EMAIL: process.env.RESEND_FROM,
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  SENDGRID_FROM_EMAIL: process.env.SENDGRID_FROM_EMAIL,
  STRIPE_API_KEY: process.env.STRIPE_API_KEY,
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
  MEILISEARCH_HOST: process.env.MEILISEARCH_HOST,
  MEILISEARCH_API_KEY: process.env.MEILISEARCH_API_KEY,
  MEDUSA_WORKER_MODE: process.env.MEDUSA_WORKER_MODE as 'worker' | 'server' | 'shared' | undefined,
  MEDUSA_DISABLE_ADMIN: process.env.MEDUSA_DISABLE_ADMIN === 'true'
}

// Validate optional variables (warns if missing)
Object.entries(optionalEnvVars).forEach(([key, value]) => {
  assertValue(value, `Environment variable for ${key} is not set`, 'warn')
})

// Export all variables
export const {
  BACKEND_URL,
  REDIS_URL,
  MINIO_ENDPOINT,
  MINIO_PORT,
  MINIO_USE_SSL,
  MINIO_ACCESS_KEY,
  MINIO_SECRET_KEY,
  MINIO_BUCKET,
  RESEND_API_KEY,
  RESEND_FROM_EMAIL,
  SENDGRID_API_KEY,
  SENDGRID_FROM_EMAIL,
  STRIPE_API_KEY,
  STRIPE_WEBHOOK_SECRET,
  MEILISEARCH_HOST,
  MEILISEARCH_API_KEY,
  MEDUSA_WORKER_MODE = 'shared',
  MEDUSA_DISABLE_ADMIN = false
} = optionalEnvVars

export const {
  DATABASE_URL,
  ADMIN_CORS,
  AUTH_CORS,
  STORE_CORS,
  JWT_SECRET,
  COOKIE_SECRET
} = requiredEnvVars