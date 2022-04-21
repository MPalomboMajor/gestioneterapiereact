import React, { Component } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { patient } from '../helpers/api/api';
import { entitiesLabels, message } from '../helpers/Constants';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

function PatientProfile() {
    const [patientId, setPatientId] = useState(window.location.pathname.split('/').pop());
    const [patientProfile, setPatientProfile] = useState([]);
    const [canTravel, setCanTravel] = useState();
    const [canDrive, setCanDrive] = useState();

    useEffect(() => {
        const fetchPatient = async () => {
            await patient.get("Get/", patientId)
                .then((response) => {
                    if (response.status === 200) {
                        setPatientProfile(response.data.dati);
                        setCanTravel(response.data.dati.canTravel);
                        setCanDrive(response.data.dati.canDrive);
                    }
                }).catch((error) => {

                });
        };
        fetchPatient();
    }, []);

    function editPatient() {  
        patient.post("Save/", patientProfile)
            .then((response) => {
                if (response.status === 200) {
                    NotificationManager.success(message.PATIENT + message.SuccessUpdate, entitiesLabels.SUCCESS, 3000);
                }
            }).catch((error) => {
                NotificationManager.error(message.ErrorServer, entitiesLabels.ERROR, 3000);
            });
    };

    const updateStatesCanTravel = () => {
        setPatientProfile({
            ...patientProfile, canTravel:
                !canTravel
        });
        setCanTravel(!canTravel);
    }

    const updateStatesCanDrive = () => {
        setPatientProfile({
            ...patientProfile, canDrive:
                !canDrive
        });
        setCanDrive(!canDrive);
    }

    const handleChange = (e) => {       
        const inputValue = e.target.value;
        const inputName = e.target.getAttribute('name');
        setPatientProfile({                      
                ...patientProfile, [inputName]:
                        inputValue
        });
};

    return (

        <>
            <Row className='col-12 pt-4  md-6' >
                <div className='col-12'>
                    <h2>Profilo paziente</h2>
                </div>
            </Row>
            &nbsp;&nbsp;
            <Form>
                <div className='col-8'>
                    {['checkbox'].map((type) => (
                        <div key={`inline-${type}`} className="mb-3">
                            <Form.Check
                                checked={patientProfile.canTravel}
                                inline
                                label="Può viaggiare?"
                                name="canTravel"
                                type={type}
                                id={`inline-${type}-1`}
                                onChange={() => updateStatesCanTravel()
                            }
                            />
                            <Form.Check
                                checked={patientProfile.canDrive}
                                inline
                                label="Può guidare?"
                                name="canDrive"
                                type={type}
                                id={`inline-${type}-2`}
                                onChange={() => updateStatesCanDrive()
                                }
                            />
                        </div>
                    ))}
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Note</Form.Label>
                        <Form.Control as="textarea" name="healthInfo" rows={10} defaultValue={patientProfile.healthInfo} onChange={handleChange} disabled/>
                    </Form.Group>
                </div>
                <div className='mb-3'>
                    <Button >Indietro</Button> <Button onClick={() => editPatient()} >Salva le modifiche</Button> <Button >Annulla</Button> <Button >Avanti</Button>
                </div>
            </Form>
            < NotificationContainer />
        </>

    )
}


export { PatientProfile }
