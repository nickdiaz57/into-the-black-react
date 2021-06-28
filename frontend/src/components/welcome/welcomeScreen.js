import React, { Component } from 'react';
import { connect } from 'react-redux';
import NameForm from './nameForm'

class WelcomeScreen extends Component {
    //set active user, present a short intro message, then send to game container to play game
    
    headers = {"Accepts": "application/json", "Content-Type": "application/json"}

    setUser = (userName) => {//reeeeeedux
        const url = 'http://localhost:3001/users'

        return fetch(url, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({name: userName})
        }).then(r => r.json())
        .then(console.log)//send to reducer to set active user
        //recheck serializer to make sure win and loss data is sent from backend with user
    }


    render() {
        return(
            <>
                <h3>Welcome, Commander.</h3>
                <NameForm setUser={this.setUser}/>
            </>
        )
    }
}

// const mapDispatchToProps = (state) => {
//     return state//fetch user, then dispatch action SET_USER to reducer that sets user as the active user in state
// }

export default connect(null)(WelcomeScreen)