#!/bin/bash
npm run watch > /dev/null 2>&1 &
# Start Nginx
nginx -g 'daemon off;'