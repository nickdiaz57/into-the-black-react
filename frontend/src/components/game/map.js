import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tile from './tile';

const equals = (a, b) => a.length === b.length && a.every((v, i) => v === b[i]);
const seed = {//add back events at later date
    OUTPOST: 6, //3,
    // FIRE: 2,
    // SPIDERS: 1,
    DERELICT: 5, //3,
    DISTRESS: 4, //3,
    // BLACKHOLE: 1,
    PIRATE: 6, //2,
    // TRADER: 4,
    // PLANET: 2,
    DEPOT: 7 //5,
    // STAR: 1,
    // SHIPYARD: 1
}

class Map extends Component {

    //create tiles, distribute events, add player to map, all when component mounts
    //map can keep track of the active tile with local state

    componentDidMount = () => {
        this.generateTiles()
    }

    generateTiles(sideLength=30) {
        for(let y = 0; y < sideLength; y++) {
            for(let x = 0; x < sideLength; x++) {
                //decision on if a tile has an event or not and which icon it has should be made here
                //id attribute for tile

                this.props.createTile({key: [x,y], icon: '.', xcoord: x, ycoord: y})
            }
        }
    }



    render() {
        return(
            <div className='map'>
                {this.props.tiles.map((t) => <Tile key={t.key} icon={t.icon} xcoord={t.xcoord} ycoord={t.ycoord}/>)}
            </div>
        )
    }
//on rerender, map through this.props.tiles and render grid that way
}

const mapStateToProps = (state) => {//map rerenders every time these particular pieces of state change
    //after rerender map rerender tiles
    //map remembers each tile and their icons and events and coordinates
    return {
        position: state.position,
        tiles: state.tiles
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createTile: (tile) => dispatch({type: 'CREATE_TILE', payload: tile})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map)