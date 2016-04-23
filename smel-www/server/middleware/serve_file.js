/**
 * @author jjacobson93
 * @date 4/23/2016
 *
 * Simple middleware for handling serving index.html
 */

import fs from 'fs-promise';
import wrap from './wrap';

function serveFile(fileName) {
    return wrap(async function serveFileMiddleware(req, res) {
        try {
            var file = await fs.readFile(fileName);
            res.write(file);
            res.end();
        } catch (err) {
            res.status(500).send(err);
        }
    });
}

export default serveFile;