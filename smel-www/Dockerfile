FROM node:5.11
MAINTAINER Space Apps <spaceapps.sandiego@gmail.com>

ENV NODE_PATH=/usr/local/lib/node_modules/

RUN npm install webpack -g

RUN mkdir -p /var/www

# Set up client
COPY client /var/www/client
WORKDIR /var/www/client
RUN npm install -g && npm run build

# Set up server
COPY server /var/www/server
WORKDIR /var/www/server
RUN npm install -g

EXPOSE 8888
CMD ["npm", "start"]