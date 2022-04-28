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

    // const [diagnosticTestId, setDiagnosticTestId] = useState(window.location.pathname.split('/').pop());
    // const [diagnosticTests, setDiagnosticTests] = useState([]);
    // const [patientProfile, setPatientProfile] = useState([]);

    useEffect(() => {
        for (var i = 0; i < selectedMedicalExamination.elencoRefertiVisita.length; i++) {
            filesArray.push(selectedMedicalExamination.elencoRefertiVisita[i].immagineReferto);
        }
        console.log(filesArray);
    });

    return (
        <>

            <Row className='col-12 pt-4' >
                <div className='col-12'>
                    <h2>Dettaglio visita medica</h2>
                </div>
            </Row>
            &nbsp;&nbsp;

            <Row>
                <Col>
                    <ControlledCarouselBloodTests selectedMedicalExamination={selectedMedicalExamination} imgsNames={filesArray} />
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

function ControlledCarouselBloodTests(props) {

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel activeIndex={index} onSelect={handleSelect} interval={null}>
            {props.imgsNames?.map((imgName, index) => (
                <Carousel.Item key={index}>
                    <img
                        className="selectedDiagnosticTestImages d-block w-100"
                        src={path.DIAGNOSTIC_TESTS_IMGS_PATH + imgName.split('\\').pop()}
                    />

                </Carousel.Item>
            ))}
            {/* <Carousel.Item >
                <img
                    className="selectedDiagnosticTestImages d-block w-50"
                    src={path.DIAGNOSTIC_TESTS_IMGS_PATH + props.selectedDiagnosticTest.fileName}
                // alt={img.author}
                />

            </Carousel.Item> */}


        </Carousel>
    );
}

// function BloodTestTable(response) {
//     return (
//         <>
//             <div className='col-6'>
//                 <Table striped bordered hover size="sm">
//                     <thead>
//                         <tr>

//                             <th>Esame</th>
//                             <th>Valore</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {
//                             response.data?.map((drugNameConcentration) => <BloodTestRow key={drugNameConcentration.id} drugNameConcentration={drugNameConcentration} />)
//                         }
//                     </tbody>
//                 </Table>
//             </div>



//         </>
//     );
// }

// function BloodTestRow(props) {
//     return <tr><BloodTestRowData drugNameConcentration={props.drugNameConcentration} /></tr>
// }

// function BloodTestRowData(props) {
//     return (<>
//         <td>{props.drugNameConcentration.name === 0 ? "dataEvento" : "dataEvento"}</td>
//         <td>{props.drugNameConcentration.concentration === 0 ? "disturboEvento" : "disturboEvento"}</td>

//     </>
//     );
// }






export { MedicalExaminationDetailsInfo };

