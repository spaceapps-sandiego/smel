/**
 * @author jjacobson93
 * @date 4/22/2016
 *
 * Define the routes JSX
 */

import React from 'react';
import {Router, Route, browserHistory} from 'react-router';
import App from './app';

const routes = (
    <Router history={browserHistory}>
        <Route path="/" component={App}/>
    </Router>
);

export default routes;