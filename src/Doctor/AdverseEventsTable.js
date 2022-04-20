import { Col, Table, Form, Button, Container, Row } from 'react-bootstrap';
import { iconDelete, iconEdit } from './icons';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import moment from 'moment';
import { patient } from '../helpers/api/api';

function AdverseEventsInfo() {
    const [patientId, setPatientId] = useState(window.location.pathname.split('/').pop());
    const [adverseEvents, setAdverseEvents] = useState([]);

    useEffect(() => {
        const fetchAdverseEvents = async () => {
            await patient.get("Events/", patientId)
                .then((response) => {
                    if (response.status === 200) {
                        setAdverseEvents(response.data.dati);
                    }
                }).catch((error) => {

                });
        };
        fetchAdverseEvents();
    }, []);


    return (
        <>
            <Row className='col-12 pt-4' >
                <div className='col-12'>
                    <h2>Eventi avversi</h2>
                </div>
            </Row>
            <Col>
                <AdverseEventsTable adverseEvents={adverseEvents} />
            </Col>
        </>
    );
}

function AdverseEventsTable(props) {
    return (
        <>

            <div className='col-10'>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Data</th>
                            <th>Evento</th>
                            <th>Intensità</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.adverseEvents?.map((ev) => <AdverseEventRow key={ev.id} adverseEvent={ev} />)
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

function AdverseEventRow(props) {
    return <tr><AdverseEventRowData adverseEvent={props.adverseEvent} /></tr>
}

function AdverseEventRowData(props) {
    return (<>
        <td>{moment(props.adverseEvent.dateEvent).format("DD/MM/YYYY")}</td>
        <td>{props.adverseEvent.description}</td>
        <td>{props.adverseEvent.intensity}</td>
    </>
    );
}


export { AdverseEventsInfo };