import { Col, Table } from 'react-bootstrap';
//import { useState } from 'react';

function PatientInfo(props) {
    return (
        <Col>
            <PatientTable patients={props.patients} />
        </Col>
    );
}

function PatientTable(props) {
    //const[patients, setPatients] = useState([...props.patients]);

    return (
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>Codice Paziente</th>
                    <th>Codice Fiscale</th>
                    <th>Cognome</th>
                    <th>Nome</th>
                    <th>Telefono</th>
                    <th>Stato Paziente</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.patients?.map((pa, index) => <PatientRow key={index} patient={pa} />)
                }
            </tbody>
        </Table>

    );
}

function PatientRow(props) {
    return <tr><PatientRowData patient={props.patient} /></tr>
}

function PatientRowData(props) {
    return (<>

        <td>{props.patient.codicePaziente}</td>
        <td>{props.patient.fiscalCode}</td>
        <td>{props.patient.name}</td>
        <td>{props.patient.surName}</td>
        <td>{props.patient.phoneNumber}</td>
        <td>{props.patient.isActive}</td>

    </>
    );
}

export { PatientInfo };