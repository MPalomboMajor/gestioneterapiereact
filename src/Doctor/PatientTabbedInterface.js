import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, Tabs, Tab } from 'react-bootstrap';
import { patient } from '../helpers/api/api';
import SimpleReactValidator from 'simple-react-validator';
import { useState, useEffect } from 'react';
import { PatientRegistry } from "./PatientRegistry"
import { PatientProfile } from "./PatientProfile"
import { AdverseEventsInfo } from "./AdverseEventsTable"
import { EpilepticSeizuresInfo } from "./EpilepticSeizuresComponent"
import { BloodTestsInfo } from "./BloodTestsComponent"


export class PatientTabbedInterface extends Component {

    userModelProp = () => ({
        patientCode: window.location.pathname.split('/').pop(),
        fiscalCode: '',
        name: '',
        surName: '',
        phoneNumber: '',
        email: '',
        canTravel: '',
        canDrive: '',
        numberStartingSeizures: '',

        itemsAdverseEvents: [],
        itemsEpilepticSeizures: []
    });

    constructor(props) {
        super(props);

        this.validator = new SimpleReactValidator();
        this.state = {
            patientDto: {
                ...this.userModelProp(),
            }
        }
    }


    async componentDidMount() {
        const [patientDto, itemsAdverseEvents, itemsEpilepticSeizures] = await Promise.all([
            this.getPatient(),
            this.getAdverseEvents(),
            this.getEpilepticSeizures(),
        ]);
    }

    getPatient() {
        patient.get("Get/", this.state.patientDto.patientCode)
            .then((response) => {
                if (response.status === 200) {
                    this.setState({
                        isLoaded: true,
                        patientDto: response.data
                    });
                }
            }).catch((error) => {
                this.setState({ error: 1 })
            });
    }

    getEpilepticSeizures() {
        patient.get("GetSeizures/", this.state.patientDto.patientCode)
            .then((response) => {
                if (response.status === 200) {
                    this.setState({
                        isLoaded: true,
                        itemsEpilepticSeizures: response.data,
                    });
                }
            }).catch((error) => {
                this.setState({ error: 1 })
            });
    }

    getAdverseEvents() {
        patient.get("GetEvents/", this.state.patientDto.patientCode)
            .then((response) => {
                if (response.status === 200) {
                    this.setState({
                        isLoaded: true,
                        itemsAdverseEvents: response.data,
                    });
                }
            }).catch((error) => {
                this.setState({ error: 1 })
            });
    }

    handleChange = (el) => {
        const inputName = el.target.name;
        const inputValue = el.target.value;
        this.updateState(inputName, inputValue, 'patientDto');
    };

    updateState = (inputName, inputValue, objName) => {
        const statusCopy = { ...this.state };
        statusCopy[objName][inputName] = inputValue;
        this.setState(statusCopy);
    };


    render() {

        return (

            <>
                <Row className='col-12 pt-12' >
                    <div className='col-12'>
                        <h1>Medico - Anagrafica paziente {this.state.patientDto.patientCode} </h1>
                    </div>
                </Row>
                <Tabs defaultActiveKey="anagraficaPaziente" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="anagraficaPaziente" title="Anagrafica paziente">
                        <PatientRegistry patient={this.state.patientDto} />
                    </Tab>
                    <Tab eventKey="profilo" title="Profilo">
                        <PatientProfile patientCode={this.state.patientDto.patientCode} />
                    </Tab>
                    <Tab eventKey="terapia" title="Terapia" >

                    </Tab>
                    <Tab eventKey="eventiAvversi" title="Eventi avversi" >
                        <AdverseEventsInfo adverseEvents={this.state.itemsAdverseEvents} />
                    </Tab>
                    <Tab eventKey="crisiEpilettiche" title="Crisi epilettiche" >
                        <EpilepticSeizuresInfo epilepticSeizures={this.state.itemsEpilepticSeizures} numberStartingSeizures={this.state.patientDto.numeroCrisiPartenza} />
                    </Tab>
                    <Tab eventKey="analisiDelSangue" title="Analisi del sangue" >
                        <BloodTestsInfo patientCode={this.state.patientDto.patientCode}/> 
                    </Tab>
                    <Tab eventKey="visiteMediche" title="Visite mediche" >

                    </Tab>
                    <Tab eventKey="mood" title="Mood" >

                    </Tab>
                </Tabs>
            </>

        )
    }
}

export default PatientTabbedInterface
