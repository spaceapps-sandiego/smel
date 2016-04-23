#!/bin/bash

set -e

rm -rf /var/www/client/node_modules
rm -rf /var/www/client/dist
rm -rf /var/www/server/node_modules

cp -R /tmp/server/node_modules /var/www/server/
cp -R /tmp/client/node_modules /var/www/client/
cp -R /tmp/client/dist /var/www/client/dist

npm start
