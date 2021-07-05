import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tile from './tile';
import {Event} from './event'

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
        // this.persistEvents()
        this.props.landOnTile(0)
        window.addEventListener('keydown', this.handleMove)//consider moving event listener up to game container
    }

    //setting tilearr to local state doesnt work, local state updates after functions are called and they break

    generateTiles = (sideLength=30) => {
        let tileArr = []
        let counter = 0
        for(let y = 0; y < sideLength; y++) {
            for(let x = 0; x < sideLength; x++) {
                //decision on if a tile has an event or not and which icon it has should be made here
                //change hidden attribute back to true once tile reveal method works
                tileArr.push({key: counter, defaultIcon: '.', playerIcon: '@', event: '', occupied: false, hidden: false, xcoord: x, ycoord: y})
                // this.setState({tiles: [...this.state.tiles, {key: counter, defaultIcon: '.', playerIcon: '@', event: '', occupied: false, hidden: false, xcoord: x, ycoord: y}]})
                // this.props.createTile({key: counter, defaultIcon: '.', playerIcon: '@', event: '', occupied: false, hidden: false, xcoord: x, ycoord: y})
                counter++
            }
        }
        this.persistEvents(tileArr)
        this.props.addEvents(tileArr)
        // this.props.createTiles(this.state.tiles)
    }

    getTile = (coords=this.props.position, tiles=this.props.tiles) => {
        return tiles.find((t) => equals(coords, [t.xcoord, t.ycoord]))
    }
    //pull down array of tiles again after generating, populate with events, resend back to redux, then render the new array
    getRandomTile = (tiles) => {

        let target
        do {
            target = this.getTile([(Math.floor(Math.random() * 27)) + 1, (Math.floor(Math.random() * 27)) + 1], tiles)
        } while (!!target.event)
        return target
    }

    persistEvents(tiles) {
        // this.tiles[29][29].event = Event.BEACON
        // const revealed = [this.tiles[29][29], this.tiles[28][29], this.tiles[27][29], this.tiles[29][28], this.tiles[29][27], this.tiles[28][28], this.tiles[27][27], this.tiles[27][28], this.tiles[28][27]]
        // revealed.forEach(t => t.revealTile())

        for(let e in seed) {
            for(let i = 0; i < seed[e]; i++) {
                this.assignEvent(Event[e], tiles)
            }
        }
        // console.log(this.props.tiles)
    }

    assignEvent(event, tiles) {
        let tile = this.getRandomTile(tiles)
        tile.event = event
        return tile
    }

    handleMove = (e) => {//pass up previous tile to return it to unoccupied status
        //currently one move delay on correct move
        //still on one move delay with both local state and redux
        //position changes correctly but rendering the occupied tile is one move behind
        //check the order of when the tiles render and when the dispatches complete
        //look up how to prevent scrolling when hitting arrow keys
        switch (e.key) {
            case 'ArrowUp':
                if (this.props.position[1] > 0){
                    // this.setState({position: [this.state.position[0], this.state.position[1] - 1]})
                    this.props.moveUp(1)
                    this.props.landOnTile(this.getTile().key)
                }
                break;
            case 'ArrowDown':
                if (this.props.position[1] < 29){
                    // this.setState({position: [this.state.position[0], this.state.position[1] + 1]})
                    this.props.moveDown(1)
                    this.props.landOnTile(this.getTile().key)
                }
                break;
            case 'ArrowRight':
                if (this.props.position[0] < 29){
                    // this.setState({position: [this.state.position[0] + 1, this.state.position[1]]})
                    this.props.moveRight(1)
                    this.props.landOnTile(this.getTile().key)
                }
                break;
            case 'ArrowLeft':
                if (this.props.position[0] > 0){
                    // this.setState({position: [this.state.position[0] - 1, this.state.position[1]]})
                    this.props.moveLeft(1)
                    this.props.landOnTile(this.getTile().key)

                }
                break;
            default:
                return
        }
    }

    componentWillUnmount = () => {
        this.props.clearMap()
        window.removeEventListener('keydown', this.handleMove)
        // this.setState({position: [0,0]})
        //clear out tiles from state, reset position to 0,0
    }

    render() {
        return(
            <>
            <button onClick={() => console.log(Event)}>Testing Button</button>
            <div className='map'>
                {this.props.tiles.map(t => {
                    return <Tile
                        key={t.key}
                        defaultIcon={t.defaultIcon} 
                        playerIcon={t.playerIcon}
                        event={t.event}
                        occupied={t.occupied}
                        hidden={t.hidden}
                        xcoord={t.xcoord} 
                        ycoord={t.ycoord}/>
                })}
            </div>
            </>
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
        addEvents: (tiles) => dispatch({type: 'ADD_EVENTS', payload: tiles}),
        landOnTile: (key) => dispatch({type:'LAND_ON_TILE', payload: key}),//dispatch another action to reveal tiles
        clearMap: () => dispatch({type: 'CLEAR_MAP'}),
        moveRight: (dist) => dispatch({type: 'MOVE_RIGHT', payload: dist}),
        moveLeft: (dist) => dispatch({type: 'MOVE_LEFT', payload: dist}),
        moveUp: (dist) => dispatch({type: 'MOVE_UP', payload: dist}),
        moveDown: (dist) => dispatch({type: 'MOVE_DOWN', payload: dist}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map)