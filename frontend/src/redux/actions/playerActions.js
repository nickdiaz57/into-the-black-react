export const changeResource = (resource, amount) => ({type: 'CHANGE_RESOURCE', payload:{resource, amount}})

export const moveLeft = (dist) => ({type: 'MOVE_LEFT', payload: dist})

export const moveRight = (dist) => ({type: 'MOVE_RIGHT', payload: dist})

export const moveUp = (dist) => ({type: 'MOVE_UP', payload: dist})

export const moveDown = (dist) => ({type: 'MOVE_DOWN', payload: dist})