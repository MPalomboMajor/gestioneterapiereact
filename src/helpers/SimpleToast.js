import { Toast } from 'react-bootstrap';
import { notificationType } from './Constants';
import { useState } from 'react';


function SimpleToast(props) {
    const [show, setShow] = useState(props.show);

    switch (props.notificationType) {
        
        case notificationType.SUCCESS:
            return <Toast bg='success' onClose={() => setShow(true)} show={show} delay={3000} autohide >
                <Toast.Header >
                    <img
                        src="holder.js/20x20?text=%20"
                        className="rounded me-2"
                        alt=""
                    />
                    <strong className="me-auto">{props.notificationHeaderMessage}</strong>
                </Toast.Header>
                <Toast.Body className='element' >{props.notificationMessage}</Toast.Body>
            </Toast>

        case notificationType.WARNING:
            return <Toast bg='warning' onClose={() => setShow(true)} show={show} delay={3000} autohide >
                <Toast.Header >
                    <img
                        src="holder.js/20x20?text=%20"
                        className="rounded me-2"
                        alt=""
                    />
                    <strong className="me-auto">{props.notificationHeaderMessage}</strong>
                </Toast.Header>
                <Toast.Body className='element' >{props.notificationMessage}</Toast.Body>
            </Toast>

        case notificationType.PRIMARY:
            return <Toast bg='primary' onClose={() => setShow(false)} show={show} delay={3000} autohide >
                <Toast.Header >
                    <img
                        src="holder.js/20x20?text=%20"
                        className="rounded me-2"
                        alt=""
                    />
                    <strong className="me-auto">{props.notificationHeaderMessage}</strong>
                </Toast.Header>
                <Toast.Body className='element' >{props.notificationMessage}</Toast.Body>
            </Toast>

        case notificationType.INFO:
            return <Toast bg='info' onClose={() => setShow(false)} show={show} delay={3000} autohide >
                <Toast.Header >
                    <img
                        src="holder.js/20x20?text=%20"
                        className="rounded me-2"
                        alt=""
                    />
                    <strong className="me-auto">{props.notificationHeaderMessage}</strong>
                </Toast.Header>
                <Toast.Body className='element' >{props.notificationMessage}</Toast.Body>
            </Toast>

        case notificationType.DANGER:
            return <Toast bg='danger' onClose={() => setShow(false)} show={show} delay={3000} autohide >
                <Toast.Header >
                    <img
                        src="holder.js/20x20?text=%20"
                        className="rounded me-2"
                        alt=""
                    />
                    <strong className="me-auto">{props.notificationHeaderMessage}</strong>
                </Toast.Header>
                <Toast.Body className='element' >{props.notificationMessage}</Toast.Body>
            </Toast>
    }

}

export default SimpleToast;