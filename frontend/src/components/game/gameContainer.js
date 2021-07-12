import React, { Component } from 'react';
import { connect } from 'react-redux';
import Map from './map';

const equals = (a, b) => a.length === b.length && a.every((v, i) => v === b[i]);

class GameContainer extends Component {

    //check win condition
    //check loss condition
    checkGameOver = () => {
        if (equals(this.props.position, [29,29])) {
            //win
            console.log('win')
        } else if(this.props.player.health <=0 || this.props.player.fuel <= 0) {
            //lose
        }
    }//run this after a move or end of an event

    //event handling and display

    //handle fuel, health, scrap levels

    //inventory panel, text boxes and buttons, message feed
    render() {
        return(
            <div>
                <h1>Game Container</h1>
                <Map/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        position: state.position,
        player: state.player
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer)