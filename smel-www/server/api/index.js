/**
 * @author jjacobson93
 * @date 4/23/2016
 *
 * Main API file
 */

import events from './events';
import tweets from './tweets';
import wrap from '../middleware/wrap';

/**
 * This wraps an `async` function that returns a promise
 * and sends a response to the requester
 *
 * @param {Function} method
 */
function makeHandler(method) {
    /**
     * @param {http.Request} request
     * @param {http.Response} response
     */
    return function(request, response) {
        let promise = method(request, response);
        if (!(promise instanceof Promise)) {
            promise = Promise.resolve(promise);
        }

        promise
        .then(result => {
            // if the result is an object or an array, send it down as JSON
            if (result instanceof Object || result instanceof Array) {
                return response.json(result);
            }

            response.send(result);
        })
        .catch(error => {
            // unless our resource set the statusCode, let's set it too 500
            if (response.statusCode === 200) {
                response.status(500);
            }

            response.send({ error: error.message });
        })
    }
}

export default { makeHandler };
export { events, tweets };