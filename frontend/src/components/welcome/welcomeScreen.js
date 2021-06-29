import React, { Component } from 'react';
import { connect } from 'react-redux';
import NameForm from './nameForm'

class WelcomeScreen extends Component {
    //set active user, present a short intro message, then send to game container to play game
    
    headers = {"Accepts": "application/json", "Content-Type": "application/json"}

    getUser = (userName) => {
        const url = 'http://localhost:3001/users'

        return fetch(url, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({name: userName})
        }).then(r => r.json())
        .then(json => this.props.setUser(json))
    }


    render() {
        return(
            <>
                <h3>Welcome, Commander.</h3>
                <NameForm getUser={this.getUser}/>
            </>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUser: (user) => dispatch({type: 'SET_USER', payload: user})//action creator?
    }
}

export default connect(null, mapDispatchToProps)(WelcomeScreen)