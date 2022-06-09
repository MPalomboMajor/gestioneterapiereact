import { useState, useEffect , useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { patient } from '../helpers/api/api';
import { Link } from 'react-router-dom';
import { entitiesLabels, message } from '../helpers/Constants';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Pagination from '../helpers/pagination';
import moment from 'moment';

function DiagnosticTestsInfo() {
    const [patientId, setPatientId] = useState(window.location.pathname.split('/').pop());
    const [diagnosticTests, setDiagnosticTests] = useState([]);
    const [patientProfile, setPatientProfile] = useState([]);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [diagnosticTestsPerPage] = useState(8);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true)
    };

    useEffect(() => {
        const fetchPatient = () => {
            patient.get("Get/", patientId)
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
        const fetchDiagnosticTests = () => {
            setLoading(true);
            patient.get("AnalysisPreview/", patientId)
                .then((response) => {
                    if (response.status === 200) {
                        setDiagnosticTests(response.data.dati);
                        setLoading(false);
                    }
                }).catch((error) => {

                });
        };
        fetchDiagnosticTests();
    }, []);

    // Get current
    const indexOfLastDiagnosticTest = currentPage * diagnosticTestsPerPage;
    const indexOfFirstDiagnosticTest = indexOfLastDiagnosticTest - diagnosticTestsPerPage;
    const currentDiagnosticTests = diagnosticTests?.slice(indexOfFirstDiagnosticTest, indexOfLastDiagnosticTest);

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

            <h1 class="h1">Esami diagnostici {patientProfile.name} {patientProfile.surName} - Codice assistito: {patientProfile.codicePaziente}</h1>

            &nbsp;&nbsp;
            <DiagnosticTestsTable diagnosticTests={currentDiagnosticTests} patientId={patientId} setDiagnosticTests={setDiagnosticTests} />
            <div>
                <nav aria-label="Page navigation">
                    <ul className="pagination justify-content-end align-items-center">
                        <button className="btn btn-primary btn-sm me-auto d-none d-sm-block" data-bs-toggle="modal" data-bs-target="#nuovo-esame" onClick={handleShow}>Nuovo esame</button>
                        <Pagination
                            patientsPerPage={diagnosticTestsPerPage}
                            totalPatients={diagnosticTests?.length}
                            paginate={paginate}
                            currentPage={currentPage}
                            prevPage={prevPage}
                            nextPage={nextPage}
                        />
                    </ul>
                </nav>
                <button className="btn btn-primary mb-4 align-self-center d-block d-sm-none" data-bs-toggle="modal" data-bs-target="#nuovo-esame" onClick={handleShow}>Nuovo esame</button>
            </div>
            <DiagnosticTestsModal show={show} handleClosed={ handleClose} patientId={patientId}  />
        </>
    );
}


function DiagnosticTestsTable(props) {
    const deleteDiagnosticTest = (code) => {
        patient.delete("Analisi/", code)
            .then((response) => {
                if (response.status === 200) {
                    NotificationManager.success(message.PATIENT + message.SuccessUpdate, entitiesLabels.SUCCESS, 3000);
                    props.setDiagnosticTests(response.data.dati);
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
                            <th scope="col">Tipo esame</th>
                            <th scope="col">Del</th>
                            <th scope="col">Anteprima</th>
                            <th scope="col"></th>
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
    return <tr><DiagnosticTestRowData diagnosticTest={props.diagnosticTest} patientId={props.patientId} /> <RowControl diagnosticTestId={props.diagnosticTest.idBloodData} deleteDiagnosticTest={props.deleteDiagnosticTest} /></tr>
}

function DiagnosticTestRowData(props) {
    return (<>
        <td>{props.diagnosticTest.tipoReferto}</td>
        <td>{props.diagnosticTest.uploadedDateTime.split(' ')[0]}</td>
        <td><Link to={`/BloodTest/${props.patientId}/${props.diagnosticTest.id}`} state={props.diagnosticTest} patientId={props.patientId} ><img src={props.diagnosticTest.fileName} style={{ width: 100, height: 70 }} /></Link></td>
        <td><Link to={`/BloodTest/${props.patientId}/${props.diagnosticTest.id}`} state={props.diagnosticTest} patientId={props.patientId} className="btn btn-primary btn-sm">Visualizza Immagini</Link></td>
    </>
    );
}

function RowControl(props) {
    return <td> <span onClick={() => props.deleteDiagnosticTest(props.diagnosticTestId)}><button className="btn btn-secondary me-3" id>Elimina</button></span></td>;
}

function DiagnosticTestsModal(props) {
    const [idAnalisi, setIdAnalisi] = useState('0');
    const [dateReferto, setDateReferto] = useState();
    const [idPaziente, setIdPaziente] = useState(props.patientId);
    const [tipoReferto, setTipoReferto] = useState();
    const [file, setFile] = useState([]);
    const [fileName, setFileName] = useState([]);
    const [filesArray, setFilesArray] = useState([]);
    const imageInputRef = useRef(); 
    const [flagModal, setFlagModal] = useState(true);

    useEffect(() => {
        if (!filesArray.length) {
            document.getElementById("btnUpload").disabled = true
        } else {
            document.getElementById("btnUpload").disabled = false
        }
    }, [filesArray]);
    useEffect(() => {
        setDateReferto();
        setTipoReferto();
        setFilesArray([]);
        imageInputRef.current.value= '';
    }, [props.show]);
    useEffect(() => {
        setFlagModal(true);
    }, [flagModal]);
    function saveDiagnosticTest(evt) {
        const files = new FormData();
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
                   window.location.reload();
                }
            }).catch((error) => {
                NotificationManager.error(message.ErrorServer, entitiesLabels.ERROR, 3000);
            });
            
    };

    const saveFileSelected = (e) => {
        const fa = [];
        for (var i = 0; i < e.target.files.length; i++) {
            fa.push(e.target.files.item(i));
        }
        setFilesArray(fa);
    };



    return (

        <>
            <div className="modal fade" id="nuovo-esame" tabIndex={-1} aria-labelledby="Nuovo esame" aria-hidden="false">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="h3">Nuovo esame</h3>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"  onClick={props.handleClosed} />
                        </div>
                        <div className="modal-body align-items-end">
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="captiontest">Carica referto</span>
                                <input type="file" className="form-control form-control-sm" id="captiontestfile"  aria-describedby="basic-addon3" multiple  ref={imageInputRef}  onChange={saveFileSelected} required />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="type">Tipo di referto</span>
                                <input type="text" className="form-control form-control-sm" id="type" value={tipoReferto? tipoReferto : ''} placeholder='Inserisci tipo di referto' name="tipoReferto" onChange={e => setTipoReferto(e.target.value)} required />
                            </div>
                            <div className="input-group mb-3 w-sm-50">
                                <span className="input-group-text" id="data">Data</span>
                                <input type="date" className="form-control form-control-sm" id="data" aria-describedby="basic-addon3" name="dateReferto" value={dateReferto? dateReferto: ''} onChange={e => setDateReferto(e.target.value)} required max={moment().format("YYYY-MM-DD")} />
                            </div>
                        </div>
                        <div className="modal-footer d-flex justify-content-center justify-content-md-end">
                            <button className="btn btn-primary btn-upload" id="btnUpload"  onClick={saveDiagnosticTest}  >Carica referto</button>
                        </div>
                        < NotificationContainer />
                    </div>
                </div>
            </div>
        </>
    );
}


export { DiagnosticTestsInfo };