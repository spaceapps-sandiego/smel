/**
 * @author jjacobson93
 * @date 4/23/2016
 */

import React, {Component} from 'react';
import MomentAgo from './moment_ago';

class EventCard extends Component {
    render() {
        const {type, location, date} = this.props;
        return (
            <div className="col-xs-12 col-md-4">
                <div className="panel panel-default">
                    <div className="panel-body">
                        <div className="event-date text-muted"><MomentAgo date={date} interval={5*1000}/></div>
                        <span className="event-heading">{type} at {location}</span>
                    </div>
                </div>
            </div>
        );
    }
}

EventCard.propTypes = {
    type: React.PropTypes.string,
    location: React.PropTypes.string,
    date: React.PropTypes.string
};

export default EventCard;