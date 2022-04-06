import { Col, Table, Form, Button, Container } from 'react-bootstrap';
import { iconDelete, iconEdit } from './icons';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';

function AdverseEventsInfo(props) {
    return (
        <Col>
            <AdverseEventsTable adverseEvents={props.adverseEvents} />
        </Col>
    );
}

function AdverseEventsTable(props) {
    return (
        <>
        <Container className='content'>
            <div className='col-6'>
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
            </Container>

        </>
    );
}

function AdverseEventRow(props) {
    return <tr><AdverseEventRowData adverseEvent={props.adverseEvent} /></tr>
}

function AdverseEventRowData(props) {
    return (<>
        <td>{props.adverseEvent.dataEvento === 0 ? "dataEvento" : "dataEvento"}</td>
        <td>{props.adverseEvent.disturboEvento === 0 ? "disturboEvento" : "disturboEvento"}</td>
        <td>{props.adverseEvent.livello === 0 ? "livello" : "livello"}</td>
    </>
    );
}


export { AdverseEventsInfo };