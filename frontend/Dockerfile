# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

COPY . .

RUN npm install && npm run build

# Production stage using unprivileged NGINX for OpenShift
FROM nginxinc/nginx-unprivileged:alpine

# Copy built React app
COPY --from=builder /app/build /usr/share/nginx/html

# Copy custom NGINX configuration
COPY conf/nginx.conf /etc/nginx/conf.d/default.conf

# Run container on unprivileged port
EXPOSE 8080

# Run as non-root user (required by OpenShift)
USER 1001

CMD ["nginx", "-g", "daemon off;"]
