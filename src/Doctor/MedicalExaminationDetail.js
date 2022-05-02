import { Col, Table, Form, Button, Container, Row, Carousel } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';
import { api } from '../helpers/api/api';
import { useParams } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import moment from 'moment';
import { path } from '../helpers/Constants';
import { patient } from '../helpers/api/api';

function MedicalExaminationDetailsInfo() {
    const location = useLocation();
    const selectedMedicalExamination = location.state;
    const selectedPatientId = location.patientId;
    const [filesArray, setFilesArray] = useState([]);

    const [imgsNames, setImgsNames] = useState([]);
    const [medicalExamination, setMedicalExamination] = useState(selectedMedicalExamination);
    const [patientId, setPatientId] = useState(selectedPatientId);
    const navigate = useNavigate();
    const [isLoaded, setIsLoaded] = useState(false);
    const [isPageLoaded, setIsPageLoaded] = useState(false); //this helps

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            setIsPageLoaded(true);
            for (var i = 0; i < selectedMedicalExamination.elencoRefertiVisita.length; i++) {
                filesArray.push(selectedMedicalExamination.elencoRefertiVisita[i].immagineReferto);
            }
        }
    }, [isLoaded]);

    return (
        <>
            <h2>Dettaglio visita medica</h2>
            &nbsp;&nbsp;

            <Row>
                <Col>
                    <ControlledCarouselMedicalExamination selectedMedicalExamination={selectedMedicalExamination} imgsNames={filesArray} />
                </Col>
                <Col>
                    <div><strong>Visita del:</strong> {medicalExamination.dataVisita}</div>
                    &nbsp;&nbsp;
                    <div><h3>Esito della visita</h3></div>
                    <div>{selectedMedicalExamination.infoAggiuntive}</div>
                </Col>
            </Row>
            <div className='mb-3'>
                <Button type='submit' onClick={() => navigate(-1)}>Torna a elenco visite </Button>
            </div>

        </>
    );
}

function ControlledCarouselMedicalExamination(props) {
    const [index, setIndex] = useState(0);
    const imgsFolder = props.selectedMedicalExamination.id + "/";
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };
    console.log(process.env.REACT_APP_VISIT_REPORT_IMGS_PATH);
    console.log(imgsFolder);
    return (
        <Carousel activeIndex={index} onSelect={handleSelect} interval={null}>
            {props.imgsNames?.map((imgName, index) => (
                <Carousel.Item key={index}>
                    <img
                        className="selectedDiagnosticTestImages d-block w-100"
                        src={imgName }
                    />
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export { MedicalExaminationDetailsInfo };

