import React from 'react'
import { Modal } from 'react-bootstrap'

function EventModal(props) {

    return (
        <Modal {...props} centered size='lg' backdrop='static'>
            <Modal.Header closeButton />
            <Modal.Body>
                {/* <p>{props.event}</p> */}
                Body
            </Modal.Body>
        </Modal>
    )
}

export default EventModal