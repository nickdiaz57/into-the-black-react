export default function UserReducer(state = {}, action) {
    switch (action.type){
        case 'SET_USER': //separate out
            return action.payload
        case 'CLEAR_USER': //separate out
            return {}
        default:
            return state
    }
}