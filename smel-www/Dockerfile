FROM node:5.11
MAINTAINER Space Apps <spaceapps.sandiego@gmail.com>

RUN npm -g install \
	twitter

RUN mkdir -p /var/www
COPY client /var/www
# COPY server /var/www # Copy server

EXPOSE 8888
WORKDIR /var/www

# CMD node /var/www/server/server.js
