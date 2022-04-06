import React, { Component } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';


function PatientProfile(props) {

    return (

        <Container className='content'>
            <Form>
                <div className='col-8'>
                    {['checkbox'].map((type) => (
                        <div key={`inline-${type}`} className="mb-3">
                            <Form.Check
                                defaultChecked={props.patient.canTravel}
                                inline
                                label="Può viaggiare?"
                                name="canTravel"
                                type={type}
                                id={`inline-${type}-1`}
                                onChange={props.handleChange}
                            />
                            <Form.Check
                                defaultChecked={props.patient.canDrive}
                                inline
                                label="Può guidare?"
                                name="canDrive"
                                type={type}
                                id={`inline-${type}-2`}
                                onChange={props.handleChange}
                            />
                        </div>
                    ))}
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Note</Form.Label>
                        <Form.Control as="textarea" rows={10} disabled />
                    </Form.Group>
                </div>
                <div className='mb-3'>
                    <Button type='submit' >Indietro</Button> <Button type='submit' >Salva</Button> <Button type='submit' >Torna a elenco pazienti</Button> <Button type='submit' >Avanti</Button>
                </div>
            </Form>
        </Container>

    )
}


export { PatientProfile }
