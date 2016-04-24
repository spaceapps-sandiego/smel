/**
 * @author jjacobson93
 * @date 4/23/2016
 */

import React, {Component} from 'react';
import ajax from '../ajax';
import MomentAgo from './moment_ago';

const MAPS_API = 'http://maps.googleapis.com/maps/api/geocode/json';

function latLongToAddress(lat, long) {
    return ajax.get(MAPS_API + '?latlng=' + [lat, long].join(','));
}

class EventCard extends Component {
    constructor(props) {
        super(props);

        var {location: {lat, long}} = this.props;
        this.state = {
            location: `(${lat}, ${long})`,
            isLatLong: true
        };

        latLongToAddress(lat, long)
        .then(res => {
            const [first={}] = JSON.parse(res).results;
            let {address_components: addressComps} = first;

            if (addressComps !== undefined) {
                addressComps = addressComps.reduce((comp, {long_name, types}) => {
                    if (types[0] === 'country' ||
                        types[0] === 'administrative_area_level_1' ||
                        types[0] === 'administrative_area_level_2' ||
                        types[0] === 'locality') {
                        comp[types[0]] = long_name;
                    }

                    return comp;
                }, {});


                const {country,
                    administrative_area_level_1: lvl1,
                    administrative_area_level_2: lvl2,
                    locality} = addressComps;
                const location = [locality, lvl2, lvl1, country]
                    .filter(x => x !== undefined)
                    .join(', ');
                this.setState({ location, isLatLong: false });
            }
        });
    }

    render() {
        const {type, date} = this.props;
        const {location, isLatLong} = this.state;

        return (
            <div className="col-xs-12 col-md-4">
                <div className="panel panel-default">
                    <div className="panel-body">
                        <div className="event-date"><MomentAgo date={date} interval={5*1000}/></div>
                        <span className="event-heading">{type} {isLatLong ? 'at' : 'in'} {location}</span>
                    </div>
                </div>
            </div>
        );
    }
}

EventCard.propTypes = {
    type: React.PropTypes.string,
    location: React.PropTypes.shape({
        lat: React.PropTypes.number,
        long: React.PropTypes.number
    }),
    date: React.PropTypes.string
};

export default EventCard;