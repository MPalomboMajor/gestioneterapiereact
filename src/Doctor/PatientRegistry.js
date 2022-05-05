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
                        <h1 className="h1">Anagrafica assistito</h1>

                        <div className="row h-100 justify-content-center align-items-center" style={{ "width": "100%" }}>
                                <div className="col-12">
                                        <div className="box">
                                                <form className="container-fluid g-0" action method="post">
                                                        <div className="row">
                                                                <div className="col-12 col-md-6 mb-2">
                                                                        <div className="container-fluid g-0">
                                                                                <div className="row gx-3 mb-2">
                                                                                        <div className="col-12 col-md-4">
                                                                                                <label htmlFor="codice-paziente" className="col-form-label w-100 text-md-end">Codice paziente</label>
                                                                                        </div>
                                                                                        <div className="col-12 col-md-8">
                                                                                                <input type="text" id="codice-paziente" className="form-control form-control-sm" aria-describedby name="codicePaziente" defaultValue={patientProfile.codicePaziente} onChange={handleChange} disabled />
                                                                                        </div>
                                                                                </div>
                                                                                <div className="row gx-3 mb-2">
                                                                                        <div className="col-12 col-md-4">
                                                                                                <label htmlFor="codice-fiscale" className="col-form-label w-100 text-md-end">Codice fiscale</label>
                                                                                        </div>
                                                                                        <div className="col-12 col-md-8">
                                                                                                <input type="text" id="codice-fiscale" className="form-control form-control-sm" aria-describedby name="fiscalCode" defaultValue={patientProfile.fiscalCode} onChange={handleChange} disabled />
                                                                                        </div>
                                                                                </div>
                                                                                <div className="row gx-3 mb-2">
                                                                                        <div className="col-12 col-md-4">
                                                                                                <label htmlFor="nome" className="col-form-label w-100 text-md-end">Nome</label>
                                                                                        </div>
                                                                                        <div className="col-12 col-md-8">
                                                                                                <input type="text" id="nome" className="form-control form-control-sm" aria-describedby name="name" defaultValue={patientProfile.name} onChange={handleChange} disabled />
                                                                                        </div>
                                                                                </div>
                                                                                <div className="row gx-3 mb-2">
                                                                                        <div className="col-12 col-md-4">
                                                                                                <label htmlFor="cognome" className="col-form-label w-100 text-md-end">Cognome</label>
                                                                                        </div>
                                                                                        <div className="col-12 col-md-8">
                                                                                                <input type="text" id="cognome" className="form-control form-control-sm" aria-describedby name="surName" defaultValue={patientProfile.surName} onChange={handleChange} disabled />
                                                                                        </div>
                                                                                </div>
                                                                                <div className="row gx-3 mb-2">
                                                                                        <div className="col-12 col-md-4">
                                                                                                <label htmlFor="telefono" className="col-form-label w-100 text-md-end">Telefono</label>
                                                                                        </div>
                                                                                        <div className="col-12 col-md-8">
                                                                                                <input type="text" id="telefono" className="form-control form-control-sm" aria-describedby name="phoneNumber" defaultValue={patientProfile.phoneNumber} onChange={handleChange} disabled />
                                                                                        </div>
                                                                                </div>
                                                                                <div className="row gx-3 mb-2">
                                                                                        <div className="col-12 col-md-4">
                                                                                                <label htmlFor="e-mail" className="col-form-label w-100 text-md-end">E-mail</label>
                                                                                        </div>
                                                                                        <div className="col-12 col-md-8">
                                                                                                <input type="email" id="e-mail" className="form-control form-control-sm" aria-describedby name="email" defaultValue={patientProfile.email} onChange={handleChange} disabled />
                                                                                        </div>
                                                                                </div>
                                                                        </div>
                                                                </div>
                                                                <div className="col-12 col-md-6">
                                                                        <div className="form-check form-check-inline">
                                                                                <input className="form-check-input dark" type="checkbox" id="inlineCheckbox1" checked={patientProfile.isActive} onChange={() => updateStatesIsActive()} />
                                                                                <label className="form-check-label small" htmlFor="inlineCheckbox1">Utente ATTIVO</label>
                                                                        </div>
                                                                        <p >Data disattivazione {patientProfile.disabledDate}</p>
                                                                        <div className="form-group">
                                                                                <label htmlFor="ontozry" className="form-label small">Causa della disabilitazione</label>
                                                                                <select className="form-select form-select-sm mb-3" type="text" name="disabledCause" placeholder=".form-control-sm" aria-label="disabledCause" onChange={handleChange}>
                                                                                        <option></option>
                                                                                        <option value="1">Causa 1</option>
                                                                                        <option value="2">Causa 2</option>
                                                                                        <option value="3">Causa 3</option>
                                                                                </select>
                                                                                {/* <textarea id="codice-fiscale" className="form-control form-control-sm" rows={5} aria-describedby name="disabledCause" placeholder={"Eventuale causa della disabilitazione"} aria-label="disabledCause" onChange={handleChange} defaultValue={patientProfile.disabledCause} /> */}
                                                                        </div>
                                                                </div>
                                                        </div>
                                                </form>
                                        </div>
                                        <div className="container-fluid">
                                                <div className="row">
                                                        <div className="col-12 mb-3 d-flex justify-content-center justify-content-md-end">
                                                                <button className="btn btn-secondary me-3" id>Indietro</button><button className="btn btn-primary me-3" id>Avanti</button><button className="btn btn-primary" id onClick={() => editPatient()}>Salva le modifiche</button>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </div>
                        {/* <h1>Anagrafica Paziente</h1>
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
                                        <Form>
                                                <Form.Check
                                                        checked={patientProfile.isActive}
                                                        inline
                                                        label="Utente attivo"
                                                        name="canTravel"
                                                        onChange={() => updateStatesIsActive()}
                                                />
                                                <Form.Group controlId="disactivationDate">
                                                        <Form.Label>Data di disattivazione:</Form.Label>
                                                        <Form.Control type="date" name="disabledDate" placeholder="Inizio" onChange={handleChange} />
                                                </Form.Group>
                                        </Form>
                                        &nbsp;&nbsp;
                                        <Form.Label>Causa disabilitazione</Form.Label>
                                        <select className="form-select form-select-sm mb-3" type="text" name="disabledCause" placeholder=".form-control-sm" aria-label="disabledCause" onChange={handleChange}>
                                                <option></option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                        </select>
                                </Col>

                        </Row>
                        <div className='col-6 mt-4'>

                                <Button onClick={() => editPatient()} >Salva le modifiche</Button>
                        </div> */}
                        < NotificationContainer />
                </>
        )
}


export { PatientRegistry }
