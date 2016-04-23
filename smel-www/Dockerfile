FROM node:5.11
MAINTAINER Space Apps <spaceapps.sandiego@gmail.com>

ENV NODE_PATH=/usr/local/lib/node_modules/

RUN npm -g install \
	twitter

RUN mkdir -p /var/www
COPY client /var/www
# COPY server /var/www # Copy server

EXPOSE 8888
WORKDIR /var/www/server

CMD node /var/www/server/index.js
