import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { patient } from '../helpers/api/api';
import moment from 'moment';
import { entitiesLabels, message } from '../helpers/Constants';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';


function PatientRegistry() {
        const [patientId, setPatientId] = useState(window.location.pathname.split('/').pop());
        const [patientProfile, setPatientProfile] = useState([]);
        const [isActive, setIsActive] = useState();

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
                                                setPatientProfile(response.data.dati);
                                                setIsActive(response.data.dati.isActive);
                                        }
                                }).catch((error) => {

                                });
                };
                fetchPatient();
        }, []);

        const handleChange = (e) => {
                const inputValue = e.target.value;
                const inputName = e.target.getAttribute('name');
                setPatientProfile({
                        ...patientProfile, [inputName]:
                                inputValue
                });
        };

        const updateStatesIsActive = () => {
                setPatientProfile({
                        ...patientProfile, isActive:
                                !isActive
                });
                setIsActive(!isActive);
        }

        function editPatient() {
                patientProfile.disabledCause = parseInt(patientProfile.disabledCause);
                patient.post("UpdateProfile/", patientProfile)
                        .then((response) => {
                                if (response.status === 200) {
                                        NotificationManager.success(message.PATIENT + message.SuccessUpdate, entitiesLabels.SUCCESS, 3000);
                                }
                        }).catch((error) => {
                                NotificationManager.error(message.ErrorServer, entitiesLabels.ERROR, 3000);
                        });
        };


        return (

                <>
                        <h1>Anagrafica Paziente</h1>
                        
                        <Row className='col-12 pt-4'>
                                <Col className='col-6'>
                                        <Form>
                                                <div >
                                                        <Form.Group controlId='selectedPatientCode'>
                                                                <Form.Label>Codice paziente</Form.Label>
                                                                <Form.Control type='text' name="codicePaziente" defaultValue={patientProfile.codicePaziente} onChange={handleChange} disabled />

                                                        </Form.Group>
                                                        <Form.Group controlId='selectedFiscalCode'>
                                                                <Form.Label>Codice fiscale</Form.Label>
                                                                <Form.Control type='text' name="fiscalCode" defaultValue={patientProfile.fiscalCode} onChange={handleChange} disabled />
                                                        </Form.Group>
                                                        <Form.Group controlId='selectedName'>
                                                                <Form.Label>Nome</Form.Label>
                                                                <Form.Control type='text' name="name" defaultValue={patientProfile.name} onChange={handleChange} disabled />
                                                        </Form.Group>
                                                        <Form.Group controlId='selectedLastName'>
                                                                <Form.Label>Cognome</Form.Label>
                                                                <Form.Control type='text' name="surName" defaultValue={patientProfile.surName} onChange={handleChange} disabled />
                                                        </Form.Group>
                                                        <Form.Group controlId='selectedPhone'>
                                                                <Form.Label>Telefono</Form.Label>
                                                                <Form.Control type='text' name="phoneNumber" defaultValue={patientProfile.phoneNumber} onChange={handleChange} disabled />
                                                        </Form.Group>
                                                        <Form.Group controlId='selectedEmail'>
                                                                <Form.Label>Email</Form.Label>
                                                                <Form.Control type='text' name="email" defaultValue={patientProfile.email} onChange={handleChange} disabled />
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
                                                                onChange={() => updateStatesIsActive()}
                                                        />
                                                        <strong>Data di disattivazione:</strong> {patientProfile.disabledDate}
                                                </Form>
                                        </Row>
                                        &nbsp;&nbsp;
                                        <Row className='mt-6'>
                                                <Form.Label>Causa disabilitazione</Form.Label>
                                                <Form.Select aria-label="disabledCause" name="disabledCause" onChange={handleChange}>
                                                        <option></option>
                                                        <option value="1">One</option>
                                                        <option value="2">Two</option>
                                                        <option value="3">Three</option>
                                                </Form.Select>
                                                {/* <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                        <Form.Label>Causa disabilitazione</Form.Label>
                                                        <Form.Control as="textarea" rows={10} name="disabledCause" value={patientProfile.disabledCause} onChange={handleChange} />
                                                </Form.Group> */}
                                        </Row>
                                </Col>

                        </Row>
                        <div className='col-6 mt-4'>

                                <Button onClick={() => editPatient()} >Salva le modifiche</Button>
                        </div>
                        < NotificationContainer />

                </>

        )
}


export { PatientRegistry }
