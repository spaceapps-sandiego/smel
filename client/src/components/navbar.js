/**
 * @author jjacobson93
 * @date 4/22/2016
 */

import React, {Component} from 'react';
import {Link} from 'react-router';

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-default navbar-static-top">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link className="navbar-brand" to="/">SMEL</Link>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;