import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { clearUser } from '../../redux/actions/userActions'

class EndScreen extends Component {

    state = {
        newGame: false,
        toWelcome: false
    }

    headers = {"Accepts": "application/json", "Content-Type": "application/json"}

    submitGame = () => {
        //fetch request to send game to backend
        const url = 'http://localhost:3001/games'
        console.log(this.props.user)
        let record = {user: {name: this.props.user.name}, game: {completed: true, won: false}}
        console.log(record)

        return fetch(url, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(record)
        }).then(r => r.json())
        .then(console.log)
    }

    render() {
        //these break sporadically, sometimes they throw a 500 error for server is busy/locked, other times they work fine
        //the record is still submitted to the database and it persists, sometimes it will send the record back up to frontend
        //sometimes it will send the 500 error instead
        if (this.state.toWelcome === true) {
            this.submitGame()
            this.props.clearUser()//error message received here but state updates correctly, look into this
            return <Redirect to='/' />
        } else if (this.state.newGame === true) {
            this.submitGame()
            return <Redirect to='/play' />
        } else {
            return(
                <div>
                    <h1>End Screen</h1>
                    <button onClick={() => this.setState({newGame: true})}>New Game</button>
                    <button onClick={() => this.setState({toWelcome: true})}>Exit</button>
                </div>
            )
        }//make sure the fetches arent happening twice, maybe?
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        clearUser: () => dispatch(clearUser())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EndScreen)