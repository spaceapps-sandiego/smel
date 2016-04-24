/**
 * @author jjacobson93
 * @date 4/23/2016
 *
 * Component for rendering a list of event cards
 */

import React, {Component} from 'react';
import EventCard from './event_card';
import ajax from '../ajax';

class EventList extends Component {
    constructor() {
        super();
        this.state = { events: [] };
    }

    componentDidMount() {
        // ajax request for the events
        ajax.get('/api/events').then(events => this.setState({ events }));
    }

    render() {
        const events = this.state.events.map(ev => {
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