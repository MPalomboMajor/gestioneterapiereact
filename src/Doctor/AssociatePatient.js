import React, { Component } from 'react';
import { Container, Row, Modal, Form, Button, } from 'react-bootstrap';
import { patient, medico, patientcode } from '../helpers/api/api';
import { RowCustom } from "../Doctor/PatientComponent";
import Pagination from '../helpers/pagination';
export class AssociatePatient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            code: 0,
            patient: {
                patientCode: 0,
                idDoctor: JSON.parse(localStorage.getItem("role")).id
            }
        }


    }
    componentDidMount() {
    }
    handleChange = (el) => {
        let objName = el.target.alt;
        const inputName = el.target.name;
        const inputValue = el.target.value;
        this.updateState(inputName, inputValue, objName);
    };
    updateState = (inputName, inputValue, objName) => {
        let statusCopy = Object.assign({}, this.state);
        statusCopy[objName][inputName] =parseInt(inputValue) ;
        this.setState(statusCopy);
    };
    associate = () => {
        patient.post("CollegaPaziente",this.state.patient)
            .then((response) => {
                if (response.data.dati) {
                    window.location.href = "/Dashboard";
                } else {

                }
            }).catch((error) => {
                this.setState({ warning: true });
            });

    }
    render() {
        return (
            <Container className="">
                <Row className='col-12 pt-4' >
                    <div className='col-12'>
                        <h2>Associa Paziente gia esistente</h2>
                    </div>
                </Row>
                <Row className='col-6 pt-4' >
                    <Form.Group className="mb-3">
                        <Form.Label>Codice Paziente</Form.Label>
                        <Form.Control id="patientCode" onChange={this.handleChange} alt="patient" type="number" name="patientCode" placeholder="Inserisci fornito dal Paziente" />
                    </Form.Group>
                </Row>
                <Row className='col-4 pt-4' >
                    <Button onClick={() => this.associate()}>Associa Paziente </Button>
                </Row>
            </Container>
        )
    }
}

export default AssociatePatient
