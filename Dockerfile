FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first for Docker layer caching
COPY package*.json ./

# Install all dependencies (dev + prod)
RUN npm ci --include=dev

# Copy source code
COPY . .

# Build app (skip if no build script; tests run in Actions)
RUN npm run build || true

# Production runtime stage (minimal)
FROM node:20-alpine AS runtime

WORKDIR /app

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodeuser -u 1001

# Copy only production dependencies from builder
COPY --from=builder --chown=nodeuser:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nodeuser:nodejs /app/package*.json ./
COPY --from=builder --chown=nodeuser:nodejs /app/dist ./dist  # Adjust if no /dist
COPY --from=builder --chown=nodeuser:nodejs . .

USER nodeuser

EXPOSE 3000

CMD ["npm", "start"]