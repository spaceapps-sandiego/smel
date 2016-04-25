/**
 * @author jjacobson93
 * @date 4/23/2016
 *
 * Component for rendering a list of event cards
 */

import React, {Component} from 'react';
import _ from 'lodash';
import EventCard from './event_card';
import ajax from '../ajax';
import EventType from '../shared/event_type';

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
            const type = EventType.from(ev.type.key);
            const {location, date} = ev;
            const key = [type.key, location, date].join(',');
            return (
                <EventCard
                    type={type}
                    location={location}
                    date={date}
                    key={key} />
            );
        });

        const rows = _(events)
            .chunk(this.props.col)
            .map((row, i) => (
                <div className="row" key={'event-row-' + i}>
                    {row}
                </div>
            )).value();

        return <div>{rows}</div>;
    }
}

EventList.propTypes = {
    col: React.PropTypes.number
};

export default EventList;