import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import EventModal from './eventModal'

const equals = (a, b) => a.length === b.length && a.every((v, i) => v === b[i]);

function Tile(props) {
    const [modalShow, setModalShow] = useState(false);
    const [visited, setVisited] = useState(false);

    const handleShow = () => setModalShow(true)

    const handleClose = () => {
        setVisited(true)//maybe use this to keep rerendering new modals as event progresses, only set this true when event is over
        setModalShow(false)
    }

    useEffect(() => {
        if (equals(props.position, [props.xcoord, props.ycoord]) && props.event && !visited) {
            handleShow()
        }
    })

    const triggerEvent = (event) => {
        return <EventModal text={event.text} show={modalShow} onHide={handleClose} />
    }

    // const handleScene = (scene) => {
    //     return <EventModal text={scene.text} buttons={scene.buttons}/>
    // }

    // const handleButtons = (button) => {
    //     console.log(button)
    // }

    return (
        <>
            <p>
                {props.hidden ? '' : props.occupied ? props.playerIcon : props.event ? props.event.icon : props.defaultIcon}
            </p>

            {modalShow ? 
                // <EventModal event={props.event} show={modalShow} onHide={handleClose}/>
                triggerEvent(props.event.scenes['start'])
                : null
            }
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        position: state.game.position
    }
}

export default connect(mapStateToProps)(Tile)