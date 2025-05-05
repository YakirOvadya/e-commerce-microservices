FROM node:18-slim AS builder

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

FROM nginxinc/nginx-unprivileged

COPY ./build /usr/share/nginx/html
COPY ./conf/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]