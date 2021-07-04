import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tile from './tile';
// import Event from './event'

// const equals = (a, b) => a.length === b.length && a.every((v, i) => v === b[i]);
// const seed = {//add back events at later date
//     OUTPOST: 6, //3,
//     // FIRE: 2,
//     // SPIDERS: 1,
//     DERELICT: 5, //3,
//     DISTRESS: 4, //3,
//     // BLACKHOLE: 1,
//     PIRATE: 6, //2,
//     // TRADER: 4,
//     // PLANET: 2,
//     DEPOT: 7 //5,
//     // STAR: 1,
//     // SHIPYARD: 1
// }

class Map extends Component {

    //create tiles, distribute events, add player to map, all when component mounts
    //map can keep track of the active tile with local state

    state = {
        position: [0,0]
    }

    componentDidMount = () => {
        this.generateTiles()
        this.props.landOnTile(0)
        window.addEventListener('keydown', this.handleMove)//consider moving event listener up to game container
    }

    generateTiles = (sideLength=5) => {//change back to 30
        let counter = 0
        for(let y = 0; y < sideLength; y++) {
            for(let x = 0; x < sideLength; x++) {
                //decision on if a tile has an event or not and which icon it has should be made here
                //change hidden attribute back to true once tile reveal method works
                this.props.createTile({key: counter, defaultIcon: '.', playerIcon: '@', eventIcon: '', occupied: false, hidden: false, xcoord: x, ycoord: y})
                counter++
            }
        }
    }

    handleMove = (e) => {//pass up previous tile to return it to unoccupied status

        switch (e.key) {
            case 'ArrowUp':
                if (this.state.position[1] > 0){
                    this.setState({position: [this.state.position[0], this.state.position[1] - 1]})
                }
                console.log(this.state.position)
                break;
            case 'ArrowDown':
                if (this.state.position[1] < 29){
                    this.setState({position: [this.state.position[0], this.state.position[1] + 1]})
                }
                console.log(this.state.position)
                break;
            case 'ArrowRight':
                if (this.state.position[0] < 29){
                    this.setState({position: [this.state.position[0] + 1, this.state.position[1]]})
                }
                console.log(this.state.position)
                break;
            case 'ArrowLeft':
                if (this.state.position[0] > 0){
                    this.setState({position: [this.state.position[0] - 1, this.state.position[1]]})
                }
                console.log(this.state.position)
                break;
            default:
                return
        }
    }

    componentWillUnmount = () => {
        window.removeEventListener('keydown', this.handleMove)
        //clear out tiles from state, reset position to 0,0
    }

    render() {
        return(
            <div className='map'>
                {this.props.tiles.map(t => {
                    return <Tile
                        key={t.key}
                        defaultIcon={t.defaultIcon} 
                        playerIcon={t.playerIcon}
                        eventIcon={t.eventIcon}
                        occupied={t.occupied}
                        hidden={t.hidden}
                        xcoord={t.xcoord} 
                        ycoord={t.ycoord}/>
                })}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        // position: state.position,
        tiles: state.tiles
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createTile: (tile) => dispatch({type: 'CREATE_TILE', payload: tile}),
        landOnTile: (key) => dispatch({type:'LAND_ON_TILE', payload: {key}})//dispatch another action to reveal tiles
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map)