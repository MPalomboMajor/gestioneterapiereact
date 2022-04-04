import { Col, Table, Form, Button } from 'react-bootstrap';
import { iconDelete, iconEdit } from './icons';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';

function PatientInfo(props) {
    return (
        <Col>
            <PatientTable patients={props.patients} />
        </Col>
    );
}

function PatientTable(props) {   
    const navigate = useNavigate();
    const deletePatient = (codicePaziente) => {
     
    };

    const updatePatient = (codicePaziente) => {
        console.log(codicePaziente);
        navigate(`/PatientTabbedInterface/${codicePaziente}`);  
    };

    return (
        <>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Codice Paziente</th>
                        <th>Codice Fiscale</th>
                        <th>Cognome</th>
                        <th>Nome</th>
                        <th>Telefono</th>
                        <th>Email</th>
                        <th>Stato Paziente</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.patients.map((pa) => <PatientRow key={pa.codicePaziente} patient={pa} updatePatient={updatePatient} deletePatient={deletePatient} />)
                    }
                </tbody>
            </Table>
           
        </>
    );
}

function PatientRow(props) {
    return <tr><PatientRowData patient={props.patient} /><RowControl updatePatient={props.updatePatient} deletePatient={props.deletePatient} patientCode={props.patient.codicePaziente} /></tr>
}

function PatientRowData(props) {
    return (<>
        <td>{props.patient.codicePaziente}</td>
        <td>{props.patient.fiscalCode}</td>
        <td>{props.patient.name}</td>
        <td>{props.patient.surName}</td>
        <td>{props.patient.phoneNumber}</td>
        <td>{props.patient.email}</td>
        <td>{props.patient.isActive === 0 ? "Non attivo" : "Attivo"}</td>
    </>
    );
}

function RowControl(props) {
    return <td><span onClick={() => props.updatePatient(props.patientCode)}>{iconEdit}</span> <span onClick={() => props.deletePatient(props.patientCode)}>{iconDelete}</span></td>;
}


export { PatientInfo };