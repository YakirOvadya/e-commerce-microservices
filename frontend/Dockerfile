# Build stage
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy all files and install dependencies
COPY . .
RUN npm install && npm run build

# Production stage
FROM nginx:alpine

# Create writable temp directories for NGINX
RUN mkdir -p /tmp/nginx && chmod -R 777 /tmp/nginx

# Copy built frontend assets
COPY --from=builder /app/build /usr/share/nginx/html

# Copy custom NGINX config
COPY ./conf/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Start NGINX in the foreground
CMD ["nginx", "-g", "daemon off;"]