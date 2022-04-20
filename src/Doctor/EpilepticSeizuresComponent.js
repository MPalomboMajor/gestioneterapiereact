import { Col, Table, Form, Button, Container, Row } from 'react-bootstrap';
import { iconDelete, iconEdit } from './icons';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { patient } from '../helpers/api/api';

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

    return (
        <>
            <Row className='col-12 pt-4' >
                <div className='col-12'>
                    <h2>Crisi epilettiche</h2>
                </div>
            </Row>

            <Col className='mb-3'>
                <EpilepticSeizuresForm numberStartingSeizures={patientProfile.numeroCrisiPartenza} />
            </Col>
            <Col className='mb-3'>
                <EpilepticSeizuresTable epilepticSeizures={epilepticSeizures} />
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
                    <Form.Control disabled type='text' value={props.numberStartingSeizures} >
                    </Form.Control>
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
            <div className='mb-3'>
                <Button type='submit' >Indietro</Button> <Button type='submit' >Torna a elenco pazienti</Button> <Button type='submit' >Avanti</Button>
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