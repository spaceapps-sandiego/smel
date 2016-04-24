/**
 * @author jjacobson93
 * @date 4/23/2016
 *
 * API for Tweets
 */

const tweets = [
    { message: 'hi' }
];

class Tweets {
    async get() {
        // TODO: Do your DB queries here
        return Promise.resolve(tweets);
    }
}

export default new Tweets();