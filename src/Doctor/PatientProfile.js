import React, { Component } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { patient } from '../helpers/api/api';


function PatientProfile(props) {
    const [patient, setPatient] = useState([]);
    const [canTravel, setCanTravel] = useState();
    const [canDrive, setCanDrive] = useState();
    
    useEffect(() => {
        const fetchPatient = async () => {
            
            await patient.get("Get/", props.patientCode)
            .then((response) => {
                if (response.status === 200) {
                    setPatient(response.data);
                    setCanTravel(response.data.canTravel);
                    setCanDrive(response.data.canDrive);
            
                }
            }).catch((error) => {
                
            });
        };
        fetchPatient();
    }, [canTravel, canDrive]);

    return (

        <>
            <Form>
                <div className='col-8'>
                    {['checkbox'].map((type) => (
                        <div key={`inline-${type}`} className="mb-3">
                            <Form.Check
                                checked={canTravel}
                                inline
                                label="Può viaggiare?"
                                name="canTravel"
                                type={type}
                                id={`inline-${type}-1`}
                                onChange={() => setCanTravel(!canTravel)}
                            />
                            <Form.Check
                                checked={canDrive}
                                inline
                                label="Può guidare?"
                                name="canDrive"
                                type={type}
                                id={`inline-${type}-2`}
                                onChange={() => setCanDrive(!canDrive)}
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
        </>

    )
}


export { PatientProfile }
