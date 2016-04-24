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
            const {type, location, date} = ev;
            const key = [type, location, date].join(',');

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