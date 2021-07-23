import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { clearUser } from '../../redux/actions/userActions'
import { resetWon } from '../../redux/actions/mapActions';
import { Button } from 'react-bootstrap'

class EndScreen extends Component {

    state = {
        newGame: false,
        toWelcome: false
    }

    headers = {"Accepts": "application/json", "Content-Type": "application/json"}

    submitGame = () => {
        const url = 'http://localhost:3001/games'
        let record = {user: {name: this.props.user.name}, game: {completed: true, won: this.props.won}}

        return fetch(url, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(record)
        }).then(r => r.json())
        .then(this.props.resetWon())
    }

    getWins = (user) => user.games.filter(x => x.completed === true && x.won === true).length

    getLosses = (user) => user.games.filter(x => x.completed === true && x.won === false).length

    render() {
        if (this.state.toWelcome === true) {
            this.submitGame()
            this.props.clearUser()
            return <Redirect to='/' />
        } else if (this.state.newGame === true) {
            this.submitGame()
            return <Redirect to='/play' />
        } else {
            return(
                <div>
                    <h1>Game Over</h1>
                    {this.props.won ? 
                        <>
                        <h3>Congratulations, Commander {this.props.user.name}.</h3>
                        <p>You have successfully navigated across the system and reached the beacon.</p>
                        </>
                        :
                        <>
                        <h3>Defeat</h3>
                        <p>Your ship is incapacitated, and your journey has ended.</p>
                        </>
                    }
                    <p><b>Wins: </b>{this.getWins(this.props.user)}</p>
                    <p><b>Losses: </b>{this.getLosses(this.props.user)}</p>
                    <Button variant='primary' onClick={() => this.setState({newGame: true})}>Play Again</Button>
                    <Button variant='secondary' onClick={() => this.setState({toWelcome: true})}>Exit</Button>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        won: state.game.won
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        clearUser: () => dispatch(clearUser()),
        resetWon: () => dispatch(resetWon())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EndScreen)