/**
 * @author jjacobson93
 * @date 4/24/2016
 */

/**
 * A middleware factory function for injecting the database
 * connection into the request
 * @param {PGConnection} conn
 * @return {Function}
 */
function dbMWFactory(conn) {
    /**
     * @param {Request} req
     * @param {Response} res
     * @param {Function} next
     */
    return function dbMiddleware(req, res, next) {
        req.db = conn;
        next();
    }
}

export default dbMWFactory;