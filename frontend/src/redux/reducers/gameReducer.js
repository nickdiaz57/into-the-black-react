export default function GameReducer(state = {user: {}, position: [0,0], tiles: []}, action) {

    switch (action.type){
        case 'MOVE_RIGHT':
            return {...state, position: [state.position[0] + action.payload, state.position[1]]}
        case 'MOVE_LEFT':
            return {...state, position: [state.position[0] - action.payload, state.position[1]]}
        case 'MOVE_UP':
            return {...state, position: [state.position[0], state.position[1] - action.payload]}
        case 'MOVE_DOWN':
            return {...state, position: [state.position[0], state.position[1] + action.payload]}
        case 'SET_USER': 
            return {...state, user: action.payload}//separate out
        case 'CREATE_TILE':
            // return {...state, tiles: {.../state.tiles, [action.payload.key]: action.payload}}
            return {...state, tiles: [...state.tiles, action.payload]}
            // return {...state, tiles: action.payload}
        case 'ADD_EVENTS':
            return {...state, tiles: action.payload}
        case 'LAND_ON_TILE':
            // let target = state.tiles[action.payload.key]
            // target.occupied = !target.occupied
            let newTiles = state.tiles
            newTiles.splice(action.payload, 1, {...newTiles[action.payload], occupied: !newTiles[action.payload].occupied})
            return {...state, tiles: newTiles//tiles: {
                        //     ...state.tiles, [action.payload.key]: {
                        //         ...state.tiles[action.payload.key], occupied: !state.tiles[action.payload.key].occupied
                        //     }
                        // }
                    }
        case 'CLEAR_MAP':
            return {...state, position: [0,0], tiles: []}
        // case 'UPDATE':
        //     return {
        //         ...state, 
        //         tiles: {
        //             ...state.tiles, 
        //             state.tiles.filter(tile => tile.key === action.payload.key ? fuck : this)
        //         },
        //         icon:
        //     }
        default:
            return state
    }
}