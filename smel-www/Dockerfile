FROM node:5.11
MAINTAINER Space Apps <spaceapps.sandiego@gmail.com>

ENV NODE_PATH=/usr/local/lib/node_modules/

RUN mkdir -p /var/www

# Set up client
COPY client /var/www/client
WORKDIR /var/www/client
RUN npm -g install && npm run build

# Set up server
COPY server /var/www/server
WORKDIR /var/www/server
RUN npm -g install

EXPOSE 8888
CMD ["npm", "start"]