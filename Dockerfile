FROM nginx:alpine
COPY /dist/webshop-frontend /home/www/public
COPY nginx.conf /etc/nginx/nginx.conf