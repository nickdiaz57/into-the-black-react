import React, { Component } from 'react';
import Map from './map';

export default class GameContainer extends Component {

    render() {
        return(
            <div>
                <h1>Game Container</h1>
                <Map/>
            </div>
        )
    }
}