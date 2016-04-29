/**
 * @author jjacobson93
 * @date 4/23/2016
 *
 * Component for rendering a list of tweet cards
 */

import React, {Component} from 'react';
import _ from 'lodash';
import TweetCard from './tweet_card';
import ajax from '../ajax';

class TweetList extends Component {
    constructor() {
        super();
        this.state = { tweets: [] };
    }

    componentDidMount() {
        // ajax request for the tweets
        ajax.get('/api/tweets').then(tweets => this.setState({ tweets }));
    }

    render() {
        const tweets = this.state.tweets.map(ev => {
            const {screen_name, term_matched, time, text} = ev;
            const key = [screen_name, term_matched, time, text].join(',');
            return (
                <TweetCard
                    screen_name={screen_name}
                    term_matched={term_matched}
                    time={time}
                    text={text}
                    key={key} />
            );
        });

        const rows = _(tweets)
            .chunk(this.props.col)
            .map((row, i) => (
                <div className="row" key={'tweet-row-' + i}>
                    {row}
                </div>
            )).value();

        return <div>{rows}</div>;
    }
}

TweetList.propTypes = {
    col: React.PropTypes.number
};

export default TweetList;