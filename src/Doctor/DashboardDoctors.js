import React, { Component, useState, useEffect } from 'react';
import '../css/style.css';
import { Row, Col, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { PatientInfo } from "./PatientComponent"
import { api } from '../helpers/api/api';


export class DashboardDoctors extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        api.getAll("/GetPatients")
            .then((response) => {
                if (response.status === 200) {
                    this.setState({
                        isLoaded: true,
                        items: response.data
                    });
                }
            }).catch((error) => {
            this.setState({error: 1})    
            });
        // .then(res => res.json())
        // .then(
        //     (result) => {
        //         this.setState({
        //             isLoaded: true,
        //             items: result
        //         });
        //     },

        //     (error) => {
        //         this.setState({
        //             isLoaded: true,
        //             error
        //         });
        //     }
        // )
        // .catch((error) => {
        //     this.setState({
        //         notification: notificationType.DANGER,
        //         notificationHeaderMessage: 'Attenzione!',
        //         notificationMessage: 'Servizio momentaneamente non disponibile',
        //         show: true
        //     });
        // })
    }


    render() {
        // const { error, isLoaded, items } = this.state;
        // if (error) {
        //     return <div>Error: {error.message}</div>;
        // } else if (!isLoaded) {
        //     return <div>Loading...</div>;
        // } else {
        return (
            <Container className='content'>

                <Row className='col-12 pt-4' >
                    <div className='col-6'>
                        <h1>Pazienti</h1>
                    </div>
                    <div className='col-2'>
                        <Link to="/NewPatient" className='btn  btn-primary'>Nuovo Paziente</Link>
                    </div>
                    <div className='col-4'>
                        <Link to="/Register" className='btn btn-primary'>Collega Paziente già assegnato ad altro medico</Link>
                    </div>
                </Row>

                <Row className='col-12 pt-4' >
                    <Col>
                        <PatientInfo patients={this.state.items} />
                    </Col>
                </Row>

            </Container>
        );
        // }
    }
}

export default DashboardDoctors;
