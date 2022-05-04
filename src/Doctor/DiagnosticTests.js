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

function DiagnosticTestsInfo() {
    const [patientId, setPatientId] = useState(window.location.pathname.split('/').pop());
    const [diagnosticTests, setDiagnosticTests] = useState([]);
    const [patientProfile, setPatientProfile] = useState([]);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [diagnosticTestsPerPage] = useState(5);

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
        const fetchDiagnosticTests = async () => {
            setLoading(true);
            await patient.get("Analysis/", patientId)
                .then((response) => {
                    if (response.status === 200) {
                        setDiagnosticTests(response.data.dati);
                        setLoading(false);
                    }
                }).catch((error) => {

                });
        };
        fetchDiagnosticTests();
    }, [show]);

    // Get current
    const indexOfLastDiagnosticTest = currentPage * diagnosticTestsPerPage;
    const indexOfFirstDiagnosticTest = indexOfLastDiagnosticTest - diagnosticTestsPerPage;
    const currentDiagnosticTests = diagnosticTests?.slice(indexOfFirstDiagnosticTest, indexOfLastDiagnosticTest);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <>

            <h1>Esami diagnostici</h1>

            &nbsp;&nbsp;
            <button className="btn btn-primary mb-4" data-bs-toggle="modal" data-bs-target="#nuovo-esame" onClick={handleShow} >Nuovo Esame</button>
            <DiagnosticTestsTable diagnosticTests={currentDiagnosticTests} patientId={patientId} setDiagnosticTests={setDiagnosticTests} />
            <Pagination
                patientsPerPage={diagnosticTestsPerPage}
                totalPatients={diagnosticTests?.length}
                paginate={paginate}
            />

            <DiagnosticTestsModal show={show} handleClose={handleClose} patientId={patientId} />




        </>
    );
}


function DiagnosticTestsTable(props) {
    const deleteDiagnosticTest = (code) => {
        props.setDiagnosticTests((diagnosticTests) => diagnosticTests.filter(ex => ex.id !== code));
    };

    return (
        <>
            <div className="table-wrapper custom-scrollbar">
                <table className="table custom">
                    <thead>
                        <tr>
                            <th scope="col">Tipo esame</th>
                            <th scope="col">Del</th>
                            <th scope="col">Miniatura</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.diagnosticTests?.map((ev) => <DiagnosticTestRow key={ev.id} diagnosticTest={ev} patientId={props.patientId} deleteDiagnosticTest={deleteDiagnosticTest} />)
                        }
                    </tbody>
                </table>
            </div>



        </>
    );
}

function DiagnosticTestRow(props) {
    return <tr><DiagnosticTestRowData diagnosticTest={props.diagnosticTest} patientId={props.patientId} /> <RowControl diagnosticTestId={props.diagnosticTest.id} deleteDiagnosticTest={props.deleteDiagnosticTest} /></tr>
}

function DiagnosticTestRowData(props) {
    return (<>
        <td>{props.diagnosticTest.tipoReferto}</td>
        <td>{props.diagnosticTest.uploadedDateTime.split(' ')[0]}</td>
        <td><img src={props.diagnosticTest.fileName} style={{ width: 100, height: 70 }} /></td>
        <td><Link to={`/BloodTest/${props.patientId}/${props.diagnosticTest.id}`} state={props.diagnosticTest} patientId={props.patientId} className="btn btn-primary btn-sm">Visualizza PDF</Link>
            <Link to={`/BloodTest/${props.patientId}/${props.diagnosticTest.id}`} state={props.diagnosticTest} patientId={props.patientId} className="btn btn-primary btn-sm">Visualizza Immagini</Link></td>
    </>
    );
}

function RowControl(props) {
    return <td> <span onClick={() => props.deleteDiagnosticTest(props.diagnosticTestId)}>{iconDelete}</span></td>;
}

function DiagnosticTestsModal(props) {
    const [idAnalisi, setIdAnalisi] = useState('0');
    const [dateReferto, setDateReferto] = useState();
    const [idPaziente, setIdPaziente] = useState(props.patientId);
    const [tipoReferto, setTipoReferto] = useState();
    const [file, setFile] = useState([]);
    const [fileName, setFileName] = useState([]);
    const [filesArray, setFilesArray] = useState([]);

    function saveDiagnosticTest() {

        const files = new FormData();
        // files.append("files", file);
        // files.append("fileName", fileName);
        filesArray.forEach(file => {
            files.append("files", file);
        });
        patient.postDiagnosticTest("Analisi/", files, {
            params:
                { idPaziente, idAnalisi, dateReferto, tipoReferto }, headers: {
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
        document.getElementById("diagnosticTestForm").reset();
    };

    const saveFileSelected = (e) => {

        for (var i = 0; i < e.target.files.length; i++) {
            filesArray.push(e.target.files.item(i));
        }
        console.log(filesArray);
        // const formData = new FormData();
        // filesArray.forEach(file => {
        //     formData.append("arrayOfFilesName", file);
        // });
        // console.log(formData);
        //in case you wan to print the file selected
        // console.log(formData);
        // setFile(e.target.files[0]);
        // setFileName(e.target.files[0].name)
    };

    return (
        <>
            <div className="modal fade" id="nuovo-esame" tabIndex={-1} aria-labelledby="Nuovo esame" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" show={props.show} onHide={props.handleClose}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="h3">Nuovo esame</h3>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <form action>
                            <div className="modal-body align-items-end">
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="captiontest">Carica referto</span>
                                    <input type="file" className="form-control form-control-sm" id="captiontest" aria-describedby="basic-addon3" multiple onChange={saveFileSelected} />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="captiontest">Tipo di referto</span>
                                    <input type="text" className="form-control form-control-sm" id="captiontest" aria-describedby="basic-addon3" name="tipoReferto" onChange={e => setTipoReferto(e.target.value)} />
                                </div>
                                <div className="input-group mb-3 w-sm-50">
                                    <span className="input-group-text" id="data">Data</span>
                                    <input type="date" className="form-control form-control-sm" id="data" aria-describedby="basic-addon3" name="dateReferto" onChange={e => setDateReferto(e.target.value)} />
                                </div>
                            </div>
                            <div className="modal-footer d-flex justify-content-center justify-content-md-end">
                                <button className="btn btn-primary btn-upload" id onClick={saveDiagnosticTest}>Carica referto</button>
                            </div>
                        </form>
                        < NotificationContainer />
                    </div>
                </div>
            </div>
            {/* <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Aggiungi esame diagnostico</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="diagnosticTestForm">
                        <Form.Group controlId="diagnosticTestDate">
                            <Form.Label>Data referto</Form.Label>
                            <Form.Control type="date" name="dateReferto" placeholder="Data referto" onChange={e => setDateReferto(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="diagnosticTestType">
                            <Form.Label>Tipo referto</Form.Label>
                            <Form.Control type="text" name="tipoReferto" placeholder="Tipo referto" onChange={e => setTipoReferto(e.target.value)} />
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
                    <Button variant="primary" id="btnSave" onClick={saveDiagnosticTest}>
                        Salva esame
                    </Button>
                </Modal.Footer>
            </Modal> */}
        </>
    );
}


export { DiagnosticTestsInfo };