# Build stage
FROM node:18-slim AS builder

WORKDIR /app

COPY package.json . 
RUN npm install

COPY . .
RUN npm run build

# Production stage
FROM nginxinc/nginx-unprivileged

COPY --from=builder /app/build /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d/default.conf

RUN echo "--- CURRENT NGINX CONF ---" && cat /etc/nginx/conf.d/default.conf

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
