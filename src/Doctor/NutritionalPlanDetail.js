import { Col, Table, Form, Button, Container, Row, Carousel } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../helpers/api/api';
import { useParams } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import moment from 'moment';
import { path } from '../helpers/Constants';
import { patient } from '../helpers/api/api';
import { MedicalExaminationSlider } from './MedicalExaminationSlider';
import { entitiesLabels, message } from '../helpers/Constants';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { NutritionalPlanSlider } from './NutritionalPlanSlider';
import { DifferentFilesInfo } from './DifferentFilesExtTable';

function NutritionalPlanDetailsInfo() {
    const location = useLocation();
    const selectedNutritionalPlan = location.state;
    const [filesArray, setFilesArray] = useState([]);
    const [filesArrayNoImgs, setFilesArrayNoImg] = useState([]);
    const [imgsNames, setImgsNames] = useState([]);
    const [nutritionalPlan, setNutritionalPlan] = useState(selectedNutritionalPlan);
    const navigate = useNavigate();
    const [isLoaded, setIsLoaded] = useState(false);
    const [isPageLoaded, setIsPageLoaded] = useState(false);
    const [date, setDate] = useState(nutritionalPlan.date);
    const [idNutritionalPlan, setIdNutritionalPlan] = useState(nutritionalPlan.id);
    const [idPatient, setIdPatient] = useState(nutritionalPlan.idPatientProfile);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            setIsPageLoaded(true);
            for (var i = 0; i < selectedNutritionalPlan.elencoNutritionalDiaryPhoto.length; i++) {
                selectedNutritionalPlan.elencoNutritionalDiaryPhoto[i].fileName.split('.').pop() === 'png' ||
                    selectedNutritionalPlan.elencoNutritionalDiaryPhoto[i].fileName.split('.').pop() === 'jpg' ||
                    selectedNutritionalPlan.elencoNutritionalDiaryPhoto[i].fileName.split('.').pop() === 'jpeg' ||
                    selectedNutritionalPlan.elencoNutritionalDiaryPhoto[i].fileName.split('.').pop() === 'bmp' ||
                    selectedNutritionalPlan.elencoNutritionalDiaryPhoto[i].fileName.split('.').pop() === 'gif' ||
                    selectedNutritionalPlan.elencoNutritionalDiaryPhoto[i].fileName.split('.').pop() === 'eps' ||
                    selectedNutritionalPlan.elencoNutritionalDiaryPhoto[i].fileName.split('.').pop() === 'raw' ||
                    selectedNutritionalPlan.elencoNutritionalDiaryPhoto[i].fileName.split('.').pop() === 'tif' ||
                    selectedNutritionalPlan.elencoNutritionalDiaryPhoto[i].fileName.split('.').pop() === 'tiff' ?
                    filesArray.push(selectedNutritionalPlan.elencoNutritionalDiaryPhoto[i].fileName) :
                    filesArrayNoImgs.push(selectedNutritionalPlan.elencoNutritionalDiaryPhoto[i].fileName)
            }
        }
    }, [isLoaded]);



    // function saveMedicalExamination() {
    //     const files = new FormData();
    //     patient.postMedicalExamination("Visita/", files, {
    //         params:
    //         { idPatient, idMedicalExam, data, information, visitaSpecialistica, accessoRicovero }, headers: {
    //                 'Content-Type': 'multipart/form-data'
    //             }
    //     })
    //         .then((response) => {
    //             if (response.status === 200) {
    //                 NotificationManager.success(message.PATIENT + message.SuccessUpdate, entitiesLabels.SUCCESS, 3000);
    //             }
    //         }).catch((error) => {
    //             NotificationManager.error(message.ErrorServer, entitiesLabels.ERROR, 3000);
    //         });   
    //         navigate(`/Dashboard`);
    // };

    return (
        <>

            <h1 className="h1">Piano nutrizionale</h1>
            &nbsp;&nbsp;
            <div className="row h-100 w-100 justify-content-center" >
                <div className="col-12 col-md-6">
                    <div className="box carousel">
                        <p className="text-center px-3">Immagini inviate</p>
                        <NutritionalPlanSlider selectedNutritionalPlan={selectedNutritionalPlan} imgsNames={filesArray} />
                    </div>
                </div>
                <div className="col-12 col-md-7 overlap-md-1">
                    <div className="box carousel-info">
                        <form action>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="data-label">Data</span>
                                <input type="text" className="form-control form-control-sm" id="data" aria-describedby="data-label" value={nutritionalPlan.date.split(' ')[0]} disabled />
                            </div>
                            <div className="d-flex justify-content-center justify-content-md-end">
                                <Link to={`/NutritionalPlans/${nutritionalPlan.idPatientProfile}`} style={{ "color": "black" }}><button className="btn btn-secondary me-3" id>Torna a elenco</button></Link>
                            </div>
                        </form>
                    </div>
                </div>
                <DifferentFilesInfo noImgsNames={filesArrayNoImgs}/>
            </div>



        </>
    );
}


export { NutritionalPlanDetailsInfo };

