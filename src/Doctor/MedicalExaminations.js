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

    const nextPage = (pageNumber) => {
        setCurrentPage(pageNumber + 1)
    }
    const prevPage = (pageNumber) => {
        setCurrentPage(pageNumber - 1)
    }

    return (
        <>
            <h1>Visite mediche</h1>
            &nbsp;&nbsp;

            <MedicalExaminationsTable medicalExaminations={currentmedicalExaminations} patientId={patientId} setMedicalExaminations={setMedicalExaminations} />

            <MedicalExaminationsModal show={show} handleClose={handleClose} patientId={patientId} />
            <div>
                <nav aria-label="Page navigation">
                    <ul className="pagination justify-content-end align-items-center">
                        <button className="btn btn-primary btn-sm me-auto d-none d-sm-block" data-bs-toggle="modal" data-bs-target="#nuova-visita" onClick={handleShow}>Nuova visita</button>
                        <Pagination
                            patientsPerPage={medicalExaminationsPerPage}
                            totalPatients={medicalExaminations?.length}
                            paginate={paginate}
                            currentPage={currentPage}
                            prevPage={prevPage}
                            nextPage={nextPage}
                        />
                    </ul>
                </nav>
                <button className="btn btn-primary mb-4 align-self-center d-block d-sm-none" data-bs-toggle="modal" data-bs-target="#nuova-visita" onClick={handleShow}>Nuova visita</button>
            </div>

        </>
    );
}

function MedicalExaminationsTable(props) {
    const deleteMedicalExamination = (code) => {
        patient.delete("Visita/", code)
            .then((response) => {
                if (response.status === 200) {
                    NotificationManager.success(message.PATIENT + message.SuccessUpdate, entitiesLabels.SUCCESS, 3000);
                    props.setMedicalExaminations(response.data.dati);
                }
            }).catch((error) => {
                NotificationManager.error(message.ErrorServer, entitiesLabels.ERROR, 3000);
            });
        // props.setMedicalExaminations((medicalExaminations) => medicalExaminations.filter(ex => ex.id !== code));
    };


    return (
        <>
            <div className="table-wrapper custom-scrollbar">
                <table className="table custom">
                    <thead>
                        <tr>
                            <th scope="col">Tipo visita</th>
                            <th scope="col">Del</th>
                            <th scope="col">Anteprima</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.medicalExaminations?.map((ev) => <MedicalExaminationRow key={ev.id} medicalExamination={ev} patientId={props.patientId} deleteMedicalExamination={deleteMedicalExamination} />)
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
}

function MedicalExaminationRow(props) {
    return <tr><MedicalExaminationRowData medicalExamination={props.medicalExamination} patientId={props.patientId} /> <RowControl medicalExaminationId={props.medicalExamination.id} deleteMedicalExamination={props.deleteMedicalExamination} /></tr>
}

function MedicalExaminationRowData(props) {

    return (<>
        <td>{props.medicalExamination.tipoVisita}</td>
        <td>{props.medicalExamination.dataVisita.split(' ')[0]}</td>
        <td><img src={props.medicalExamination.elencoRefertiVisita[0].immagineReferto} style={{ width: 100, height: 70 }} /></td>
        <td><Link to={`/MedicalExaminationDetails/${props.patientId}/${props.medicalExamination.id}`} state={props.medicalExamination} patientId={props.patientId} className="btn btn-primary btn-sm" >Visualizza immagini</Link></td>
    </>
    );
}

function RowControl(props) {
    return <td> <span onClick={() => props.deleteMedicalExamination(props.medicalExaminationId)}><button className="btn btn-secondary me-3" id>Elimina</button></span></td>;
}

function MedicalExaminationsModal(props) {
    const [idPatient, setIdPatient] = useState(props.patientId);
    const [idMedicalExam, setIdidMedicalExam] = useState('0');
    const [type, setType] = useState();
    const [data, setData] = useState();
    const [information, setInformation] = useState();
    const [visitaSpecialistica, setVisitaSpecialistica] = useState();
    const [accessoRicovero, setAccessoRicovero] = useState();
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
                { idPatient, idMedicalExam, type, data, information, visitaSpecialistica, accessoRicovero }, headers: {
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
        setAccessoRicovero();
        setVisitaSpecialistica();
    }

    return (
        <>
            <div className="modal fade" id="nuova-visita" tabIndex={-1} aria-labelledby="Nuova visita" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" show={props.show} onHide={props.handleClose}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="h3">Carica nuova visita</h3>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <form action>
                            <div className="modal-body align-items-start">
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="label-caricareferto">Carica referto</span>
                                    <input type="file" className="form-control form-control-sm" id="caricareferto" aria-describedby="label-caricareferto" multiple onChange={saveFileSelected} required/>
                                </div>
                                <label className="form-label ps-4" id="label-visita" htmlFor="voce1">Visita specialistica</label>
                                <div className="input-group position-relative mb-3">
                                    <input className="form-check-input dark" type="radio" id="voce1" defaultValue="option1" name="tipo-referto" required/>
                                    <input type="text" className="form-control form-control-sm" id="visita" aria-describedby="label-visita" placeholder="Tipo di visita" name="visitaSpecialistica" onChange={e => setVisitaSpecialistica(e.target.value)} />
                                </div>
                                <label className="form-label ps-4" id="label-ricovero" htmlFor="voce2">Accesso ps / ricovero</label>
                                <div className="input-group position-relative mb-3">
                                    <input className="form-check-input dark" type="radio" id="voce2" defaultValue="option2" name="tipo-referto"/>
                                    <input type="text" className="form-control form-control-sm" id="ricovero" aria-describedby="label-ricovero" placeholder="Causa" name="accessoRicovero" onChange={e => setAccessoRicovero(e.target.value)} />
                                </div>
                                <div className="input-group mb-3 w-sm-50">
                                    <span className="input-group-text" id="label-data">Data</span>
                                    <input type="date" className="form-control form-control-sm" id="data" aria-describedby="label-data" name="data" onChange={e => setData(e.target.value)} required/>
                                </div>
                            </div>
                            <div className="modal-footer d-flex justify-content-center justify-content-md-end">
                                <button className="btn btn-primary btn-upload" id onClick={saveMedicalExamination}>Carica referto</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* <Modal show={props.show} onHide={props.handleClose}>
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
            </Modal> */}
        </>
    );
}


export { MedicalExaminationsInfo };