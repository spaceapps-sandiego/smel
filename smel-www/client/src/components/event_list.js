/**
 * @author jjacobson93
 * @date 4/23/2016
 *
 * Component for rendering a list of event cards
 */

import React, {Component} from 'react';
import EventCard from './event_card';

class EventList extends Component {
    render() {
        const events = this.props.events.map(ev => {
            var loc = `(${ev.location.lat}, ${ev.location.long})`;
            var key = [ev.type, loc, ev.date].join(',');

            return (
                <EventCard
                    type={ev.type}
                    location={ev.location}
                    date={ev.date}
                    key={key} />
            );
        })

        return (
            <div className="row">
                {events}
            </div>
        );
    }
}

EventList.propTypes = {
    events: React.PropTypes.arrayOf(React.PropTypes.shape(EventCard.propTypes))
};

export default EventList;