import React, { Component } from 'react';
import '../css/style.css';
import { Row, Container, Form, Button, FormGroup } from 'react-bootstrap';
import { api } from '../helpers/api/api';
import { Link } from "react-router-dom";
import SimpleReactValidator from 'simple-react-validator';
export class NewPatient extends Component {
    patientModelProp = () => ({       
            id: 0,
            name: '',
            surName: '',
            codicePaziente: 0,
            age: 0,
            sex: '',
            fiscalCode: '',
            phoneNumber: '',
            eMail: '',
            isActive: 0,
            disabledDate: 0,
            disabledCause: 0,
            numeroCrisiPartenza: 0       
    });
    constructor(props) {
        super(props);
        
        this.validator = new SimpleReactValidator();
        this.state = {
            patientDto: {
                ...this.patientModelProp(),
            },
        }
    }

    InsertPatient = () => {
        if (this.validator.allValid()) {
            api.post("/InsertPatient", this.state.patientDto)
                .then((response) => {
                    if (response.status === 200) {
                        this.setState({ success: true });
                    }
                }).catch((error) => {
                    this.setState({ warning: true });
                });
        } else {
            this.validator.showMessages();
            this.setState({ warning: true });
            this.forceUpdate();
        }
    }

    handleChange = (el) => {
        let objName = el.target.alt;
        const inputName = el.target.name;
        const inputValue = el.target.value;
        this.updateState(inputName, inputValue, objName);
    };

    updateState = (inputName, inputValue, objName) => {
        let statusCopy = Object.assign({}, this.state);
     
        statusCopy[objName][inputName] = inputValue;

        this.setState(statusCopy);
    };

    render() {
        const validations = {
            codicePaziente: this.validator.message(
                'codicePaziente',
                this.state.patientDto.codicePaziente,
                'required'
            ),

        };
        return (
            <Container className='content'>
                <Form>
                    <Row className='col-12 pt-4' >
                        <Form.Group className="mb-3">
                            <Form.Label>Codice Paziente</Form.Label>
                            <Form.Control onChange={this.handleChange} alt="patientDto" type="number" name="codicePaziente" isInvalid={validations.codicePaziente != null} placeholder="Inserisci Codice Paziente" />
                        </Form.Group>
                    </Row>
                    <Row className='col-12 pt-4' >

                        <div className='col-3'>
                            <Link to="/" className='btn btn-primary'>Avanti</Link>
                        </div>
                        <Form.Group className="col-4 mb-3" controlId="formBasicPassword">
                            <Button variant="btn btn-primary" onClick={() => this.InsertPatient()}>
                                Salva
                            </Button>
                        </Form.Group>

                    </Row>
                </Form>
            </Container>
        )
    }
}

export default NewPatient
