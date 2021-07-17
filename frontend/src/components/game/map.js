import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tile from './tile';
import {Event} from './event'
import { Button } from 'react-bootstrap';

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

    componentDidMount = () => {
        this.generateTiles()
        this.props.landOnTile(0)
        window.addEventListener('keydown', this.handleMove)//consider moving event listener up to game container
    }

    //setting tilearr to local state doesnt work, local state updates after functions are called and they break

    generateTiles = (sideLength=30) => {
        let tileArr = []
        let counter = 0
        for(let y = 0; y < sideLength; y++) {
            for(let x = 0; x < sideLength; x++) {
                //change hidden attribute back to true once tile reveal method works
                tileArr.push({key: counter, defaultIcon: '.', playerIcon: '@', event: '', occupied: false, hidden: true, xcoord: x, ycoord: y, visited: false})
                counter++
            }
        }
        tileArr[899].event = Event['BEACON']
        this.persistEvents(tileArr)
        this.props.addEvents(tileArr)
    }

    getTile = (coords=this.props.position, tiles=this.props.tiles) => {
        return tiles.find((t) => equals(coords, [t.xcoord, t.ycoord]))
    }

    getRandomTile = (tiles) => {
        let target
        do {
            target = this.getTile([(Math.floor(Math.random() * 27)) + 1, (Math.floor(Math.random() * 27)) + 1], tiles)
        } while (!!target.event)
        return target
    }

    persistEvents(tiles) {
        for(let e in seed) {
            for(let i = 0; i < seed[e]; i++) {
                this.assignEvent(Event[e], tiles)
            }
        }
    }

    assignEvent(event, tiles) {
        let tile = this.getRandomTile(tiles)
        tile.event = event
        return tile
    }

    seeTiles = (pos=this.props.position) => {
        //tie this to the landOnTile action - thunk?
        //figure out how to see tiles around player and beacon immediately when map loads
        for (let y = pos[1] - 2; y <= pos[1] + 2; y++) {
            for (let x = pos[0] - 2; x <= pos[0] + 2; x++) {
                if(this.isValid(y) && this.isValid(x)) {this.props.revealTile(this.getTile([x,y]).key)}
            }
        }
        //revealed tiles are also on a one move delay
    }

    isValid = (num) => (num >= 0 && num <= 29)

    handleMove = (e) => {//pass up previous tile to return it to unoccupied status
        //currently one move delay on correct move
        //still on one move delay with both local state and redux
        //position changes correctly but rendering the occupied tile is one move behind
        //check the order of when the tiles render and when the dispatches complete
        //look up how to prevent scrolling when hitting arrow keys

        // this.props.landOnTile(this.getTile().key)
        //this erases the trail but now the player cant see where they are
        //probably because of the one move delay problem

        switch (e.key) {
            case 'ArrowUp':
                if (this.props.position[1] > 0){
                    this.props.moveUp(1)
                    this.props.landOnTile(this.getTile().key)
                    this.seeTiles()
                    console.log(this.props.position)
                }
                break;
            case 'ArrowDown':
                if (this.props.position[1] < 29){
                    this.props.moveDown(1)
                    this.props.landOnTile(this.getTile().key)
                    this.seeTiles()
                    console.log(this.props.position)
                }
                break;
            case 'ArrowRight':
                if (this.props.position[0] < 29){
                    this.props.moveRight(1)
                    this.props.landOnTile(this.getTile().key)
                    this.seeTiles()
                    console.log(this.props.position)
                }
                break;
            case 'ArrowLeft':
                if (this.props.position[0] > 0){
                    this.props.moveLeft(1)
                    this.props.landOnTile(this.getTile().key)
                    this.seeTiles()
                    console.log(this.props.position)
                }
                break;
            default:
                return
        }
    }

    displayModal = () => {
        console.log('test')
    }

    componentWillUnmount = () => {
        this.props.clearMap()
        window.removeEventListener('keydown', this.handleMove)
    }

    render() {
        return(
            <>
            <button onClick={() => this.props.endGame()}>End Game Testing Button</button>
            <Button variant='primary' onClick={this.displayModal}>Testing Button</Button>
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
                        ycoord={t.ycoord}
                        visited={t.visited}/>
                })}
            </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user, //remove
        position: state.position,
        tiles: state.tiles
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createTile: (tile) => dispatch({type: 'CREATE_TILE', payload: tile}),
        addEvents: (tiles) => dispatch({type: 'ADD_EVENTS', payload: tiles}),
        landOnTile: (key) => dispatch({type:'LAND_ON_TILE', payload: key}),//dispatch another action to reveal tiles
        revealTile: (key) => dispatch({type: 'REVEAL_TILE', payload: key}),
        clearMap: () => dispatch({type: 'CLEAR_MAP'}),
        moveRight: (dist) => dispatch({type: 'MOVE_RIGHT', payload: dist}),
        moveLeft: (dist) => dispatch({type: 'MOVE_LEFT', payload: dist}),
        moveUp: (dist) => dispatch({type: 'MOVE_UP', payload: dist}),
        moveDown: (dist) => dispatch({type: 'MOVE_DOWN', payload: dist}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map)