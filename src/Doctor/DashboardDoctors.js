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
        localStorage.removeItem('newPatient');
    }

     componentDidMount() {
        localStorage.removeItem('newPatient');
    //     api.getAll("/GetPatients")
    //         .then((response) => {
    //             if (response.status === 200) {
    //                 this.setState({
    //                     isLoaded: true,
    //                     items: response.data
    //                 });
    //             }
    //         }).catch((error) => {
    //             this.setState({ error: 1 })
    //         });
     }
    
    render() {
        return (
            
<>
                <Row className='col-12 pt-4' >
                    <div className='col-6'>
                        <h1>Pazienti</h1>
                    </div>                  
                </Row>
                &nbsp;&nbsp;
                <Row className='col-12 pt-4' >
                    <Col>
                        <PatientInfo  />
                    </Col>
                </Row>

                </>
        );
    }
}

export default DashboardDoctors;
