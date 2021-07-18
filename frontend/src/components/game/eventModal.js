import React from 'react'
import { Modal } from 'react-bootstrap'

function EventModal(props) {

    return (
        <Modal {...props} centered size='lg' backdrop='static'>
            <Modal.Header closeButton /> {/*remove*/}
            <Modal.Body>
                <p>{props.text}</p>
            </Modal.Body>
            {/* <Modal.Footer closeButton /> */}
        </Modal>
    )
}

export default EventModal