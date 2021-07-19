import React from 'react'
import { Modal } from 'react-bootstrap'

function EventModal(props) {
    // props would hold event object

    // event handler for button one that handles selected next key
    // based on next value, go to this value etc.
    // useState for all valuse (text, buttons, anything additional could be passed to redux) setModalText

    return (
        <Modal {...props} centered size='lg' backdrop='static'>
            <Modal.Header closeButton /> {/*remove*/}
            <Modal.Body>
                <p>{/*modalText*/}{props.text}</p>
            </Modal.Body>
            {/* <Modal.Footer closeButton /> */}
            <Modal.Footer>
                {/* <Button variant="secondary" onClick="handleNextButton(props.next)">{props.buttonOne}</Button>
                { secondButton ? 
                    <Button variant="primary">{props.buttonTwo}</Button>
                    : null
                } */}
            </Modal.Footer>
        </Modal>
    )
}

export default EventModal