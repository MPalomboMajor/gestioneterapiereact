import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { caremanager } from '../helpers/api/api';
import moment from 'moment';
import { entitiesLabels, message } from '../helpers/Constants';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { Link } from 'react-router-dom';


function CareManagerProfile() {
        const [patientId, setPatientId] = useState(window.location.pathname.split('/').pop());
        const [careManagerProfile, setCareManagerProfile] = useState([]);
        const [isActive, setIsActive] = useState();
        const user = JSON.parse(localStorage.getItem("role"));
        const [loading, setLoading] = useState(false);

        useEffect(() => {
                const fetchCMProfile = async () => {
                        setLoading(true);
                        await caremanager.get("", parseInt(user.id))
                                .then((response) => {
                                        if (response.status === 200) {
                                                setCareManagerProfile(response.data.dati);
                                                setLoading(false);
                                        }
                                }).catch((error) => {

                                });

                };
                fetchCMProfile();
        }, []);


        const handleChange = (e) => {
                const inputValue = e.target.value;
                const inputName = e.target.getAttribute('name');
                setCareManagerProfile({
                        ...careManagerProfile, [inputName]:
                                inputValue
                });
        };

        // function editCareManager() {        
        //         patient.post("UpdateProfile/", patientProfile)
        //                 .then((response) => {
        //                         if (response.status === 200) {
        //                                 NotificationManager.success(message.PATIENT + message.SuccessUpdate, entitiesLabels.SUCCESS, 3000);
        //                         }
        //                 }).catch((error) => {
        //                         NotificationManager.error(message.ErrorServer, entitiesLabels.ERROR, 3000);
        //                 });
        // };





        return (
                <>
                        <h1 className="h1">Anagrafica CareManager {careManagerProfile.name} {careManagerProfile.surName}</h1>
                        <div className="row h-100 justify-content-center">
                                <div className="col-12 col-md-8">
                                        <div className="box">
                                                <form className="container-fluid g-0" action method="post">

                                                        <div className="row gx-3 mb-2">
                                                                <div className="col-12 col-md-4">
                                                                        <label htmlFor="nome" className="col-form-label w-100 text-md-end">Nome</label>
                                                                </div>
                                                                <div className="col-12 col-md-8">
                                                                        <input type="text" id="nome" className="form-control" aria-describedby name="name" defaultValue={careManagerProfile.name} onChange={handleChange} disabled/>
                                                                </div>
                                                        </div>
                                                        <div className="row gx-3 mb-2">
                                                                <div className="col-12 col-md-4">
                                                                        <label htmlFor="cognome" className="col-form-label w-100 text-md-end">Cognome</label>
                                                                </div>
                                                                <div className="col-12 col-md-8">
                                                                        <input type="text" id="cognome" className="form-control" aria-describedby name="surName" defaultValue={careManagerProfile.surName} onChange={handleChange} disabled/>
                                                                </div>
                                                        </div>
                                                        <div className="row gx-3 mb-2">
                                                                <div className="col-12 col-md-4">
                                                                        <label htmlFor="telefono" className="col-form-label w-100 text-md-end">Telefono</label>
                                                                </div>
                                                                <div className="col-12 col-md-8">
                                                                        <input type="text" id="telefono" className="form-control" aria-describedby name="phoneNumber" defaultValue={careManagerProfile.phoneNumber} onChange={handleChange} disabled/>
                                                                </div>
                                                        </div>
                                                        <div className="row gx-3 mb-2">
                                                                <div className="col-12 col-md-4">
                                                                        <label htmlFor="e-mail" className="col-form-label w-100 text-md-end">E-mail</label>
                                                                </div>
                                                                <div className="col-12 col-md-8">
                                                                        <input type="email" id="e-mail" className="form-control" aria-describedby defaultValue={careManagerProfile.email} onChange={handleChange} disabled/>
                                                                </div>
                                                        </div>
                                                </form>
                                        </div>
                                        <div className="container-fluid">
                                                <div className="row">
                                                        <div className="col-12 mb-3 d-flex justify-content-center justify-content-md-end">
                                                                <Link to={`/DoctorChartsInterface`} style={{ "color": "black" }}><button className="btn btn-secondary me-3" id>Home</button></Link>
                                                                {/* <Link to={`/PatientProfile/${patientId}`}><button className="btn btn-primary me-3" id>Avanti</button></Link>
                                                                <button className="btn btn-primary" id onClick={() => editPatient()}>Salva le modifiche</button> */}
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </div>


                       

                        < NotificationContainer />
                </>
        )
}


export { CareManagerProfile }
