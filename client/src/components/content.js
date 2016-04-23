/**
 * @author jjacobson93
 * @date 4/22/2016
 */

import React, {Component} from 'react';
import Header from './header';

class Content extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <Header />
                        <p className="lead">
                            Eventually we're going to put some more stuff here where you can see stuff about dangers
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Content;