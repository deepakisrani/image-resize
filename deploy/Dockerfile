FROM --platform=linux/amd64 node:21-alpine3.18
RUN apk update && apk add nginx

WORKDIR '/app'
COPY package.json .
# COPY ./deploy/nginx/nginx.conf /etc/nginx/sites-enabled/default
COPY ./deploy/nginx/nginx.conf /etc/nginx/nginx.conf


RUN npm install
COPY . .

# Make port 80 available to the world outside this container
EXPOSE 80

# Copy the entrypoint script into the container
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Run entrypoint.sh at container launch
CMD ["/entrypoint.sh"]
