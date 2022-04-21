import { Col, Table, Form, Button, Container, Row } from 'react-bootstrap';
import { iconDelete, iconEdit } from './icons';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { patient } from '../helpers/api/api';
import { entitiesLabels, message } from '../helpers/Constants';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

function EpilepticSeizuresInfo() {
    const [patientId, setPatientId] = useState(window.location.pathname.split('/').pop());
    const [epilepticSeizures, setEpilepticSeizures] = useState([]);
    const [patientProfile, setPatientProfile] = useState([]);

    useEffect(() => {
        const fetchPatient = async () => {
            await patient.get("Get/", patientId)
                .then((response) => {
                    if (response.status === 200) {
                        console.log("ciao");
                        setPatientProfile(response.data.dati);
                    }
                }).catch((error) => {

                });
        };
        fetchPatient();
    }, []);

    useEffect(() => {
        const fetchEpilepticSeizures = async () => {
            await patient.get("Seizures/", patientId)
                .then((response) => {
                    if (response.status === 200) {
                        setEpilepticSeizures(response.data.dati);
                    }
                }).catch((error) => {

                });
        };
        fetchEpilepticSeizures();
    }, []);

    const handleChange = (e) => {
        const inputValue = e.target.value;
        const inputName = e.target.getAttribute('name');
        setPatientProfile({
            ...patientProfile, [inputName]:
                inputValue
        });
    };

    // function editPatient() {  
    //     patient.post("Save/", patientProfile)
    //         .then((response) => {
    //             if (response.status === 200) {
    //                 NotificationManager.success(message.PATIENT + message.SuccessUpdate, entitiesLabels.SUCCESS, 3000);
    //             }
    //         }).catch((error) => {
    //             NotificationManager.error(message.ErrorServer, entitiesLabels.ERROR, 3000);
    //         });
    // };

    return (
        <>
            <Row className='col-12 pt-4' >
                <div className='col-12'>
                    <h2>Crisi epilettiche</h2>
                </div>
            </Row>
            &nbsp;&nbsp;
            <Col className='mb-3'>
                <EpilepticSeizuresForm numberStartingSeizures={patientProfile.numeroCrisiPartenza} onChange={handleChange} />
            </Col>
            <Col className='mb-3'>
                <EpilepticSeizuresTable epilepticSeizures={epilepticSeizures} />
            </Col>
            <Col className='mb-3'>
                <Button type='submit' >Indietro</Button> <Button type='submit' >Torna a elenco pazienti</Button> <Button type='submit' >Avanti</Button>
                {/* <Button onClick={() => editPatient()} >Salva le modifiche</Button> */}
            </Col>
        </>
    );
}

function EpilepticSeizuresForm(props) {


    return (
        <Form>
            <div className='col-6'>
                <Form.Group controlId='numberStartingSeizures'>
                    <Form.Label>Numero crisi di partenza</Form.Label>
                    <Form.Control type='text' name="numeroCrisiPartenza" defaultValue={props.numberStartingSeizures} onChange={props.onChange} disabled/>
                </Form.Group>
            </div>
        </Form>


    );
}

function EpilepticSeizuresTable(props) {
    return (
        <>

            <div className='col-10'>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Data</th>
                            <th>Descrizione</th>
                            <th>Comportamenti</th>
                            <th>Contestualità</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.epilepticSeizures?.map((ev) => <EpilepticSeizureRow key={ev.id} epilepticSeizure={ev} />)
                        }
                    </tbody>
                </Table>
            </div>



        </>
    );
}

function EpilepticSeizureRow(props) {
    return <tr><EpilepticSeizureRowData epilepticSeizure={props.epilepticSeizure} /></tr>
}

function EpilepticSeizureRowData(props) {
    return (<>
        <td>{moment(props.epilepticSeizure.dateTimeEventOccured).format("DD/MM/YYYY")}</td>
        <td>{props.epilepticSeizure.description}</td>
        <td>{props.epilepticSeizure.altroComportamento}</td>
        <td>{props.epilepticSeizure.intensity}</td>
    </>
    );
}


export { EpilepticSeizuresInfo };