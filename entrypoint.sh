# #!/bin/bash
# npm run watch > /dev/null 2>&1 &
# # Start Nginx
# nginx -g 'daemon off;'
#!/bin/bash

# Start Nginx in the background
nginx

# Start your Express.js app
node server.js