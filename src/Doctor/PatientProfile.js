import React, { Component } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { patient } from '../helpers/api/api';


function PatientProfile(props) {
    const [eventKey, setEventKey] = useState();

    
    // const [patientProfile, setPatientProfile] = useState([props.patient]);
    // const [canTravel, setCanTravel] = useState(props.patient.canTravel);
    // const [canDrive, setCanDrive] = useState(props.patient.canDrive);
    
    // useEffect(() => {
        
    //                 setPatientProfile(props.patient);
    //                 setCanTravel(props.patient.canTravel);
    //                 setCanDrive(props.patient.canDrive);
            
    // }, []);

    // const updatePatient = (id) => {
    //     navigate(`/PatientTabbedInterface/${id}`);
    // };

    
        // if (this.validator.allValid()) {
        //     let userDto = this.state.userDto;
        //     user.post("Save", this.state.userDto)
        //         .then((response) => {
        //             if (response.status === 200) {
        //                 let medicoDto = this.state.medicoDTO;
        //                 medicoDto.idUser = response.data.dati.id;
        //                 medicoDto.email = response.data.dati.username;
        //                 medicoDto.idCentroMedico = 12;
        //                 medico.post("Register", this.state.medicoDTO)
        //                     .then((response) => {
        //                         if (response.status === 200) {
        //                             NotificationManager.success(message.MEDICO + message.SuccessInsert, entitiesLabels.SUCCESS, 3000);
        //                         }
        //                     }).catch((error) => {
        //                         NotificationManager.error(message.ErrorServer, entitiesLabels.ERROR, 3000);
        //                     });
        //             }
        //         }).catch((error) => {
        //             NotificationManager.error(message.ErrorServer, entitiesLabels.ERROR, 3000);
        //         });



        // } else {
        //     this.validator.showMessages();
        //     NotificationManager.warning(message.ErrorRequire, entitiesLabels.WARNING, 3000);
        //     this.forceUpdate();
        // }
    

    return (

        <>
            <Form>
                <div className='col-8'>
                    {['checkbox'].map((type) => (
                        <div key={`inline-${type}`} className="mb-3">
                            <Form.Check
                                checked={props.patient.canTravel}
                                inline
                                label="Può viaggiare?"
                                name="canTravel"
                                type={type}
                                id={`inline-${type}-1`}
                                onChange={() => props.setCanTravel(!props.patient.canTravel)}
                            />
                            <Form.Check
                                checked={props.patient.canDrive}
                                inline
                                label="Può guidare?"
                                name="canDrive"
                                type={type}
                                id={`inline-${type}-2`}
                                onChange={() => props.setCanDrive(!props.patient.canDrive)}
                            />
                        </div>
                    ))}
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Note</Form.Label>
                        <Form.Control as="textarea" rows={10} disabled value={props.patient.healthInfo} />
                    </Form.Group>
                </div>
                <div className='mb-3'>
                    <Button >Indietro</Button> <Button onClick={() => props.editPatient("profile")} >Salva</Button> <Button >Torna a elenco pazienti</Button> <Button >Avanti</Button>
                </div>
            </Form>
        </>

    )
}


export { PatientProfile }
