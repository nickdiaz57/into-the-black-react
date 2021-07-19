import React, { Component } from 'react';
import { connect } from 'react-redux';
import NameForm from './nameForm';
import { Redirect } from 'react-router-dom'
import { setUser } from '../../redux/actions/userActions'

class WelcomeScreen extends Component {
    //set active user, present a short intro message, then send to game container to play game

    state = {
        toGame: false
    }
    
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

    loginUser = (userName) => {
        this.getUser(userName)
            .then(() => this.setState({toGame: true}))
    }//display error message if login does not go through


    render() {
        if (this.state.toGame === true) {
            return <Redirect to='/play' />
        } else {
            return(
                <>
                <h3>Welcome, Commander.</h3>
                <NameForm loginUser={this.loginUser}/>
                </>
            )
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUser: (user) => dispatch(setUser(user))
    }
}

export default connect(null, mapDispatchToProps)(WelcomeScreen)