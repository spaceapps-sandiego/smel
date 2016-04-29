/**
 * @author jjacobson93
 * @date 4/24/2016
 */

import React, {Component} from 'react';
import MomentAgo from './moment_ago';

class TweetCard extends Component {
    render() {
        const {
            // id,
            screen_name,
            // user_id,
            // weight,
            term_matched,
            // nat_distr,
            time,
            text
            // location,
            // place_id
        } = this.props;
        return (
            <div className="col-xs-12 col-md-4">
                <div className="panel panel-default">
                    <div className="panel-body">
                        <span className="tweet-date"><MomentAgo date={time} interval={5*1000}/> by {screen_name}</span>
                        <span className="tweet-heading">{term_matched}</span>
                        <p>{text}</p>
                    </div>
                </div>
            </div>
        );
    }
}

TweetCard.propTypes = {
    screen_name: React.PropTypes.string,
    term_matched: React.PropTypes.string,
    time: React.PropTypes.string,
    text: React.PropTypes.string
};

export default TweetCard;