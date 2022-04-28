import { Col, Table, Form, Button, Modal, Row } from 'react-bootstrap';
import { iconDelete, iconEdit } from './icons';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { patient } from '../helpers/api/api';
import { path } from '../helpers/Constants';
import { Link } from 'react-router-dom';
import { entitiesLabels, message } from '../helpers/Constants';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Pagination from '../helpers/pagination';

function MedicalExaminationsInfo() {
    const [patientId, setPatientId] = useState(window.location.pathname.split('/').pop());
    const [medicalExaminations, setMedicalExaminations] = useState([]);
    const [patientProfile, setPatientProfile] = useState([]);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [medicalExaminationsPerPage] = useState(5);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const fetchPatient = async () => {
            await patient.get("Get/", patientId)
                .then((response) => {
                    if (response.status === 200) {
                        setPatientProfile(response.data.dati);
                    }
                }).catch((error) => {

                });
        };
        fetchPatient();
    }, []);

    useEffect(() => {
        const fetchMedicalExaminations = async () => {
            setLoading(true);
            await patient.get("MedicalExams/", patientId)
                .then((response) => {
                    if (response.status === 200) {
                        setMedicalExaminations(response.data.dati);
                        setLoading(false);
                    }
                }).catch((error) => {

                });
        };
        fetchMedicalExaminations();
    }, [show]);

    // Get current
    const indexOfLastmedicalExamination = currentPage * medicalExaminationsPerPage;
    const indexOfFirstmedicalExamination = indexOfLastmedicalExamination - medicalExaminationsPerPage;
    const currentmedicalExaminations = medicalExaminations?.slice(indexOfFirstmedicalExamination, indexOfLastmedicalExamination);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <>
            <Row className='col-12 pt-4' >
                <div className='col-12'>
                    <h2>Visite mediche</h2>
                </div>
            </Row>
            &nbsp;&nbsp;
            <Col className='mb-3'>
                <MedicalExaminationsTable medicalExaminations={currentmedicalExaminations} patientId={patientId} />
                <Pagination
                    patientsPerPage={medicalExaminationsPerPage}
                    totalPatients={medicalExaminations?.length}
                    paginate={paginate}
                />
            </Col>
            <MedicalExaminationsModal show={show} handleClose={handleClose} patientId={patientId} />
            <Col className='mb-3'>
                <Button variant="primary" id="btnAdd" onClick={handleShow}>Aggiungi visita medica <i class="fas fa-plus"></i></Button>
                {/* <Button onClick={() => editPatient()} >Salva le modifiche</Button> */}
            </Col>
        </>
    );
}

function MedicalExaminationsTable(props) {
    return (
        <>
            <div className='col-10'>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Codice visita</th>
                            <th>Data</th>
                            <th>Tipo visita</th>
                            <th>Miniatura</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.medicalExaminations?.map((ev) => <MedicalExaminationRow key={ev.id} medicalExamination={ev} patientId={props.patientId} />)
                        }
                    </tbody>
                </Table>
            </div>
        </>
    );
}

function MedicalExaminationRow(props) {
    return <tr><MedicalExaminationRowData medicalExamination={props.medicalExamination} patientId={props.patientId} /></tr>
}

function MedicalExaminationRowData(props) {

    return (<>
        <td><Link to={`/MedicalExaminationDetails/${props.patientId}/${props.medicalExamination.id}`} state={props.medicalExamination} patientId={props.patientId} >{props.medicalExamination.id}</Link></td>
        <td>{props.medicalExamination.dataVisita.split(' ')[0]}</td>
        <td>{props.medicalExamination.tipoVisita}</td>
        <td><img src={`${process.env.REACT_APP_VISIT_REPORT_IMGS_PATH}` + props.medicalExamination.id + "/" + props.medicalExamination.elencoRefertiVisita[0].immagineReferto.split('\\').pop() }  style={{ width: 100, height: 70 }} /></td>
    </>
    );
}

function MedicalExaminationsModal(props) {
    const [idPatient, setIdPatient] = useState(props.patientId);
    const [idMedicalExam, setIdidMedicalExam] = useState('0');
    const [type, setType] = useState();
    const [data, setData] = useState();
    const [information, setInformation] = useState();
    const [file, setFile] = useState([]);
    const [fileName, setFileName] = useState([]);
    const [filesArray, setFilesArray] = useState([]);

    function saveMedicalExamination() {
        // setIdPaziente(parseInt(idPaziente));
        // setIdidMedicalExam(parseInt(idMedicalExam));
        const files = new FormData();
        // files.append("files", file);
        // files.append("fileName", fileName);
        filesArray.forEach(file => {
            files.append("files", file);
        });
        console.log(files);
        patient.postMedicalExamination("Visita/", files, {
            params:
                { idPatient, idMedicalExam, type, data, information }, headers: {
                    'Content-Type': 'multipart/form-data'
                }
        })
            .then((response) => {
                if (response.status === 200) {
                    NotificationManager.success(message.PATIENT + message.SuccessUpdate, entitiesLabels.SUCCESS, 3000);
                }
            }).catch((error) => {
                NotificationManager.error(message.ErrorServer, entitiesLabels.ERROR, 3000);
            });
        clearState();
        document.getElementById("medicalExaminationForm").reset();
    };

    const saveFileSelected = (e) => {
        
        for (var i = 0; i < e.target.files.length; i++) {
            filesArray.push(e.target.files.item(i));
        }
        console.log(filesArray);
    };

    const clearState = () => {
        setData();
        setType();
        setInformation();
        setFilesArray([]);
    }

    return (
        <>
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Aggiungi visita medica</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="medicalExaminationForm">
                        <Form.Group controlId="medicalExaminationDate">
                            <Form.Label>Data referto</Form.Label>
                            <Form.Control type="date" name="data" placeholder="Data visita" onChange={e => setData(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="medicalExaminationType">
                            <Form.Label>Tipo visita</Form.Label>
                            <Form.Control type="text" name="type" placeholder="Tipo visita" onChange={e => setType(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="medicalExaminationInfo">
                            <Form.Label>Esito visita</Form.Label>
                            <Form.Control as="textarea" name="information" placeholder="Esito visita" onChange={e => setInformation(e.target.value)} rows={5} />
                        </Form.Group>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Carica file</Form.Label>
                            <Form.Control type="file" multiple onChange={saveFileSelected} />
                        </Form.Group>

                    </Form>
                    < NotificationContainer />

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Chiudi
                    </Button>
                    <Button variant="primary" id="btnSave" onClick={saveMedicalExamination}>
                        Salva crisi
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}


export { MedicalExaminationsInfo };