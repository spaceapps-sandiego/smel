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

const BUNDLE_PATH = path.join(__dirname, '../client/dist/bundle.js');
const INDEX_PATH = path.join(__dirname, '../client/index.html');
const FAVICON = path.join(__dirname, './favicon.ico');
const PORT = process.env.PORT || 8888;

const app = express();

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
