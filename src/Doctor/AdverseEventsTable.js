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

    const nextPage = (pageNumber) => {
        setCurrentPage(pageNumber + 1)
    }
    const prevPage = (pageNumber) => {
        setCurrentPage(pageNumber - 1)
    }

    return (
        <>
            <h1 class="h1">Eventi avversi</h1>
            &nbsp;&nbsp;

            <AdverseEventsTable adverseEvents={currentAdverseEvents} handleShow={handleShow} loading={loading} setAdverseEvents={setAdverseEvents} />
            <div>
                <nav aria-label="Page navigation">
                    <ul className="pagination justify-content-end align-items-center">
                        <button className="btn btn-primary btn-sm me-auto d-none d-sm-block" data-bs-toggle="modal" data-bs-target="#nuova-visita" onClick={handleShow}>Nuovo evento</button>
                        <Pagination
                            patientsPerPage={adverseEventsPerPage}
                            totalPatients={adverseEvents?.length}
                            paginate={paginate}
                            currentPage={currentPage}
                            prevPage={prevPage}
                            nextPage={nextPage}
                        />
                    </ul>
                </nav>
                <button className="btn btn-primary mb-4 align-self-center d-block d-sm-none" data-bs-toggle="modal" data-bs-target="#nuova-visita" onClick={handleShow}>Nuovo evento</button>
            </div>



            <AdverseEventsModal show={show} handleClose={handleClose} setAdverseEvents={setAdverseEvents} />
        </>
    );
}

function AdverseEventsTable(props) {
    const deleteAdverseEvent = (code) => {
        patient.delete("Events/", code)
            .then((response) => {
                if (response.status === 200) {
                    NotificationManager.success(message.PATIENT + message.SuccessUpdate, entitiesLabels.SUCCESS, 3000);
                    props.setAdverseEvents(response.data.dati);
                }
            }).catch((error) => {
                NotificationManager.error(message.ErrorServer, entitiesLabels.ERROR, 3000);
            });
    };

    if (props.loading) {
        return <h2>Loading...</h2>;
    }

    return (
        <>

            <div className="table-wrapper">
                <table className="table custom">
                    <thead>
                        <tr>
                            <th scope="col">Data</th>
                            <th scope="col">Descrizione</th>
                            <th scope="col">Intensità</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.adverseEvents?.map((ev) => <AdverseEventRow key={ev.id} adverseEvent={ev} deleteAdverseEvent={deleteAdverseEvent} />)
                        }
                    </tbody>
                </table>
            </div>



        </>
    );
}

function AdverseEventRow(props) {
    return <tr><AdverseEventRowData adverseEvent={props.adverseEvent} /> <RowControl adverseEventId={props.adverseEvent.id} deleteAdverseEvent={props.deleteAdverseEvent} /></tr>
}





function AdverseEventRowData(props) {
    return (<>
        <td>{props.adverseEvent.dateEvent.split(' ')[0]}</td>
        <td>{props.adverseEvent.description}</td>
        <td className="split-column">
            <div className="options-wrapper">
                <div className="form-check">
                    <input className="form-check-input" type="radio" id value="1" name="idIntensity" defaultChecked={props.adverseEvent.idIntensity} disabled />
                    <label className="form-check-label" htmlFor>Lieve</label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" id value="2" name="idIntensity" defaultChecked={props.adverseEvent.idIntensity} disabled />
                    <label className="form-check-label" htmlFor>Moderata</label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" id value="3" name="idIntensity" defaultChecked={props.adverseEvent.idIntensity} disabled />
                    <label className="form-check-label" htmlFor>Grave</label>
                </div>
            </div>
        </td>
        {/* <td className="split-column"><div className="options-wrapper">{['radio'].map((type) => (
            <div key={`inline-${type}`} className="form-check">
                <Form.Check
                    className="form-check-input"
                    defaultChecked={props.adverseEvent.idIntensity}
                    inline
                    label="Lieve"
                    name="idIntensity"
                    type={type}
                    id={`inline-${type}-1`}
                    value="1"
                    disabled
                />
                <Form.Check
                    className="form-check-input"
                    defaultChecked={props.adverseEvent.idIntensity}
                    inline
                    label="Moderata"
                    name="idIntensity"
                    type={type}
                    id={`inline-${type}-2`}
                    value="2"
                    disabled
                />
                <Form.Check
                    className="form-check-input"
                    defaultChecked={props.adverseEvent.idIntensity}
                    inline
                    label="Severa"
                    name="idIntensity"
                    type={type}
                    id={`inline-${type}-3`}
                    value="3"
                    disabled
                />
            </div>

        ))} </div></td> */}
    </>
    );
}

function RowControl(props) {
    return <td> <span onClick={() => props.deleteAdverseEvent(props.adverseEventId)}><button className="btn btn-secondary me-3" id>Elimina</button></span></td>;
}


function AdverseEventsModal(props) {
    const [newAdverseEvent, setNewAdverseEvent] = useState({
        idPatientProfile: window.location.pathname.split('/').pop(),
        id: 0,
        description: "",
        dateEvent: "",
        idIntensity: 0,
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
            idPatientProfile: window.location.pathname.split('/').pop(),
            id: 0,
            description: "",
            dateEvent: "",
            idIntensity: 0,
        })
    }

    function saveAdverseEvent() {
        newAdverseEvent.idPatientProfile = parseInt(newAdverseEvent.idPatientProfile);
        newAdverseEvent.idIntensity = parseInt(newAdverseEvent.idIntensity);
        moment(newAdverseEvent.dateEvent).format("DD/MM/YYYY")
        patient.post("Events/", newAdverseEvent)
            .then((response) => {
                if (response.status === 200) {
                    NotificationManager.success(message.PATIENT + message.SuccessUpdate, entitiesLabels.SUCCESS, 3000);
                    props.setAdverseEvents(response.data.dati);
                }
            }).catch((error) => {
                NotificationManager.error(message.ErrorServer, entitiesLabels.ERROR, 3000);
            });
        clearState();
        props.handleClose();
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
                                    name="idIntensity"
                                    type={type}
                                    id={`inline-${type}-1`}
                                    value="1"
                                    onChange={handleChange}
                                />
                                <Form.Check
                                    inline
                                    label="Moderata"
                                    name="idIntensity"
                                    type={type}
                                    id={`inline-${type}-2`}
                                    value="2"
                                    onChange={handleChange}
                                />
                                <Form.Check
                                    inline
                                    label="Severa"
                                    name="idIntensity"
                                    type={type}
                                    id={`inline-${type}-3`}
                                    value="3"
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