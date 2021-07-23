const url = 'http://localhost:3001/users'

export const setUser = (user) => ({type: 'SET_USER', payload: user})

export const clearUser = () => ({type: 'CLEAR_USER'})

export const fetchUser = (userName) => {
    return (dispatch) => {
        fetch(url, {
            method: "POST",
            headers: {"Accepts": "application/json", "Content-Type": "application/json"},
            body: JSON.stringify({name: userName})
        }).then(r => r.json())
        .then(json => {
            dispatch(setUser(json))
        })
    }
}