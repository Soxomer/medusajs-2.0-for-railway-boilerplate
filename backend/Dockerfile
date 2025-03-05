FROM node:22-slim AS builder

WORKDIR /app

# Install build dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy source files
COPY . .

# Build the application
RUN yarn build

# Clean install production dependencies
RUN yarn install --production

# Production stage
FROM node:22-slim

WORKDIR /app

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 medusa && \
    chown -R medusa:nodejs /app

# Install system dependencies required for production
RUN apt-get update && \
    apt-get install -y openssl curl && \
    rm -rf /var/lib/apt/lists/*

# Copy built assets from builder
COPY --from=builder --chown=medusa:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=medusa:nodejs /app/.medusa ./.medusa
COPY --from=builder --chown=medusa:nodejs /app/package.json ./package.json

# Switch to non-root user
USER medusa

# Set production environment
ENV NODE_ENV=production \
    PORT=9000

EXPOSE 9000

# Health check
# HEALTHCHECK --interval=30s --timeout=3s --start-period=30s \
#     CMD curl -f http://localhost:9000/health || exit 1

CMD ["yarn", "start"] 