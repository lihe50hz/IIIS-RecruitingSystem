FROM nginx:1.23.4-alpine-slim

WORKDIR /app
RUN sed -i '3c\worker_processes ${WORKER_PROCESS};' /etc/nginx/nginx.conf
COPY html /usr/share/nginx/html