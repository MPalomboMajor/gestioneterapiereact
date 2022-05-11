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

function NutritionalPlansInfo() {
    const [patientId, setPatientId] = useState(window.location.pathname.split('/').pop());
    const [nutritionalPlans, setNutritionalPlans] = useState([]);
    const [patientProfile, setPatientProfile] = useState([]);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [nutritionalPlansPerPage] = useState(5);

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
        const fetchNutritionalPlans = async () => {
            setLoading(true);
            await patient.get("NutritionalDiaries/", patientId)
                .then((response) => {
                    if (response.status === 200) {
                        setNutritionalPlans(response.data.dati);
                        setLoading(false);
                    }
                }).catch((error) => {

                });
        };
        fetchNutritionalPlans();
    }, [show]);

    // Get current
    const indexOfLastNutritionalPlans = currentPage * nutritionalPlansPerPage;
    const indexOfFirstNutritionalPlans = indexOfLastNutritionalPlans - nutritionalPlansPerPage;
    const currentNutritionalPlans = nutritionalPlans?.slice(indexOfFirstNutritionalPlans, indexOfLastNutritionalPlans);

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
            <h1>Piano nutrizionale</h1>
            &nbsp;&nbsp;

            <NutritionalPlansTable nutritionalPlans={currentNutritionalPlans} patientId={patientId} setNutritionalPlans={setNutritionalPlans} />

            <NutritionalPlansModal show={show} handleClose={handleClose} patientId={patientId} fetchNutritionalPlans={useEffect}/>
            <div>
                <nav aria-label="Page navigation">
                    <ul className="pagination justify-content-end align-items-center">
                        <button className="btn btn-primary btn-sm me-auto d-none d-sm-block" data-bs-toggle="modal" data-bs-target="#nuovo-piano" onClick={handleShow}>Aggiungi</button>
                        <Pagination
                            patientsPerPage={nutritionalPlansPerPage}
                            totalPatients={nutritionalPlans?.length}
                            paginate={paginate}
                            currentPage={currentPage}
                            prevPage={prevPage}
                            nextPage={nextPage}
                        />
                    </ul>
                </nav>
                <button className="btn btn-primary mb-4 align-self-center d-block d-sm-none" data-bs-toggle="modal" data-bs-target="#nuovo-piano" onClick={handleShow}>Aggiungi</button>
            </div>

        </>
    );
}

function NutritionalPlansTable(props) {
    const deleteNutritionalPlan = (code) => {
        patient.delete("NutritionalDiaries/", code)
            .then((response) => {
                if (response.status === 200) {
                    NotificationManager.success(message.PATIENT + message.SuccessUpdate, entitiesLabels.SUCCESS, 3000);
                    props.setNutritionalPlans(response.data.dati);
                }
            }).catch((error) => {
                NotificationManager.error(message.ErrorServer, entitiesLabels.ERROR, 3000);
            });
        
    };


    return (
        <>
            <div className="table-wrapper custom-scrollbar">
                <table className="table custom">
                    <thead>
                        <tr>
                            <th scope="col">Data</th>
                            <th scope="col">Anteprima</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.nutritionalPlans?.map((ev) => <NutritionalPlanRow key={ev.id} nutritionalPlan={ev} patientId={props.patientId} deleteNutritionalPlan={deleteNutritionalPlan} />)
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
}

function NutritionalPlanRow(props) {
    return <tr><NutritionalPlanRowData nutritionalPlan={props.nutritionalPlan} patientId={props.patientId} /> <RowControl nutritionalPlanId={props.nutritionalPlan.id} deleteNutritionalPlan={props.deleteNutritionalPlan} /></tr>
}

function NutritionalPlanRowData(props) {

    return (<>
        <td>{props.nutritionalPlan.date.split(' ')[0]}</td>
        <td><img src={props.nutritionalPlan.elencoNutritionalDiaryPhoto[0].fileName} style={{ width: 100, height: 70 }} /></td>
        <td><Link to={`/NutritionalPlanDetails/${props.patientId}/${props.nutritionalPlan.id}`} state={props.nutritionalPlan} patientId={props.patientId} className="btn btn-primary btn-sm" >Visualizza immagini</Link></td>
    </>
    );
}

function RowControl(props) {
    return <td> <span onClick={() => props.deleteNutritionalPlan(props.nutritionalPlanId)}><button className="btn btn-secondary me-3" id>Elimina</button></span></td>;
}

function NutritionalPlansModal(props) {
    const [idPatient, setIdPatient] = useState(props.patientId);
    const [idNutritionalDiary, setIdNutritionalDiary] = useState('0');
    const [date, setDate] = useState();
    const [file, setFile] = useState([]);
    const [fileName, setFileName] = useState([]);
    const [filesArray, setFilesArray] = useState([]);

    function saveNutritionalPlan() {
        // setIdPaziente(parseInt(idPaziente));
        // setIdidMedicalExam(parseInt(idMedicalExam));
        const images = new FormData();
        // files.append("files", file);
        // files.append("fileName", fileName);
        filesArray.forEach(file => {
            images.append("images", file);
        });
        console.log(images);
        patient.postNutritionalDiaries("NutritionalDiaries/", images, {
            params:
                { idPatient, idNutritionalDiary, date }, headers: {
                    'Content-Type': 'multipart/form-data'
                }
        })
            .then((response) => {
                if (response.status === 200) {
                    NotificationManager.success(message.PATIENT + message.SuccessUpdate, entitiesLabels.SUCCESS, 3000);
                    props.fetchNutritionalPlans();
                }
            }).catch((error) => {
                NotificationManager.error(message.ErrorServer, entitiesLabels.ERROR, 3000);
            });
        clearState();
    };

    const saveFileSelected = (e) => {
        for (var i = 0; i < e.target.files.length; i++) {
            filesArray.push(e.target.files.item(i));
        }
        console.log(filesArray);
    };

    const clearState = () => {
        setDate();
        setIdNutritionalDiary();
        setFilesArray([]);
    }

    return (
        <>
            <div className="modal fade" id="nuovo-piano" tabIndex={-1} aria-labelledby="Nuovo piano nutrizionale" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" show={props.show} onHide={props.handleClose}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="h3">Carica nuovo piano nutrizionale</h3>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <form action>
                            <div className="modal-body align-items-start">
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="label-caricapiano">Carica piano nutrizionale</span>
                                    <input type="file" className="form-control form-control-sm" id="caricapiano" aria-describedby="label-caricareferto" multiple onChange={saveFileSelected} required/>
                                </div>
                                <div className="input-group mb-3 w-sm-50">
                                    <span className="input-group-text" id="label-data">Data</span>
                                    <input type="date" className="form-control form-control-sm" id="date" aria-describedby="label-data" name="date" onChange={e => setDate(e.target.value)} required/>
                                </div>
                            </div>
                            <div className="modal-footer d-flex justify-content-center justify-content-md-end">
                                <button className="btn btn-primary btn-upload" id onClick={saveNutritionalPlan}>Carica piano nutrizionale</button>
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


export { NutritionalPlansInfo };