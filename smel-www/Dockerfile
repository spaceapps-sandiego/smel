FROM node:5.11
MAINTAINER Space Apps <spaceapps.sandiego@gmail.com>

# ENV NODE_PATH=/usr/local/lib/node_modules/

RUN mkdir -p /var/www && mkdir -p /tmp/client && mkdir -p /tmp/server 

# Set up client
COPY client /tmp/client
RUN cd /tmp/client && npm install && npm run build
COPY client /var/www/client
RUN cp -R /tmp/client/node_modules /var/www/client/node_modules
RUN cp -R /tmp/client/dist /var/www/client/dist

# Set up server
COPY server/package.json /tmp/server/package.json
RUN cd /tmp/server && npm install
COPY server /var/www/server
RUN cp -R /tmp/server/node_modules /var/www/server/node_modules

EXPOSE 8888
# CMD ["npm", "start"]
COPY docker-entrypoint.sh /
RUN chmod +x docker-entrypoint.sh
WORKDIR /var/www/server
CMD ["/docker-entrypoint.sh"]