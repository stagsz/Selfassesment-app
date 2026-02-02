# Stage 1: Dependencies
# Install all dependencies needed for the build
FROM node:20-alpine AS deps

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy package files for dependency installation
COPY frontend/package*.json ./frontend/
COPY shared/package*.json ./shared/
COPY package*.json ./

# Install dependencies
WORKDIR /app/frontend
RUN npm ci

# Stage 2: Builder
# Build the Next.js application
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/frontend/node_modules ./frontend/node_modules
COPY --from=deps /app/node_modules ./node_modules 2>/dev/null || true

# Copy shared package
COPY shared ./shared/

# Copy frontend source code
COPY frontend ./frontend/

# Build the application
WORKDIR /app/frontend
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Stage 3: Runtime
# Minimal production image
FROM node:20-alpine AS runtime

# Install wget for health checks
RUN apk add --no-cache wget

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

WORKDIR /app

# Set production environment
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Copy public assets
COPY --from=builder /app/frontend/public ./public

# Set up standalone output directory
# Automatically leverages output traces to only include needed files
RUN mkdir .next && chown nextjs:nodejs .next

# Copy standalone server and static files
COPY --from=builder --chown=nextjs:nodejs /app/frontend/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/frontend/.next/static ./.next/static

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "frontend/server.js"]
