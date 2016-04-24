/**
 * @author jjacobson93
 * @date 4/23/2016
 */

import React, {Component} from 'react';
import moment from 'moment';

class MomentAgo extends Component {
    componentDidMount() {
        const {interval} = this.props;
        clearTimeout(this.interval_);
        this.interval_ = setInterval(() => this.forceUpdate(), interval);
    }

    componentWillUnmount() {
        clearTimeout(this.interval_);
    }

    render() {
        const {date} = this.props;
        return <span>{moment(date).fromNow()}</span>;
    }
}

MomentAgo.propTypes = {
    date: React.PropTypes.string,
    interval: React.PropTypes.number
};

export default MomentAgo;