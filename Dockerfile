# ---------- Stage 1: Build Frontend ----------
FROM node:18-alpine AS frontend-builder

# Set working directory
WORKDIR /app

# Copy frontend files
COPY package*.json ./
COPY vite.config.* ./
COPY public ./public
COPY src ./src
COPY scripts ./scripts

# Install dependencies and build frontend
RUN npm install
RUN npm run build

# ---------- Stage 2: Build Backend ----------
FROM node:18-alpine AS backend-builder

WORKDIR /app

# Copy backend files
COPY cyberhub-backend/package*.json ./cyberhub-backend/
WORKDIR /app/cyberhub-backend
RUN npm install --production

# Copy backend source code
COPY cyberhub-backend ./cyberhub-backend

# Copy built frontend into backend's public folder
COPY --from=frontend-builder /app/dist ./public

# ---------- Stage 3: Final Image ----------
FROM node:18-alpine

WORKDIR /app

# Copy backend from builder
COPY --from=backend-builder /app/cyberhub-backend ./

# Expose app port
EXPOSE 3000

# Start the backend (which serves frontend)
CMD ["node", "server.js"]
