/**
 * @author jjacobson93
 * @date 4/22/2016
 */

import React, {Component} from 'react';
import Header from './header';
import EventList from './event_list';

class Content extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xs-12">
                        <Header />
                        <EventList />
                    </div>
                </div>
            </div>
        );
    }
}

export default Content;