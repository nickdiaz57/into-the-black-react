import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Map from './map';

const equals = (a, b) => a.length === b.length && a.every((v, i) => v === b[i]);

class GameContainer extends Component {

    state = {
        gameOver: false
    }

    //check win condition
    //check loss condition
    checkGameOver = () => {
        if (equals(this.props.position, [29,29])) {
            //win
            console.log('win')
        } else if(this.props.player.health <=0 || this.props.player.fuel <= 0) {
            //lose
            console.log('lose')
        }
    }//run this after a move or end of an event

    //event handling and display

    //handle fuel, health, scrap levels

    //inventory panel, text boxes and buttons, message feed
    render() {
        if (this.state.gameOver === true) {
            return <Redirect to='/end' />
        } else {
            return(
                <div>
                    <h1>Game Container</h1>
                    <Map checkGameOver={this.checkGameOver} endGame={() => this.setState({gameOver: true})}/>
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
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer)