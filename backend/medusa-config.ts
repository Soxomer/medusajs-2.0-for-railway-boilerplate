import { loadEnv, Modules, defineConfig } from "@medusajs/utils";
import { InputConfig } from "@medusajs/types";
import {
  ADMIN_CORS,
  AUTH_CORS,
  BACKEND_URL,
  COOKIE_SECRET,
  DATABASE_URL,
  JWT_SECRET,
  REDIS_URL,
  RESEND_API_KEY,
  RESEND_FROM_EMAIL,
  SENDGRID_API_KEY,
  SENDGRID_FROM_EMAIL,
  SHOULD_DISABLE_ADMIN,
  STORE_CORS,
  STRIPE_API_KEY,
  STRIPE_WEBHOOK_SECRET,
  WORKER_MODE,
  MINIO_ENDPOINT,
  MINIO_PORT,
  MINIO_ACCESS_KEY,
  MINIO_SECRET_KEY,
  MINIO_BUCKET,
  MINIO_USE_SSL,
  MEILISEARCH_HOST,
  MEILISEARCH_API_KEY,
} from "./src/lib/constants";
import { resolve } from "path";

loadEnv(process.env.NODE_ENV, process.cwd());

// Core configuration
const projectConfig= {
  databaseUrl: DATABASE_URL,
  databaseLogging: false,
  redisUrl: REDIS_URL,
  redisOptions: {
    family: 0
  },
  workerMode: WORKER_MODE,
  http: {
    adminCors: ADMIN_CORS,
    authCors: AUTH_CORS,
    storeCors: STORE_CORS,
    jwtSecret: JWT_SECRET,
    cookieSecret: COOKIE_SECRET,
  },
};

// Admin configuration
const adminConfig = {
  backendUrl: BACKEND_URL,
  disable: process.env.DISABLE_MEDUSA_ADMIN === "true",
};

// File storage configuration
const getFileStorageConfig = () => {
  if (MINIO_ENDPOINT && MINIO_PORT && MINIO_ACCESS_KEY && MINIO_SECRET_KEY) {
    return {
      resolve: "./src/modules/minio-file",
      id: "minio",
      options: {
        endPoint: MINIO_ENDPOINT,
        port: MINIO_PORT,
        useSSL: MINIO_USE_SSL === "true",
        accessKey: MINIO_ACCESS_KEY,
        secretKey: MINIO_SECRET_KEY,
        bucket: MINIO_BUCKET,
      },
    };
  }

  return {
    resolve: "@medusajs/file-local",
    id: "local",
    options: {
      upload_dir: "static",
      backend_url: `${BACKEND_URL}/static`,
    },
  };
};

// Redis-dependent modules
const getRedisModules = () =>
  REDIS_URL
    ? [
      {
        resolve: "@medusajs/medusa/cache-redis",
        options: {
          redisUrl: process.env.REDIS_URL,
        },
      },
      {
        resolve: "@medusajs/medusa/event-bus-redis",
        options: {
          redisUrl: process.env.REDIS_URL,
        },
      },
      {
        resolve: "@medusajs/medusa/workflow-engine-redis",
        options: {
          redis: {
            url: process.env.REDIS_URL,
          },
        },
      },
    ]
    : [];

// Email notification configuration
const getNotificationModule = () => {
  if (
    !(
      (SENDGRID_API_KEY && SENDGRID_FROM_EMAIL) ||
      (RESEND_API_KEY && RESEND_FROM_EMAIL)
    )
  ) {
    return [];
  }

  const providers = [
    ...(SENDGRID_API_KEY && SENDGRID_FROM_EMAIL
      ? [
        {
          resolve: "@medusajs/notification-sendgrid",
          id: "sendgrid",
          options: {
            channels: ["email"],
            api_key: SENDGRID_API_KEY,
            from: SENDGRID_FROM_EMAIL,
          },
        },
      ]
      : []),
    ...(RESEND_API_KEY && RESEND_FROM_EMAIL
      ? [
        {
          resolve: "./src/modules/email-notifications",
          id: "resend",
          options: {
            channels: ["email"],
            api_key: RESEND_API_KEY,
            from: RESEND_FROM_EMAIL,
          },
        },
      ]
      : []),
  ];

  return [
    {
      key: Modules.NOTIFICATION,
      resolve: "@medusajs/notification",
      options: { providers },
    },
  ];
};

// Payment module configuration
const getPaymentModule = () =>
  STRIPE_API_KEY && STRIPE_WEBHOOK_SECRET
    ? [
      {
        key: Modules.PAYMENT,
        resolve: "@medusajs/payment",
        options: {
          providers: [
            {
              resolve: "@medusajs/payment-stripe",
              id: "stripe",
              options: {
                apiKey: STRIPE_API_KEY,
                webhookSecret: STRIPE_WEBHOOK_SECRET,
              },
            },
          ],
        },
      },
    ]
    : [];

// Search module configuration
const getSearchModule = () =>
  MEILISEARCH_HOST && MEILISEARCH_API_KEY
    ? [
      {
        resolve: "@rokmohar/medusa-plugin-meilisearch",
        options: {
          config: {
            host: MEILISEARCH_HOST,
            apiKey: MEILISEARCH_API_KEY,
          },
          settings: {
            products: {
              indexSettings: {
                searchableAttributes: ["title", "description", "variant_sku"],
                displayedAttributes: [
                  "id",
                  "title",
                  "description",
                  "variant_sku",
                  "thumbnail",
                  "handle",
                ],
              },
              primaryKey: "id",
            },
          },
        },
      },
    ]
    : [];

const getMarketplaceModule = () => {
  return [
    {
      resolve: "./src/modules/marketplace",
    },
  ];
};

// Combine all modules
const modules = [
  { resolve: "./src/modules/launch-list" },
  ...getMarketplaceModule(),
  {
    key: Modules.FILE,
    resolve: "@medusajs/file",
    options: {
      providers: [getFileStorageConfig()],
    },
  },
  ...getRedisModules(),
  ...getNotificationModule(),
  ...getPaymentModule(),
  // ...getSearchModule(),
  ...getMarketplaceModule(),
];

const medusaConfig = {
  projectConfig,
  admin: adminConfig,
  modules,
  plugins: [],
};

console.log(JSON.stringify(medusaConfig, null, 2));
export default defineConfig(medusaConfig);
