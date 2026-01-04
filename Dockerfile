FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --include=dev
COPY . .
# No build/test RUN commands

FROM node:20-alpine
WORKDIR /app
RUN addgroup -g 1001 nodejs && adduser -S nodeuser -u 1001
COPY --from=builder --chown=nodeuser:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nodeuser:nodejs package*.json ./
COPY --from=builder --chown=nodeuser:nodejs . .  # Copies everything needed
USER nodeuser
EXPOSE 3000
CMD ["npm", "start"]
