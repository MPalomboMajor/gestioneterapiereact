import React, { Component } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';


function PatientRegistry(props) {

        return (

                <>
                        <Form>
                                <div className='col-6'>
                                        <Form.Group controlId='selectedPatientCode'>
                                                <Form.Label>Codice paziente</Form.Label>
                                                <Form.Control disabled type='text' value={props.patient.codicePaziente} >
                                                </Form.Control>
                                        </Form.Group>
                                        <Form.Group controlId='selectedFiscalCode'>
                                                <Form.Label>Codice fiscale</Form.Label>
                                                <Form.Control disabled type='text' value={props.patient.fiscalCode} >
                                                </Form.Control>
                                        </Form.Group>
                                        <Form.Group controlId='selectedName'>
                                                <Form.Label>Nome</Form.Label>
                                                <Form.Control disabled type='text' value={props.patient.name} >
                                                </Form.Control>
                                        </Form.Group>
                                        <Form.Group controlId='selectedLastName'>
                                                <Form.Label>Cognome</Form.Label>
                                                <Form.Control disabled type='text' value={props.patient.surName} >
                                                </Form.Control>
                                        </Form.Group>
                                        <Form.Group controlId='selectedPhone'>
                                                <Form.Label>Telefono</Form.Label>
                                                <Form.Control disabled type='text' value={props.patient.phone} >
                                                </Form.Control>
                                        </Form.Group>
                                        <Form.Group controlId='selectedEmail'>
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control disabled type='text' value={props.patient.email} >
                                                </Form.Control>
                                        </Form.Group>
                                </div>
                                <div className='col-6 mt-4'>
                                        <Button className='mt-100' type='submit' >Indietro</Button> <Button type='submit' >Torna a elenco pazienti</Button> <Button type='submit' >Avanti</Button>
                                </div>
                        </Form>
                </>

        )
}


export { PatientRegistry }
