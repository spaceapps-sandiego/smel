/**
 * @author jjacobson93
 * @date 4/23/2016
 *
 * Main application file
 */

import express from 'express';
import path from 'path';
import fs from 'fs';
import api, {events, tweets} from './api';
import serveFile from './middleware/serve_file';
import dbMiddleware from './middleware/db';
import {pgCheck, conn} from './db';
import initTwitter from './aggregators/twitter';
import NaturalUSGS from './aggregators/natural-usgs';
import NaturalRelief from './aggregators/natural-relief';
import NaturalEONET from './aggregators/natural-eonet';

const BUNDLE_PATH = path.join(__dirname, '../client/dist/bundle.js');
const INDEX_PATH = path.join(__dirname, '../client/index.html');
const FAVICON = path.join(__dirname, './favicon.ico');
const PORT = process.env.PORT || 8888;

pgCheck(function() {
    const app = express();

    app.use(dbMiddleware(conn));

    app.get('/bundle.js', serveFile(BUNDLE_PATH));
    app.get('/favicon.ico', serveFile(FAVICON));

    // api routes
    app.get('/api/events', api.makeHandler(events.get));
    app.get('/api/tweets', api.makeHandler(tweets.get));

    // anything else just serves index.html
    app.get('*', serveFile(INDEX_PATH));

    app.listen(PORT, '0.0.0.0', (err) => {
        if (err) {
            console.error(err);
        }

        console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', PORT, PORT);
    });

    initTwitter(conn);
    var nat_usgs = new NaturalUSGS(conn);
    var nat_relief = new NaturalRelief(conn);
    var nat_eonet = new NaturalEONET(conn);
});
