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
            return {...state, tiles: [...state.tiles, action.payload]}//id attribute
        default:
            return state
    }
}