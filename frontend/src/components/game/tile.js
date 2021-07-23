import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import EventModal from './eventModal'

const equals = (a, b) => a.length === b.length && a.every((v, i) => v === b[i]);

function Tile(props) {
    const [modalShow, setModalShow] = useState(false);
    const [visited, setVisited] = useState(false);

    const handleShow = () => setModalShow(true)

    const handleClose = () => {
        setVisited(true)
        setModalShow(false)
    }

    useEffect(() => {
        if (equals(props.position, [props.xcoord, props.ycoord]) && props.event && !visited) {
            handleShow()
        }
    })

    return (
        <>
            <p>
                {props.hidden ? '' : props.occupied ? props.playerIcon : props.event ? props.event.icon : props.defaultIcon}
            </p>

            {modalShow ? 
                <EventModal event={props.event} show={modalShow} onHide={handleClose}/>
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