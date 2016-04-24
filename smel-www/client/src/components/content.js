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