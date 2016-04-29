/**
 * @author jjacobson93
 * @date 4/22/2016
 */

import React, {Component} from 'react';
import Header from './header';
import EventList from './event_list';
import TweetList from './tweet_list';

class Content extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xs-12">
                        <Header />
                        <h3>Tweets</h3>
                        <TweetList col={3}/>
                        <h3>Disasters</h3>
                        <EventList col={3}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Content;