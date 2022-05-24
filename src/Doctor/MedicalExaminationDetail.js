import { Col, Table, Form, Button, Container, Row, Carousel } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';
import { api } from '../helpers/api/api';
import { useParams } from 'react-router-dom';
import { useLocation, Link } from "react-router-dom";
import moment from 'moment';
import { path } from '../helpers/Constants';
import { patient } from '../helpers/api/api';
import { MedicalExaminationSlider } from './MedicalExaminationSlider';
import { entitiesLabels, message } from '../helpers/Constants';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { DifferentFilesInfo } from './DifferentFilesExtTable';

function MedicalExaminationDetailsInfo() {
    const location = useLocation();
    const selectedMedicalExamination = location.state;
    const [filesArray, setFilesArray] = useState([]);
    const [filesArrayNoImgs, setFilesArrayNoImg] = useState([]);
    const [imgsNames, setImgsNames] = useState([]);
    const [medicalExamination, setMedicalExamination] = useState(selectedMedicalExamination);
    const navigate = useNavigate();
    const [isLoaded, setIsLoaded] = useState(false);
    const [isPageLoaded, setIsPageLoaded] = useState(false); //this helps
    const [data, setData] = useState(medicalExamination.dataVisita);
    const [idMedicalExam, setIdMedicalExam] = useState(medicalExamination.id);
    const [information, setInformation] = useState(medicalExamination.infoAggiuntive);
    const [idPatient, setIdPatient] = useState(medicalExamination.idPatientProfile);
    const [visitaSpecialistica, setVisitaSpecialistica] = useState(medicalExamination.visitaSpecialistica);
    const [accessoRicovero, setAccessoRicovero] = useState(medicalExamination.accessoRicovero);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            setIsPageLoaded(true);
            for (var i = 0; i < selectedMedicalExamination.elencoRefertiVisita.length; i++) {
                selectedMedicalExamination.elencoRefertiVisita[i].immagineReferto.split('.').pop() === 'png' ||
                selectedMedicalExamination.elencoRefertiVisita[i].immagineReferto.split('.').pop() === 'jpg' ||
                selectedMedicalExamination.elencoRefertiVisita[i].immagineReferto.split('.').pop() === 'jpeg' ||
                selectedMedicalExamination.elencoRefertiVisita[i].immagineReferto.split('.').pop() === 'bmp' ||
                selectedMedicalExamination.elencoRefertiVisita[i].immagineReferto.split('.').pop() === 'gif' ||
                selectedMedicalExamination.elencoRefertiVisita[i].immagineReferto.split('.').pop() === 'eps' ||
                selectedMedicalExamination.elencoRefertiVisita[i].immagineReferto.split('.').pop() === 'raw' ||
                selectedMedicalExamination.elencoRefertiVisita[i].immagineReferto.split('.').pop() === 'tif' ||
                selectedMedicalExamination.elencoRefertiVisita[i].immagineReferto.split('.').pop() === 'tiff' ?
                filesArray.push(selectedMedicalExamination.elencoRefertiVisita[i].immagineReferto) : 
                filesArrayNoImgs.push(selectedMedicalExamination.elencoRefertiVisita[i].immagineReferto)
            }
        }
    }, [isLoaded]);

    function saveMedicalExamination() {
        const files = new FormData();
        patient.postMedicalExamination("Visita/", files, {
            params:
                { idPatient, idMedicalExam, data, information, visitaSpecialistica, accessoRicovero }, headers: {
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
        navigate(`/MedicalExaminations/${idPatient}`);
    };

    return (
        <>

            <h1 className="h1">Visite mediche</h1>
            &nbsp;&nbsp;
            <div className="row h-100 w-100 justify-content-center" >
                <div className="col-12 col-md-6">
                    <div className="box carousel">
                        <p className="text-center px-3">Immagini inviate</p>
                        <MedicalExaminationSlider selectedMedicalExamination={selectedMedicalExamination} imgsNames={filesArray} />
                    </div>
                </div>
                <div className="col-12 col-md-7 overlap-md-1">
                    <div className="box carousel-info">
                        <form action>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="data-label">Data</span>
                                <input type="text" className="form-control form-control-sm" id="data" aria-describedby="data-label" value={medicalExamination.dataVisita} disabled />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="tiporeferto-label">Tipo di referto</span>
                                <input type="text" className="form-control form-control-sm" id="tiporeferto" aria-describedby="tiporeferto-label" value={medicalExamination.visitaSpecialistica === null ? medicalExamination.accessoRicovero : medicalExamination.visitaSpecialistica} disabled />
                            </div>
                            <label className="form-label" id="label-visita" htmlFor="visita">Visita specialistica</label>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control form-control-sm" id="visita" aria-describedby="label-visita" placeholder="Tipo di visita" value={medicalExamination.visitaSpecialistica === null ? medicalExamination.accessoRicovero : medicalExamination.visitaSpecialistica} disabled />
                            </div>
                            {/*<label class="form-label" id="label-ricovero" for="ricovero">Accesso ps / ricovero</label>
                            <div class="input-group mb-3">
                                <input type="text" class="form-control form-control-sm" id="ricovero" aria-describedby="label-ricovero" placeholder="Causa" value="Causa lorem ipsum"disabled>
                            </div>*/}
                            <label htmlFor="esito-visita" className="form-label">Esito visita</label>
                            <textarea className="form-control form-control-sm mb-3" id="esito-visita" rows={6} placeholder="Note informative associate al checkup" defaultValue={medicalExamination.infoAggiuntive} onChange={e => setInformation(e.target.value)} />
                            <div className="d-flex justify-content-center justify-content-md-end">
                                <Link to={`/MedicalExaminations/${idPatient}`} style={{ "color": "black" }}><button className="btn btn-secondary me-3" id>Torna a elenco</button></Link>
                                <button className="btn btn-primary btn-upload" id onClick={saveMedicalExamination}>Salva modifiche</button>
                            </div>
                        </form>
                    </div>
                </div>
                <DifferentFilesInfo noImgsNames={filesArrayNoImgs}/>
            </div>

        </>
    );
}

export { MedicalExaminationDetailsInfo };

