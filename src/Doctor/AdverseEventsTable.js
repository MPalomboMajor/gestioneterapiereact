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
    const [patientProfile, setPatientProfile] = useState([]);

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
            await patient.get("Get/", patientId)
                .then((response) => {
                    if (response.status === 200) {
                        setPatientProfile(response.data.dati);
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
            <h1 class="h1">Eventi avversi {patientProfile.name} {patientProfile.surName} - Codice assistito: {patientProfile.codicePaziente}</h1>
            &nbsp;&nbsp;

            <AdverseEventsTable adverseEvents={currentAdverseEvents} handleShow={handleShow} loading={loading} setAdverseEvents={setAdverseEvents} />
            <div>
                <nav aria-label="Page navigation">
                    <ul className="pagination justify-content-end align-items-center">
                        <button className="btn btn-primary btn-sm me-auto d-none d-sm-block" data-bs-toggle="modal" data-bs-target="#nuovo-evento" onClick={handleShow}>Nuovo evento</button>
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
                <button className="btn btn-primary mb-4 align-self-center d-block d-sm-none" data-bs-toggle="modal" data-bs-target="#nuovo-evento" onClick={handleShow}>Nuovo evento</button>
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
                    <input className="form-check-input" type="radio" id value="1" checked={props.adverseEvent.idIntensity === 1} disabled />
                    <label className="form-check-label" htmlFor>Lieve</label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" id value="2" checked={props.adverseEvent.idIntensity === 2} disabled />
                    <label className="form-check-label" htmlFor>Moderata</label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" id value="3" checked={props.adverseEvent.idIntensity === 3} disabled />
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
            <div className="modal fade" id="nuovo-evento" tabIndex={-1} aria-labelledby="Nuovo evento" aria-hidden="true" >
                <div className="modal-dialog modal-dialog-centered" show={props.show} onHide={props.handleClose}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="h3">Nuovo evento avverso</h3>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <form action>
                            <div className="modal-body align-items-end">
                                <div className="input-group mb-3 w-sm-50">
                                    <span className="input-group-text" id="data">Data</span>
                                    <input type="date" className="form-control form-control-sm" id="data" aria-describedby="basic-addon3" name="dateEvent" onChange={handleChange} required />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="tipo-evento-label">Tipo di evento</span>
                                    <input type="text" className="form-control form-control-sm" id="tipo-evento" aria-describedby="tipo-evemto-label" />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="descrizione">Descrizione</span>
                                    <input type="text" className="form-control form-control-sm" id="descrizione" aria-describedby="descrizione-label" name="description" onChange={handleChange} rows={5} required />
                                </div>
                                <div className="options-wrapper justify-content-start mb-3 font-14">
                                    <p className="form-label pe-3 m-0">Intensità:</p>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" id="Check1" value="1" name="idIntensity" onChange={handleChange} required />
                                        <label className="form-check-label" htmlFor="Check1">Lieve</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" id="Check2" value="2" name="idIntensity" onChange={handleChange} />
                                        <label className="form-check-label" htmlFor="Check2">Moderata</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" id="Check3" value="3" name="idIntensity" onChange={handleChange} />
                                        <label className="form-check-label" htmlFor="Check3">Grave</label>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer d-flex justify-content-center justify-content-md-end">
                                <button className="btn btn-primary" id onClick={saveAdverseEvent}>Salva evento</button>
                            </div>
                        </form>
                        < NotificationContainer />
                    </div>
                </div>
            </div>
        </>
    );
}

export { AdverseEventsInfo };