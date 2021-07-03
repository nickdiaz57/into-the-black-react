import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tile from './tile';

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

    componentDidMount = () => {
        this.generateTiles()
    }

    generateTiles = (sideLength=5) => {//change back to 30
        let counter = 0
        for(let y = 0; y < sideLength; y++) {
            for(let x = 0; x < sideLength; x++) {
                //decision on if a tile has an event or not and which icon it has should be made here
                this.props.createTile({key: counter, defaultIcon: '.', playerIcon: '@', eventIcon: '', occupied: false, xcoord: x, ycoord: y})
                counter++
            }
        }
    }

    displayTiles = () => {
        let tileArr = []
        for(let t in this.props.tiles) {
            tileArr.push(<Tile
                 key={this.props.tiles[t].key}
                 defaultIcon={this.props.tiles[t].defaultIcon} 
                 playerIcon={this.props.tiles[t].playerIcon}
                 eventIcon={this.props.tiles[t].eventIcon}
                 occupied={this.props.tiles[t].occupied}
                 xcoord={this.props.tiles[t].xcoord} 
                 ycoord={this.props.tiles[t].ycoord}/>)
        }
        return tileArr
    }

    handleMove = () => {
        this.props.landOnTile(0)
    }
    //instead of trying to change the icon in the state, try adding multiple possible icon values in each tile and switching which
    //one renders based on if an event is present or if the tile is occupied or visited

    render() {
        return(
            <div className='map'>
                {this.displayTiles()}
                <button onClick={this.handleMove}>Start</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        position: state.position,
        tiles: state.tiles
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createTile: (tile) => dispatch({type: 'CREATE_TILE', payload: tile}),
        landOnTile: (key) => dispatch({type:'LAND_ON_TILE', payload: {key}})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map)