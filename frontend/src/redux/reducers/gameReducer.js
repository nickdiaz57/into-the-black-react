export default function GameReducer(state = {user: {}, player: {}, position: [0,0], tiles: []}, action) {

    switch (action.type){
        case 'MOVE_RIGHT':
            return {...state, position: [state.position[0] + action.payload, state.position[1]]}
        case 'MOVE_LEFT':
            return {...state, position: [state.position[0] - action.payload, state.position[1]]}
        case 'MOVE_UP':
            return {...state, position: [state.position[0], state.position[1] - action.payload]}
        case 'MOVE_DOWN':
            return {...state, position: [state.position[0], state.position[1] + action.payload]}
        case 'SET_USER': //separate out
            return {...state, user: action.payload}
        case 'CLEAR_USER': //separate out
            return {...state, user: {}}
        case 'CREATE_TILE':
            return {...state, tiles: [...state.tiles, action.payload]}
        case 'ADD_EVENTS':
            return {...state, tiles: action.payload}
        case 'LAND_ON_TILE':
            let newTiles = state.tiles
            newTiles.splice(action.payload, 1, {...newTiles[action.payload], occupied: !newTiles[action.payload].occupied})
            return {...state, tiles: newTiles}
        case 'REVEAL_TILE'://FIX THIS
            let newTiles1 = state.tiles
            newTiles1.splice(action.payload, 1, {...newTiles1[action.payload], hidden: false})
            return {...state, tiles: newTiles1}
        case 'CLEAR_MAP':
            return {...state, position: [0,0], tiles: []}
        default:
            return state
    }
}