FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY dist /usr/share/nginx/html
RUN nginx -t

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]