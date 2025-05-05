# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

COPY . .

RUN npm install && npm run build

# Production stage
FROM nginxinc/nginx-unprivileged:1.25-alpine

COPY --from=builder /app/build /usr/share/nginx/html

COPY conf/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080
USER 101

CMD ["nginx", "-g", "daemon off;"]
