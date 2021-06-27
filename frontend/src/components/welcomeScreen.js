import React, { Component } from 'react';
import NameForm from './nameForm'

export default class WelcomeScreen extends Component {

    render() {
        return(
            <>
                <h1>Into the Black</h1>
                <NameForm/>
            </>
        )
    }
}