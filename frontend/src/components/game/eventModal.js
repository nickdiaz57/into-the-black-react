import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Modal, Button, Tooltip, OverlayTrigger } from 'react-bootstrap'
import { changeResource } from '../../redux/actions/playerActions'

function EventModal(props) {

    const [activeScene, setActiveScene] = useState(props.event.scenes['start'])

    const setOnClick = (nextScene, currentScene={}) => {
        if (currentScene.cost) {
            console.log(currentScene.cost)
        }
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

    const canAfford = (cost) => {
        return Object.keys(cost).every(r => props.player[r] >= cost[r])
    }

    const eventEndWithResult = (button) => {
        return <Button variant='secondary' onClick={() => {
            for (let r in button.result) {
                    props.changeResource(r, button.result[r])
                };
            props.onHide()
            }
        }>
            {button.value}
            </Button>
    }

    const createButtons = (buttons) => {
        let buttonArr = []
        for (const b in buttons) {
            if (buttons[b].cost && !canAfford(buttons[b].cost)) {
                buttonArr.push(
                    <OverlayTrigger placement='top' overlay={props => <Tooltip {...props}>Insufficient resources.</Tooltip>}>
                        <Button variant='primary'>{buttons[b].value}</Button>
                    </OverlayTrigger>
                )
            } else {
                if (buttons[b].next === 'end') {
                    if (buttons[b].result) {
                        buttonArr.push(eventEndWithResult(buttons[b]))
                    } else {
                        buttonArr.push(<Button variant='secondary' onClick={props.onHide}>{buttons[b].value}</Button>)
                    }
                } else if (typeof buttons[b].next === 'object') {
                    buttonArr.push(<Button variant='primary' onClick={handleRandomChance(buttons[b].next)}>{buttons[b].value}</Button>)
                } else {
                    buttonArr.push(<Button variant='primary' onClick={setOnClick(props.event.scenes[buttons[b].next], buttons[b])}>{buttons[b].value}</Button>)
                }
            }
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

const mapStateToProps = (state) => {
    return {
        player: state.game.player
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeResource: (resource, amount) => dispatch(changeResource(resource,amount))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventModal)