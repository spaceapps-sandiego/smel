#!/bin/bash

set -e

cp -R /tmp/server/node_modules /var/www/server/node_modules
cp -R /tmp/client/node_modules /var/www/client/node_modules
cp -R /tmp/client/dist /var/www/client/dist

npm start
