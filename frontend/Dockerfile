# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json .
RUN npm install

COPY . .
RUN npm run build

# Production stage
FROM nginx:1.19-alpine

RUN rm -f /etc/nginx/conf.d/*

COPY --from=builder /app/build /usr/share/nginx/html

COPY conf/nginx.conf /etc/nginx/conf.d/default.conf

CMD ["sh", "-c", "echo '--- Loaded NGINX Config ---'; cat /etc/nginx/conf.d/default.conf; nginx -g 'daemon off;'"]

EXPOSE 8080