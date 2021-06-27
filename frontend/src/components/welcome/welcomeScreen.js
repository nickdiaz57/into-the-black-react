import React, { Component } from 'react';
import NameForm from './nameForm'

export default class WelcomeScreen extends Component {

    render() {
        return(
            <>
                <h3>Welcome, Commander.</h3>
                <NameForm/>
            </>
        )
    }
}