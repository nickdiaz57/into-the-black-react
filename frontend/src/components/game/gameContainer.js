import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { winGame } from '../../redux/actions/mapActions';
import Map from './map';

const equals = (a, b) => a.length === b.length && a.every((v, i) => v === b[i]);

class GameContainer extends Component {

    state = {
        gameOver: false
    }

    checkGameOver = () => {
        if (equals(this.props.position, [29,29])) {
            this.props.winGame()
            this.endGame()
        } else if(this.props.player.health <=0 || this.props.player.fuel <= 0) {
            this.endGame()
        }
    }//run this after a move or end of an event

    endGame = () => this.setState({gameOver: true})

    render() {
        if (this.state.gameOver === true) {
            return <Redirect to='/end' />
        } else {
            return(
                <div>
                    <Map checkGameOver={this.checkGameOver} endGame={this.endGame}/>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        position: state.game.position,
        player: state.game.player
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        winGame: () => dispatch(winGame())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer)