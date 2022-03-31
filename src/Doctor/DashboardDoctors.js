import React, { Component } from 'react';
import '../css/style.css';
import { Row, Col, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { PatientInfo } from "../components/PatientComponent"

const fakePatients = [
    { code: '001', fiscalCode: 'CLMGPP09R48A662V', name: 'Agrippina', lastName: 'Colombo', phone: '3397993399', status: 'Malato' },
    { code: '002', fiscalCode: 'GMBJRA03H14F839T', name: 'Jari', lastName: 'Gambino', phone: '3397993399', status: 'Malato' },
    { code: '003', fiscalCode: 'SBTMRZ07L27L219L', name: 'Maurizio', lastName: 'Sabatino', phone: '3397993399', status: 'Malato' },
];

export class DashboardDoctors extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }



    render() {
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
                        <PatientInfo />
                    </Col>
                </Row>

            </Container>
        )
    }
}

export default DashboardDoctors;
