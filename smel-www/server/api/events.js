/**
 * @author jjacobson93
 * @date 4/23/2016
 *
 * API for Events
 */

const events = [{
    type: 'Earthquake',
    location: 'San Diego, California, United States',
    date: (new Date()).toISOString()
}, {
    type: 'Tornado',
    location: 'Ellwood City, Pennsylvania, United States',
    date: (new Date()).toISOString()
}, {
    type: 'Earthquake',
    location: 'Ambo, Huánuco, Peru',
    date: (new Date()).toISOString()
}, {
    type: 'Hurricane',
    location: 'Bolton, Bladen County, North Carolina, United States',
    date: (new Date()).toISOString()
}, {
    type: 'Alien Invasion',
    location: 'Benede Oranje, Northern Cape, South Africa',
    date: (new Date()).toISOString()
}];

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
        // TODO: Do your DB queries here

        // return a promise here
        return Promise.resolve(events);
    }
}

export default new Events();