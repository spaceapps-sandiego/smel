/**
 * @author jjacobson93
 * @date 4/22/2016
 */

import React, {Component} from 'react';
import Header from './header';
import EventList from './event_list';

class Content extends Component {
    render() {
        const events = [{
            type: 'Earthquake',
            location: {
                lat: 32.784594,
                long: -117.169659
            },
            date: (new Date()).toISOString()
        }, {
            type: 'Tornado',
            location: {
                lat: 40.8394,
                long: -80.29384
            },
            date: (new Date()).toISOString()
        }, {
            type: 'Earthquake',
            location: {
                lat: -10.075897,
                long: -76.206739
            },
            date: (new Date()).toISOString()
        }, {
            type: 'Earthquake',
            location: {
                lat: -59.1595,
                long: 102.0593
            },
            date: (new Date()).toISOString()
        }, {
            type: 'Hurricane',
            location: {
                lat: 34.381239,
                long: -78.4085
            },
            date: (new Date()).toISOString()
        }, {
            type: 'Alien Invasion',
            location: {
                lat: -28.2238,
                long: 20.48303
            },
            date: (new Date()).toISOString()
        }];

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xs-12">
                        <Header />
                        <EventList events={events}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Content;