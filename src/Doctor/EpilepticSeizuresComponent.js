import { Col, Table, Form, Button, Modal, Row } from 'react-bootstrap';
import { iconDelete, iconEdit } from './icons';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { patient } from '../helpers/api/api';
import { entitiesLabels, message } from '../helpers/Constants';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Pagination from '../helpers/pagination';

function EpilepticSeizuresInfo() {
    const [patientId, setPatientId] = useState(window.location.pathname.split('/').pop());
    const [epilepticSeizures, setEpilepticSeizures] = useState([]);
    const [patientProfile, setPatientProfile] = useState([]);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [epilepticSeizuresPerPage] = useState(5);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const fetchPatient = async () => {
            await patient.get("Get/", patientId)
                .then((response) => {
                    if (response.status === 200) {
                        console.log("ciao");
                        setPatientProfile(response.data.dati);
                    }
                }).catch((error) => {

                });
        };
        fetchPatient();
    }, []);

    useEffect(() => {
        const fetchEpilepticSeizures = async () => {
            setLoading(true);
            await patient.get("Seizures/", patientId)
                .then((response) => {
                    if (response.status === 200) {
                        setEpilepticSeizures(response.data.dati);
                        setLoading(false);
                    }
                }).catch((error) => {

                });
        };
        fetchEpilepticSeizures();
    }, [show]);

    // Get current
    const indexOfLastEpilepticSeizure = currentPage * epilepticSeizuresPerPage;
    const indexOfFirstEpilepticSeizure = indexOfLastEpilepticSeizure - epilepticSeizuresPerPage;
    const currentEpilepticSeizures = epilepticSeizures?.slice(indexOfFirstEpilepticSeizure, indexOfLastEpilepticSeizure);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    const handleChange = (e) => {
        const inputValue = parseInt(e.target.value);
        const inputName = e.target.getAttribute('name');
        setPatientProfile({
            ...patientProfile, [inputName]:
                inputValue
        });
    };

    function editPatient() {
        patient.post("UpdateProfile/", patientProfile)
            .then((response) => {
                if (response.status === 200) {
                    NotificationManager.success(message.PATIENT + message.SuccessUpdate, entitiesLabels.SUCCESS, 3000);
                }
            }).catch((error) => {
                NotificationManager.error(message.ErrorServer, entitiesLabels.ERROR, 3000);
            });
    };

    return (
        <>
            <Row className='col-12 pt-4' >
                <div className='col-12'>
                    <h2>Crisi epilettiche</h2>
                </div>
            </Row>
            &nbsp;&nbsp;
            <Col className='mb-3'>
                <EpilepticSeizuresForm numberStartingSeizures={patientProfile.numeroCrisiPartenza} onChange={handleChange} />
            </Col>
            <Col className='mb-3'>
                <Button onClick={() => editPatient()} >Salva modifica</Button>
            </Col>

            <Col className='mb-3'>
                <EpilepticSeizuresTable epilepticSeizures={currentEpilepticSeizures} />
                <Pagination
                    patientsPerPage={epilepticSeizuresPerPage}
                    totalPatients={epilepticSeizures?.length}
                    paginate={paginate}
                />
            </Col>
            <EpilepticSeizuresModal show={show} handleClose={handleClose} patientId={patientId} />
            <Col className='mb-3'>
                <Button variant="primary" id="btnAdd" onClick={handleShow}>Aggiungi crisi epilettiche <i class="fas fa-plus"></i></Button>&nbsp;&nbsp;
            </Col>
            < NotificationContainer />
        </>
    );
}

function EpilepticSeizuresForm(props) {

    return (
        <Form>
            <div className='col-6'>
                <Form.Group controlId='numberStartingSeizures'>
                    <Form.Label>Numero crisi di partenza</Form.Label>
                    <Form.Control type='text' name="numeroCrisiPartenza" defaultValue={props.numberStartingSeizures} onChange={props.onChange} />
                </Form.Group>
            </div>
        </Form>


    );
}

function EpilepticSeizuresTable(props) {
    return (
        <>

            <div className='col-10'>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Data</th>
                            <th>Descrizione</th>
                            <th>Comportamenti</th>
                            <th>Contesto</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.epilepticSeizures?.map((ev) => <EpilepticSeizureRow key={ev.id} epilepticSeizure={ev} />)
                        }
                    </tbody>
                </Table>
            </div>
        </>
    );
}

function EpilepticSeizureRow(props) {
    return <tr><EpilepticSeizureRowData epilepticSeizure={props.epilepticSeizure} /></tr>
}

function EpilepticSeizureRowData(props) {
    return (<>
        <td>{props.epilepticSeizure.dateTimeEventOccured.split(' ')[0]}</td>
        <td>{props.epilepticSeizure.description}</td>
        <td>{props.epilepticSeizure.elencoComportamenti[0].comportamento}</td>
        <td>{props.epilepticSeizure.elencoContestualita[0].contesto}</td>
    </>
    );
}

function EpilepticSeizuresModal(props) {
    const [newEpilepticSeizures, setNewEpilepticSeizures] = useState({
        idCrisi: 0,
        idPatient: props.patientId,
        intesity: 0,
        description: "",
        dateTimeEventOccured: "",
        elencoComportamenti: [
            {
                id: 0,
                comportamento: 0,
                idEpilepticSeizureEvent: 0
            }
        ],
        elencoContestualita: [
            {
                id: 0,
                contesto: 0,
                idEpilepticSeizureEvent: 0
            }
        ],
        altroComportamento: ""
    });

    const handleChange = (e) => {
        const inputValue = e.target.value;
        const inputName = e.target.getAttribute('name');
        setNewEpilepticSeizures({
            ...newEpilepticSeizures, [inputName]:
                inputValue,
        });
    };

    function saveEpilepticSeizure() {
        newEpilepticSeizures.idPatient = parseInt(newEpilepticSeizures.idPatient);
        newEpilepticSeizures.intesity = parseInt(newEpilepticSeizures.intesity);
        patient.post("Seizures/", newEpilepticSeizures)
            .then((response) => {
                if (response.status === 200) {
                    NotificationManager.success(message.PATIENT + message.SuccessUpdate, entitiesLabels.SUCCESS, 3000);
                }
            }).catch((error) => {
                NotificationManager.error(message.ErrorServer, entitiesLabels.ERROR, 3000);
            });
        clearState();
        document.getElementById("epilepticSeizureForm").reset();
    };

    const clearState = () => {
        setNewEpilepticSeizures({
            idCrisi: 0,
            idPatient: props.patientId,
            intesity: 0,
            description: "",
            dateTimeEventOccured: "",
            elencoComportamenti: [
                {
                    id: 0,
                    comportamento: 0,
                    idEpilepticSeizureEvent: 0
                }
            ],
            elencoContestualita: [
                {
                    id: 0,
                    contesto: 0,
                    idEpilepticSeizureEvent: 0
                }
            ],
            altroComportamento: ""
        })
    }

    return (
        <>
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Aggiungi crisi epilettica</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="epilepticSeizureForm">
                        <Form.Group controlId="epilepticSeizureDate">
                            <Form.Label>Data evento</Form.Label>
                            <Form.Control type="date" name="dateTimeEventOccured" placeholder="Data crisi" onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="epilepticSeizureDescription">
                            <Form.Label>Descrizione</Form.Label>
                            <Form.Control as="textarea" name="description" placeholder="Descrizione" onChange={handleChange} rows={5} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="epilepticSeizureBehavior">
                            <Form.Label>Comportamenti</Form.Label>
                            <Form.Select aria-label="epilepticSeizureBehavior" name="comportamento" onChange={(event) => {
                                setNewEpilepticSeizures(prevEpilepticSeizure => ({
                                    ...prevEpilepticSeizure,
                                    elencoComportamenti: [{ ...prevEpilepticSeizure.elencoComportamenti[0], comportamento: parseInt(event.target.value) }]
                                }));
                            }} >
                                <option></option>
                                <option value="0">Crisi convulsiva generalizzata</option>
                                <option value="1">Assenza/crisi focale</option>
                                <option value="2">Perdita di coscienza</option>
                                <option value="3">Caduta a terra</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="epilepticSeizureContext">
                            <Form.Label>Contesto</Form.Label>
                            <Form.Select aria-label="epilepticSeizureContext" name="contesto" onChange={(event) => {
                                setNewEpilepticSeizures(prevEpilepticSeizure => ({
                                    ...prevEpilepticSeizure,
                                    elencoContestualita: [{ ...prevEpilepticSeizure.elencoContestualita[0], contesto: parseInt(event.target.value) }]
                                }));
                            }} >
                                <option></option>
                                <option value="0">Casa</option>
                                <option value="1">Lavoro</option>
                                <option value="2">Tempo libero</option>
                                <option value="3">Veglia</option>
                                <option value="4">Sonno</option>
                            </Form.Select>
                            {/* <Form.Control type="text" name="contesto" placeholder="Contesto" onChange={(event) => {
                                setNewEpilepticSeizures(prevEpilepticSeizure => ({
                                    ...prevEpilepticSeizure,
                                    elencoContestualita: [{ ...prevEpilepticSeizure.elencoContestualita[0], contesto: parseInt(event.target.value) }]
                                }));
                            }} /> */}
                        </Form.Group>

                    </Form>
                    < NotificationContainer />

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Chiudi
                    </Button>
                    <Button variant="primary" id="btnSave" onClick={saveEpilepticSeizure}>
                        Salva crisi
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export { EpilepticSeizuresInfo };