# ---------- Stage 1: Build Frontend ----------
FROM node:18-alpine AS frontend-builder

WORKDIR /app

# Copy frontend files first (leverage Docker cache)
COPY package*.json vite.config.* ./
COPY public ./public
COPY src ./src
COPY scripts ./scripts

# Install and build frontend
RUN npm ci
RUN npm run build

# ---------- Stage 2: Build Backend ----------
FROM node:18-alpine AS backend-builder

WORKDIR /app

# Copy backend package.json & install only production deps
COPY cyberhub-backend/package*.json ./
RUN npm ci --only=production

# Copy backend source
COPY cyberhub-backend/ ./

# Copy built frontend into backend's "public" folder
COPY --from=frontend-builder /app/dist ./public

# ---------- Stage 3: Final Image ----------
FROM node:18-alpine

WORKDIR /app

# Copy backend build & frontend assets
COPY --from=backend-builder /app ./

# Set environment
ENV NODE_ENV=production

# Expose the same port as in server.js (default 5000, Koyeb overrides via $PORT)
EXPOSE 5000

# Healthcheck (optional, good for Koyeb)
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s \
  CMD wget -qO- http://127.0.0.1:${PORT:-5000}/api/health || exit 1

# Start backend server
CMD ["node", "server.js"]
