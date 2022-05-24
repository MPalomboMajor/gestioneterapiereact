import { Table } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from "react-router-dom";
import moment from 'moment';
import { patient } from '../helpers/api/api';
import { DiagnosticTestSlider } from './DiagnosticTestSlider';
import { DifferentFilesInfo } from './DifferentFilesExtTable';

function BloodTestsInfo() {
    const location = useLocation();
    const selectedDiagnosticTest = location.state;
    const selectedPatientId = location.patientId;
    const [isLoaded, setIsLoaded] = useState(false);
    const [fileNames, setFileNames] = useState([]);
    // const [imgsNames, setImgsNames] = useState([]);
    //const [noImgsNames, setNoImgsNames] = useState([]);
    const [diagnosticTest, setDiagnosticTest] = useState(selectedDiagnosticTest);
    const [patientId, setPatientId] = useState(selectedPatientId);
    const navigate = useNavigate();

    // const [diagnosticTestId, setDiagnosticTestId] = useState(window.location.pathname.split('/').pop());
    // const [diagnosticTests, setDiagnosticTests] = useState([]);
    // const [patientProfile, setPatientProfile] = useState([]);

    useEffect(() => {
        const fetchImgsNames = async () => {
            await patient.get("GetFileName/", window.location.pathname.split('/').pop())
                .then((response) => {
                    if (response.status === 200) {
                        setFileNames(response.data.dati);
                    }
                }).catch((error) => {

                });
        };
        fetchImgsNames();
    }, []);

    const imgsNames = fileNames.filter(y =>
        y.split('.').pop() === 'png' ||
        y.split('.').pop() === 'jpg' ||
        y.split('.').pop() === 'jpeg' ||
        y.split('.').pop() === 'bmp' ||
        y.split('.').pop() === 'gif' ||
        y.split('.').pop() === 'eps' ||
        y.split('.').pop() === 'raw' ||
        y.split('.').pop() === 'tif' ||
        y.split('.').pop() === 'tiff'
    );

    const noImgsNames = fileNames.filter(y =>
        y.split('.').pop() !== 'png' &&
        y.split('.').pop() !== 'jpg' &&
        y.split('.').pop() !== 'jpeg' &&
        y.split('.').pop() !== 'bmp' &&
        y.split('.').pop() !== 'gif' &&
        y.split('.').pop() !== 'eps' &&
        y.split('.').pop() !== 'raw' &&
        y.split('.').pop() !== 'tif' &&
        y.split('.').pop() !== 'tiff'
    );
    
    return (
        <>
            <h2>Dettaglio esame diagnostico</h2>
            &nbsp;&nbsp;
            <div className="row h-100 w-100 justify-content-center" >
                <div className="col-12 col-md-6" >
                    <div className="box carousel">
                        <p className="text-center px-3">Immagini inviate</p>

                        <DiagnosticTestSlider imgsNames={imgsNames} />

                    </div>
                </div>
                <div className="col-12 col-md-7 overlap-md-1">
                    <div className="box carousel-info">
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="data-label">Data</span>
                            <input type="text" className="form-control form-control-sm" id="data" aria-describedby="data-label" value={diagnosticTest.uploadedDateTime} disabled />
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="tiporeferto-label">Tipo di referto</span>
                            <input type="text" className="form-control form-control-sm" id="tiporeferto" aria-describedby="tiporeferto-label" value={diagnosticTest.tipoReferto} disabled />
                        </div>
                        <div className="d-flex justify-content-center justify-content-md-end">
                            <button className="btn btn-secondary me-3" id onClick={() => navigate(-1)}>Torna a elenco</button>
                        </div>
                    </div>
                </div>
                <DifferentFilesInfo noImgsNames={noImgsNames} />
            </div>

            {/* <Row>
                <Col>
                    <ControlledCarouselBloodTests selectedDiagnosticTest={selectedDiagnosticTest} imgsNames={imgsNames} />
                </Col>
                <Col>
                    <div><strong>Referto del:</strong> {moment(diagnosticTest.uploadedDateTime).format("DD/MM/YYYY")}</div>
                    &nbsp;&nbsp;
                    <BloodTestTable />
                </Col>
            </Row>
            <div className='mb-3'>
                <Button type='submit' onClick={() => navigate(-1)}>Torna a elenco esami </Button>
            </div> */}

        </>
    );
}

function BloodTestTable(response) {
    return (
        <>
            <div className='col-6'>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>

                            <th>Esame</th>
                            <th>Valore</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            response.data?.map((drugNameConcentration) => <BloodTestRow key={drugNameConcentration.id} drugNameConcentration={drugNameConcentration} />)
                        }
                    </tbody>
                </Table>
            </div>



        </>
    );
}

function BloodTestRow(props) {
    return <tr><BloodTestRowData drugNameConcentration={props.drugNameConcentration} /></tr>
}

function BloodTestRowData(props) {
    return (<>
        <td>{props.drugNameConcentration.name === 0 ? "dataEvento" : "dataEvento"}</td>
        <td>{props.drugNameConcentration.concentration === 0 ? "disturboEvento" : "disturboEvento"}</td>

    </>
    );
}






export { BloodTestsInfo };