import React, { Component } from 'react';
import Tile from './tile';

export default class Map extends Component {

    //create tiles, distribute events, add player to map, all when component mounts

    generateTiles(sideLength=30) {
        let tileArr = []
        for(let y = 0; y < sideLength; y++) {
            for(let x = 0; x < sideLength; x++) {
                let tile = <Tile xcoord={x} ycoord={y}/>
                tileArr.push(tile)
            }
        }
        return tileArr
    }

    render() {
        return(
            <div className='map'>
                {this.generateTiles()}
            </div>
        )
    }

}