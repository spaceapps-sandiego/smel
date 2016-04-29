/**
 * @author jjacobson93
 * @date 4/23/2016
 *
 * API for Events
 */

class Events {
    /**
     * This will get wrapped by the API generator
     * to pass the request and response objects
     * 
     * @param {Request} req
     * @param {Response} res
     * @returns {Promise} the promise object that is resolved by the API wrapper
     */
    async get(req, res) {
        const {db} = req;
        const {rows: events} = await db.query('SELECT * FROM natural_disaster');

        // return a promise here
        return Promise.resolve(events);
    }
}

export default new Events();