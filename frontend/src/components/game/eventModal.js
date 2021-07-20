import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'

function EventModal(props) {

    const [activeScene, setActiveScene] = useState(props.event.scenes['start'])

    const setOnClick = (nextScene) => {
        return (() => setActiveScene(nextScene))
    }

    const handleRandomChance = (options) => {
        let ref = Math.floor(Math.random() *10) + 1
        let target = Object.keys(options).find(k => ref <= k)
        if (options[target] === 'end') {
            return props.onHide
        } else {
            return setOnClick(props.event.scenes[options[target]])
        }
    }

    const createButtons = (buttons) => {
        let buttonArr = []
        for (const b in buttons) {
            if (buttons[b].next === 'end') {
                buttonArr.push(<Button variant='secondary' onClick={props.onHide}>{buttons[b].value}</Button>)
            } else if (typeof buttons[b].next === 'object') {
                buttonArr.push(<Button variant='primary' onClick={handleRandomChance(buttons[b].next)}>{buttons[b].value}</Button>)
            } else {
                buttonArr.push(<Button variant='primary' onClick={setOnClick(props.event.scenes[buttons[b].next])}>{buttons[b].value}</Button>)
            }//determine onclicks in their own function, so they can do something else besides just setting active scene
        }
        return buttonArr
    }

    return (
        <Modal {...props} centered size='lg' backdrop='static'>
            <Modal.Body>
                <p>{activeScene.text}</p>
            </Modal.Body>
            <Modal.Footer>
                {createButtons(activeScene.buttons)}
            </Modal.Footer>
        </Modal>
    )
}

export default EventModal