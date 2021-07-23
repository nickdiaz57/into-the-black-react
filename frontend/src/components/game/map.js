import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tile from './tile';
import InventoryPanel from './inventoryPanel'
import { Event } from './event'
import { createMap, clearMap, landOnTile, revealTile } from '../../redux/actions/mapActions'
import { changeResource, moveUp, moveDown, moveLeft, moveRight } from '../../redux/actions/playerActions'

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
        window.addEventListener('keydown', this.handleMove)
    }

    generateTiles = (sideLength=30) => {
        let tileArr = []
        let counter = 0
        for(let y = 0; y < sideLength; y++) {
            for(let x = 0; x < sideLength; x++) {
                tileArr.push({key: counter, defaultIcon: '.', playerIcon: '@', event: '', occupied: false, hidden: true, xcoord: x, ycoord: y, visited: false})
                counter++
            }
        }
        tileArr[0].occupied = true
        tileArr[0].hidden = false
        tileArr[899].event = Event['BEACON']
        this.addEvents(tileArr)
        this.props.createMap(tileArr)
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

    addEvents(tiles) {
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
        for (let y = pos[1] - 2; y <= pos[1] + 2; y++) {
            for (let x = pos[0] - 2; x <= pos[0] + 2; x++) {
                if(this.isValid(y) && this.isValid(x)) {this.props.revealTile(this.getTile([x,y]).key)}
            }
        }
    }

    isValid = (num) => (num >= 0 && num <= 29)

    handleMove = (e) => {
        this.props.changeResource('fuel', -2)

        switch (e.key) {
            case 'ArrowUp':
                if (this.props.position[1] > 0){
                    this.props.moveUp(1)
                }
                break;
            case 'ArrowDown':
                if (this.props.position[1] < 29){
                    this.props.moveDown(1)
                }
                break;
            case 'ArrowRight':
                if (this.props.position[0] < 29){
                    this.props.moveRight(1)
                }
                break;
            case 'ArrowLeft':
                if (this.props.position[0] > 0){
                    this.props.moveLeft(1)
                }
                break;
            default:
                return
        }
        this.props.landOnTile(this.getTile().key)
        this.seeTiles()
        this.props.checkGameOver()
    }

    componentWillUnmount = () => {
        this.props.clearMap()
        window.removeEventListener('keydown', this.handleMove)
    }

    render() {
        return(
            <>
            {/* <button onClick={() => this.props.endGame()}>End Game Testing Button</button> */}
            <InventoryPanel />
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
        position: state.game.position,
        tiles: state.game.tiles
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createMap: (tiles) => dispatch(createMap(tiles)),
        landOnTile: (key) => dispatch(landOnTile(key)),//dispatch another action to reveal tiles
        revealTile: (key) => dispatch(revealTile(key)),
        clearMap: () => dispatch(clearMap()),
        moveRight: (dist) => dispatch(moveRight(dist)),
        moveLeft: (dist) => dispatch(moveLeft(dist)),
        moveUp: (dist) => dispatch(moveUp(dist)),
        moveDown: (dist) => dispatch(moveDown(dist)),
        changeResource: (resource, amount) => dispatch(changeResource(resource,amount))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map)