FROM nginx:latest

ARG BACKEND_HOST=localhost

RUN apt-get update && apt-get install -y \
  curl \
  vim 

COPY . /usr/share/nginx/html

# COPY default.conf /etc/nginx/conf.d/
