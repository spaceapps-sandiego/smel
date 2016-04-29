/**
 * @author jjacobson93
 * @date 4/23/2016
 *
 * API for Tweets
 */

class Tweets {
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
        const {rows} = await db.query("SELECT * FROM twitter_tweets ORDER BY weight LIMIT 50");

        // return a promise here
        return Promise.resolve(rows);
    }
}

export default new Tweets();