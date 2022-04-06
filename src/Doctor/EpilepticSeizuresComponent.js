import { Col, Table, Form, Button, Container } from 'react-bootstrap';
import { iconDelete, iconEdit } from './icons';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';

function EpilepticSeizuresInfo(props) {
    return (
        <>
        <Col className='mb-3'>
            <EpilepticSeizuresForm numberStartingSeizures={props.numberStartingSeizures} />
            </Col>
            <Col className='mb-3'>
            <EpilepticSeizuresTable epilepticSeizures={props.epilepticSeizures} />
        </Col>
        </>
    );
}

function EpilepticSeizuresForm(props) {
    return (

        <Container className='content'>
            <Form>
                <div className='col-6'>
                    <Form.Group controlId='numberStartingSeizures'>
                        <Form.Label>Numero crisi di partenza</Form.Label>
                        <Form.Control disabled type='text' value={props.numberStartingSeizures} >
                        </Form.Control>
                    </Form.Group>
                </div>
            </Form>
        </Container>

    );
}

function EpilepticSeizuresTable(props) {
    return (
        <>
            <Container className='content'>
                <div className='col-6'>
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
            </Container>

        </>
    );
}

function EpilepticSeizureRow(props) {
    return <tr><EpilepticSeizureRowData epilepticSeizure={props.epilepticSeizure} /></tr>
}

function EpilepticSeizureRowData(props) {
    return (<>
        <td>{props.epilepticSeizure.dateTimeEventOccured === 0 ? "dateTimeEventOccured" : "dateTimeEventOccured"}</td>
        <td>{props.epilepticSeizure.description === 0 ? "description" : "description"}</td>
        <td>{props.epilepticSeizure.altroComportamento === 0 ? "altroComportamento" : "altroComportamento"}</td>
        <td>{props.epilepticSeizure.intensity === 0 ? "intensity" : "intensity"}</td>
    </>
    );
}


export { EpilepticSeizuresInfo };