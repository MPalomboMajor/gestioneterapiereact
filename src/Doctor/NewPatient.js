import React, { Component } from 'react';
import { Row, Container, Form, Button, InputGroup } from 'react-bootstrap';
import { patientcode, patient, user } from '../helpers/api/api';
import { Link } from "react-router-dom";
import moment from 'moment';
import SimpleReactValidator from 'simple-react-validator';
export class NewPatient extends Component {
    userModelProp = () => ({
        id: 0,
        username: '',
        password: '',
        idRole: 1,

    });
    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator();
        this.state = {
            userDto: {
                ...this.userModelProp(),
            },
            patiendDto:
            {
                id: 0,
                name: "",
                surName: "",
                codicePaziente: 0,
                age: 0,
                sex: "",
                fiscalCode: "",
                phoneNumber: "",
                email: "",
                isActive: true,
                disabledDate: moment(new Date()),
                disabledCause: 0,
                numeroCrisiPartenza: 0,
                idUser: 0,
                canTravel: true,
                canDrive: true,
                healthInfo: "",
                satisfactionInfo: 0,
                giornoTrackingMoodSettimanale: "",
                oraTrackingMoodSettimanale: 0,
                oraTrackingMoodGiornaliero: 0,
                isFumatore: true,
                isAlcool: true,
                doctorNameIdDTOs: [
                ]

            }

        }
    }
    componentDidMount() {
        localStorage.removeItem('newPatient');
    }
    InsertPatient = () => {
        if (this.validator.allValid()) {
            var CodPatient = parseInt(this.state.patiendDto.codicePaziente);
            var PhoneNumber = "+39" + this.state.patiendDto.phoneNumber;
            patientcode.post("check/", { CodPatient, PhoneNumber })
                .then((response) => {
                    if (response.data.dati) {
                        var local = JSON.parse(localStorage.getItem("role"));
                        var doctor = {
                            idDoctor: local.id,
                            nameDoctor: local.username
                        };
                        this.state.patiendDto.phoneNumber = PhoneNumber;
                        var DTO = this.state.patiendDto;
                        DTO.codicePaziente = parseInt(this.state.patiendDto.codicePaziente)
                        DTO.doctorNameIdDTOs.push(doctor)
                        patient.post("Save", this.state.patiendDto)
                            .then((response) => {
                                if (response.data.dati) {
                                    localStorage.setItem('newPatient', response.data.dati.id);
                                    window.location.href = "/NewTherapy/" + response.data.dati.id;
                                }
                            }).catch((error) => {
                                this.setState({ warning: true });
                            });
                    } else {

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
                this.state.patiendDto.codicePaziente,
                'required'
            ),

        };
        return (
            <Container className=''>
                <Row className='col-12 pt-4' >
                    <div className='col-12'>
                        <h2>Inserimento nuovo assistito</h2>
                    </div>
                </Row>
                <Row className='col-12 pt-4' >
                    <Row className='col-12 pt-4' >
                        <Form.Label htmlFor="basic-url">Codice assistito</Form.Label>
                        <InputGroup className="mb-3">
                            <Form.Control id="codicePaziente" onChange={this.handleChange} alt="patiendDto" type="number" name="codicePaziente" placeholder="Codice assistito" />
                        </InputGroup>
                    </Row>
                    <Row className='col-12 pt-4' >
                        <Form.Label htmlFor="basic-url">Telefono</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">+39</InputGroup.Text>
                            <Form.Control id="phoneNumber" onChange={this.handleChange} alt="patiendDto" type="" name="phoneNumber" placeholder="Telefono" >
                            </Form.Control>
                        </InputGroup >
                    </Row>
                </Row>
                <Row className='col-12 pt-4' >

                    <Form.Group className="col-4 mb-3" controlId="formBasicPassword">
                        <Button variant="btn btn-primary" onClick={() => this.InsertPatient()}>
                            Avanti
                        </Button>
                    </Form.Group>

                </Row>
            </Container>
        )
    }
}

export default NewPatient
