# Multi-stage Dockerfile for Student CRUD API

# Stage 1: Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY app/package*.json ./

# Install all dependencies (including dev dependencies for potential build steps)
RUN npm ci

# Copy source code
COPY app/ ./

# Stage 2: Production stage
FROM node:18-alpine AS production

WORKDIR /app

# Copy package files
COPY app/package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy source code from builder
COPY --from=builder /app/src ./src

# Create a non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Change ownership of the app directory
RUN chown -R nodejs:nodejs /app

# Switch to non-root user
USER nodejs

# Expose the port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start the application
CMD ["npm", "start"]
