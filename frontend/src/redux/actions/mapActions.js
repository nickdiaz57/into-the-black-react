export const clearMap = () => ({type: 'CLEAR_MAP'})

export const createMap = (tiles) => ({type: 'CREATE_MAP', payload: tiles})

export const winGame = () => ({type: 'WIN_GAME'})

export const resetWon = () => ({type: 'RESET_WON'})

export const landOnTile = (key) => ({type:'LAND_ON_TILE', payload: key})

export const revealTile = (key) => ({type: 'REVEAL_TILE', payload: key})