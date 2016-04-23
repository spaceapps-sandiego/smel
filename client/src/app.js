/**
 * @author jjacobson93
 * @date 4/22/2016
 */

import React, {Component} from 'react';
import Navbar from './components/navbar';
import Content from './components/content';

class App extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <Content />
            </div>
        );
    }
}

export default App;