import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { patient } from '../helpers/api/api';
import moment from 'moment';


function PatientRegistry() {
        const [patientId, setPatientId] = useState(window.location.pathname.split('/').pop());
        const [patientProfile, setPatientProfile] = useState([]);

        useEffect(() => {
                const reloadCount = sessionStorage.getItem('reloadCount');
                if (reloadCount < 2) {
                        sessionStorage.setItem('reloadCount', String(reloadCount + 1));
                        window.location.reload();
                } else {
                        sessionStorage.removeItem('reloadCount');
                }
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



        return (

                <>
                        <Row className='col-12 pt-4' >
                                <div className='col-12'>
                                        <h2>Anagrafica paziente</h2>
                                </div>
                        </Row>
                        &nbsp;&nbsp;
                        <Row className='col-12 pt-4'>
                                <Col className='col-6'>
                                        <Form>
                                                <div >
                                                        <Form.Group controlId='selectedPatientCode'>
                                                                <Form.Label>Codice paziente</Form.Label>
                                                                <Form.Control disabled type='text' value={patientProfile.codicePaziente} >
                                                                </Form.Control>
                                                        </Form.Group>
                                                        <Form.Group controlId='selectedFiscalCode'>
                                                                <Form.Label>Codice fiscale</Form.Label>
                                                                <Form.Control disabled type='text' value={patientProfile.fiscalCode} >
                                                                </Form.Control>
                                                        </Form.Group>
                                                        <Form.Group controlId='selectedName'>
                                                                <Form.Label>Nome</Form.Label>
                                                                <Form.Control disabled type='text' value={patientProfile.name} >
                                                                </Form.Control>
                                                        </Form.Group>
                                                        <Form.Group controlId='selectedLastName'>
                                                                <Form.Label>Cognome</Form.Label>
                                                                <Form.Control disabled type='text' value={patientProfile.surName} >
                                                                </Form.Control>
                                                        </Form.Group>
                                                        <Form.Group controlId='selectedPhone'>
                                                                <Form.Label>Telefono</Form.Label>
                                                                <Form.Control disabled type='text' value={patientProfile.phoneNumber} >
                                                                </Form.Control>
                                                        </Form.Group>
                                                        <Form.Group controlId='selectedEmail'>
                                                                <Form.Label>Email</Form.Label>
                                                                <Form.Control disabled type='text' value={patientProfile.email} >
                                                                </Form.Control>
                                                        </Form.Group>
                                                </div>

                                        </Form>
                                </Col>
                                <Col className='col-6'>
                                        <Row className='mb-6'>
                                                <Form>
                                                        <Form.Check
                                                                checked={patientProfile.isActive}
                                                                inline
                                                                label="Utente attivo"
                                                                name="canTravel"
                                                        />
                                                        <strong>Data di disattivazione:</strong> {moment(patientProfile.disabledDate).format("DD/MM/YYYY")}
                                                </Form>
                                        </Row>
                                        &nbsp;&nbsp;
                                        <Row className='mt-6'>
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                        <Form.Label>Causa disabilitazione</Form.Label>
                                                        <Form.Control as="textarea" rows={10} disabled value={patientProfile.disabledCause} />
                                                </Form.Group>
                                        </Row>
                                </Col>

                        </Row>
                        <div className='col-6 mt-4'>
                                <Button className='mt-100' >Indietro</Button> <Button >Avanti</Button>
                        </div>

                </>

        )
}


export { PatientRegistry }
