/**
 * @author jjacobson93
 * @date 4/24/2016
 */

import promisify from '../promisify';

/**
 * A middleware factory function for injecting the database
 * connection into the request
 * @param {PGConnection} conn
 * @return {Function}
 */
function dbMWFactory(conn) {
    const query = promisify(conn.query, conn);

    /**
     * @param {Request} req
     * @param {Response} res
     * @param {Function} next
     */
    return function dbMiddleware(req, res, next) {
        req.db = { query };
        next();
    }
}

export default dbMWFactory;