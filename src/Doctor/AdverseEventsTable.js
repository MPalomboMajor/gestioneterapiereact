import { Col, Table, Form, Button, Container, Row, Modal } from 'react-bootstrap';
import { iconDelete, iconEdit } from './icons';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import moment from 'moment';
import { patient } from '../helpers/api/api';
import { entitiesLabels, message } from '../helpers/Constants';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Pagination from '../helpers/pagination';

function AdverseEventsInfo() {
    const [patientId, setPatientId] = useState(window.location.pathname.split('/').pop());
    const [adverseEvents, setAdverseEvents] = useState([]);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [adverseEventsPerPage] = useState(7);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const fetchAdverseEvents = async () => {
            setLoading(true);
            await patient.get("Events/", patientId)
                .then((response) => {
                    if (response.status === 200) {
                        setAdverseEvents(response.data.dati);
                        setLoading(false);
                    }
                }).catch((error) => {

                });
        };
        fetchAdverseEvents();
    }, [show]);

// Get current
const indexOfLastAdverseEvent = currentPage * adverseEventsPerPage;
const indexOfFirstAdverseEvent = indexOfLastAdverseEvent - adverseEventsPerPage;
const currentAdverseEvents = adverseEvents?.slice(indexOfFirstAdverseEvent, indexOfLastAdverseEvent);

// Change page
const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <>
            <Row className='col-12 pt-4' >
                <div className='col-12'>
                    <h2>Eventi avversi</h2>
                </div>
            </Row>
            &nbsp;&nbsp;
            <Col>
                <AdverseEventsTable adverseEvents={currentAdverseEvents} handleShow={handleShow} loading={loading} />
                <Pagination
                patientsPerPage={adverseEventsPerPage}
                totalPatients={adverseEvents?.length}
                paginate={paginate}
            />
            </Col>
            <div className='mb-3'>
                <Button variant="primary" id="btnAdd" onClick={handleShow}>Aggiungi eventi avversi <i class="fas fa-plus"></i></Button>
            </div>
            <AdverseEventsModal show={show} handleClose={handleClose} />
        </>
    );
}

function AdverseEventsTable(props) {
    if (props.loading) {
        return <h2>Loading...</h2>;
    }

    return (
        <>

            <div className='col-10'>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Data</th>
                            <th>Intensità</th>
                            <th>Descrizione</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.adverseEvents?.map((ev) => <AdverseEventRow key={ev.id} adverseEvent={ev} />)
                        }
                    </tbody>
                </Table>
            </div>
            


        </>
    );
}

function AdverseEventRow(props) {
    return <tr><AdverseEventRowData adverseEvent={props.adverseEvent} /></tr>
}

function AdverseEventRowData(props) {
    return (<>
        <td>{props.adverseEvent.dateEvent.split(' ')[0]}</td>
        <td>{props.adverseEvent.intensity}</td>
        <td>{props.adverseEvent.description}</td>
    </>
    );
}

function AdverseEventsModal(props) {
    const [newAdverseEvent, setNewAdverseEvent] = useState({
        idPatient: window.location.pathname.split('/').pop(),
        idAdverseEvent: 0,
        disorder: 0,
        description: "",
        dateEvent: "",
        intensity: 0,
        otherDisorder: ""
    });

    const handleChange = (e) => {
        const inputValue = e.target.value;
        const inputName = e.target.getAttribute('name');
        setNewAdverseEvent({
            ...newAdverseEvent, [inputName]:
                inputValue
        });
    };

    const clearState = () => {
        setNewAdverseEvent({
            idPatient: window.location.pathname.split('/').pop(),
            idAdverseEvent: 0,
            disorder: 0,
            description: "",
            dateEvent: "",
            intensity: 0,
            otherDisorder: ""
        })
    }

    function saveAdverseEvent() {
        newAdverseEvent.idPatient = parseInt(newAdverseEvent.idPatient);
        newAdverseEvent.intensity = parseInt(newAdverseEvent.intensity);
        newAdverseEvent.disorder = parseInt(newAdverseEvent.disorder);
        moment(newAdverseEvent.dateEvent).format("DD/MM/YYYY")
        // newAdverseEvent.dateEvent = moment(newAdverseEvent.dateEvent).format("DD/MM/YYYY")
        patient.post("Events/", newAdverseEvent)
            .then((response) => {
                if (response.status === 200) {
                    NotificationManager.success(message.PATIENT + message.SuccessUpdate, entitiesLabels.SUCCESS, 3000);
                }
            }).catch((error) => {
                NotificationManager.error(message.ErrorServer, entitiesLabels.ERROR, 3000);
            });
        clearState();
        document.getElementById("adverseEventForm").reset();
    };


    return (
        <>
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Aggiungi evento avverso</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="adverseEventForm">
                        <Form.Group controlId="adverseEventDate">
                            <Form.Label>Data evento</Form.Label>
                            <Form.Control type="date" name="dateEvent" placeholder="Inizio" onChange={handleChange} />
                        </Form.Group>                      
                        <Form.Label>Intensità</Form.Label>
                        {['radio'].map((type) => (
                            <div key={`inline-${type}`} className="mb-3">
                                <Form.Check
                                    inline
                                    label="Lieve"
                                    name="intensity"
                                    type={type}
                                    id={`inline-${type}-1`}
                                    value="0"
                                    onChange={handleChange}
                                />
                                <Form.Check
                                    inline
                                    label="Moderata"
                                    name="intensity"
                                    type={type}
                                    id={`inline-${type}-2`}
                                    value="1"
                                    onChange={handleChange}
                                />
                                <Form.Check
                                    inline
                                    label="Severa"
                                    name="intensity"
                                    type={type}
                                    id={`inline-${type}-3`}
                                    value="2"
                                    onChange={handleChange}
                                />
                            </div>
                        ))}
                        <Form.Group className="mb-3" controlId="adverseEventDescription">
                            <Form.Label>Descrizione</Form.Label>
                            <Form.Control as="textarea" name="description" onChange={handleChange} rows={5} />
                        </Form.Group>
                    </Form>
                    < NotificationContainer />

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" id="btnSave" onClick={saveAdverseEvent}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export { AdverseEventsInfo };