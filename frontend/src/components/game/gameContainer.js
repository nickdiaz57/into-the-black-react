import React, { Component } from 'react';
import { connect } from 'react-redux';
import Map from './map';
import { connect } from 'react-redux';

class GameContainer extends Component {

    //inventory panel, text boxes and buttons, message feed
    render() {
        return(
            <div>
                <h1>Game Container</h1>
                <Map/>
            </div>
        )
    }
}

export default connect()(GameContainer)