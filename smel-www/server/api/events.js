/**
 * @author jjacobson93
 * @date 4/23/2016
 *
 * API for Events
 */

import EventType from '../shared/event_type';

const events = [{
    type: EventType.Earthquake,
    location: 'San Diego, California, United States',
    date: (new Date()).toISOString()
}, {
    type: EventType.SevereStorm,
    location: 'Ellwood City, Pennsylvania, United States',
    date: (new Date()).toISOString()
}, {
    type: EventType.Earthquake,
    location: 'Ambo, Huánuco, Peru',
    date: (new Date()).toISOString()
}, {
    type: EventType.SevereStorm,
    location: 'Bolton, Bladen County, North Carolina, United States',
    date: (new Date()).toISOString()
}, {
    type: EventType.Landslide,
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