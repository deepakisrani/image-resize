FROM --platform=linux/amd64 node:21-alpine3.18
RUN apk update && apk add nginx

WORKDIR '/app'
COPY package.json .
COPY ./deploy/nginx/nginx.conf /etc/nginx/sites-enabled/default

RUN npm install
COPY . .

EXPOSE 80
CMD ["/app/start_services.sh"]