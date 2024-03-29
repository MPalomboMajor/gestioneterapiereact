import React, { Component } from 'react';
import { Row, Container, Form, Button, Modal, InputGroup } from 'react-bootstrap';
import { patientcode, patient, user } from '../helpers/api/api';
import { Link } from "react-router-dom";
import { entitiesLabels, message } from '../helpers/Constants';
import moment from 'moment';
import SimpleReactValidator from 'simple-react-validator';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { internationalPrefix } from '../helpers/Constants';
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
        this.validatorOTP = new SimpleReactValidator();
        this.state = {
            isSuccess: false,
            prefix:"",
            userDto: {
                ...this.userModelProp(),
            },
            patiendDto:
            {
                id: 0,
                name: "",
                surName: "",
                codicePaziente: "",
                country: "",
                age: 0,
                sex: "",
                fiscalCode: "",
                provinceCode: "",
                city: "",
                phoneNumber: "",
                email: "",
                isActive: true,
                disabledDate: '',
                disabledCause: "",
                idDisabledCause: null,
                numeroCrisiPartenza: 0,
                otpCode: "",
                otpCodeExpired: moment(new Date()),
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
            // user.post("VerifyOTP", { idDispositivo: '', phone: this.state.patiendDto.phoneNumber, otp: this.state.patiendDto.otpCode })
            //     .then((response) => {
            //         if (response.data.statoEsito === 0) {
            var local = JSON.parse(localStorage.getItem("role"));
            var doctor = {
                idDoctor: local.id,
                nameDoctor: local.username
            };
            var PhoneNumber = this.state.prefix + this.state.patiendDto.phoneNumber.replace(/ /g,'');
            this.state.patiendDto.phoneNumber = PhoneNumber;
            var DTO = this.state.patiendDto;
            DTO.codicePaziente = parseInt(this.state.patiendDto.codicePaziente)
            DTO.doctorNameIdDTOs.push(doctor)
            patient.post("Save", DTO)
                .then((response) => {
                    if (response.data.statoEsito === 0) {
                        localStorage.setItem('newPatient', response.data.dati.id);
                        window.location.href = "/NewTherapy/" + response.data.dati.id;
                    } else {
                        NotificationManager.error(response.data.descrizioneEsito, entitiesLabels.ERROR, 3000);
                    }
                }).catch((error) => {
                    this.setState({ warning: true });
                    NotificationManager.error(message.ErrorServer, entitiesLabels.ERROR, 3000);
                });
            //     } else {
            //         NotificationManager.error(response.data.descrizioneEsito, entitiesLabels.ERROR, 3000);
            //     }
            // }).catch((error) => {
            //     this.setState({ warning: true });
            //     NotificationManager.error(message.ErrorServer, entitiesLabels.ERROR, 3000);
            // });

        } else {
            this.validator.showMessages();
            this.setState({ warning: true });
            this.forceUpdate();
        }
    }

    // openOTP = () => {
    //     if (this.validator.allValid()) {
    //         var CodPatient = parseInt(this.state.patiendDto.codicePaziente);
    //         var PhoneNumber = "+39" + this.state.patiendDto.phoneNumber;
    //         patientcode.post("check/", { CodPatient, PhoneNumber })
    //             .then((response) => {
    //                 if (response.data.statoEsito === 0) {
    //                     var local = JSON.parse(localStorage.getItem("role"));
    //                     var doctor = {
    //                         idDoctor: local.id,
    //                         nameDoctor: local.username
    //                     };
    //                     this.state.patiendDto.phoneNumber = PhoneNumber;
    //                     var DTO = this.state.patiendDto;
    //                     DTO.codicePaziente = parseInt(this.state.patiendDto.codicePaziente)
    //                     DTO.doctorNameIdDTOs.push(doctor)
    //                     this.setState({ isSuccess: true });
    //                 } else {
    //                     NotificationManager.error(response.data.descrizioneEsito, entitiesLabels.ERROR, 3000);
    //                 }
    //             }).catch((error) => {
    //                 this.setState({ warning: true });
    //                 NotificationManager.error(message.ErrorServer, entitiesLabels.ERROR, 3000);
    //             });
    //     } else {
    //         this.validator.showMessages();
    //         this.setState({ warning: true });
    //         this.forceUpdate();
    //     }

    // }

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
    handleClose = (el) => {
        this.setState({ isSuccess: false });
    };
    render() {
        const validations = {
            codicePaziente: this.validator.message(
                'codicePaziente',
                this.state.patiendDto.codicePaziente,
                'required|numeric'
            ),
            phoneNumber: this.validator.message(
                'Number',
                this.state.patiendDto.phoneNumber,
                'required|phone|numeric'
            ),
        };
        const validationsOTP = {
            otp: this.validatorOTP.message(
                'OTP',
                this.state.patiendDto.otpCode,
                'required'
            ),

        };

        function keyDown(e) { 
            var e = window.event || e;
            var key = e.keyCode;
            //space pressed
             if (key == 32) { //space
              e.preventDefault();
             }
                   
          }
          var Typeahead = require('react-bootstrap-typeahead').Typeahead;
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
                            <Form.Control id="codicePaziente" onChange={this.handleChange} alt="patiendDto" type="text" isInvalid={validations.codicePaziente != null} name="codicePaziente" placeholder="Codice assistito" />
                        </InputGroup>
                    </Row>
                    <Row className='col-12 pt-4' >
                        <Form.Label htmlFor="basic-url">Telefono</Form.Label>
                        <InputGroup className="mb-3">
                        <Typeahead
                                onChange={(event) =>{
                                    if(event[0] !== undefined){
                                        this.state.patiendDto.country = event[0].country;
                                        this.state.prefix = event[0].code;}}}
                                labelKey={option => `${option.code} ${option.iso}`}
                                paginationText='More..'
                                options={internationalPrefix}
                                />
                            {/* <InputGroup.Text id="basic-addon1">+39</InputGroup.Text> */}
                            <Form.Control id="phoneNumber" onChange={this.handleChange} alt="patiendDto" type="number" isInvalid={validations.phoneNumber != null} name="phoneNumber" placeholder="Telefono" onKeyDown={() => keyDown()}>
                            </Form.Control>
                        </InputGroup >
                    </Row>
                </Row>
                <Row className='col-12 pt-4' >

                    <Form.Group className="col-4 mb-3" controlId="formBasicPassword"> 
                        {/* Se si vuole richiedere codice otp per inserimento nuovo paziente chiamare openOTP invece di InsertPatient */}
                        <Button variant="btn btn-primary" onClick={() => this.InsertPatient()}>                        
                            Avanti
                        </Button>
                    </Form.Group>

                </Row>
                <Modal
                    show={this.state.isSuccess}
                    onHide={() => this.handleClose()}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{'Invio  codice Otp avvenuta con successo'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Form.Group className="col-12 mb-3" >
                                <Form.Label className="text-">Codice OTP</Form.Label>
                                <Form.Control name="otpCode" alt="patiendDto" id="otpCode" isInvalid={validationsOTP.otp != null} placeholder="Inserisci codice otp inviato al paziente" onChange={this.handleChange} />
                            </Form.Group>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>

                        <Button variant="secondary" onClick={() => this.handleClose()}>
                            Chiudi
                        </Button>
                        <Button variant="primary" onClick={() => this.InsertPatient()}>
                            Salva
                        </Button>
                    </Modal.Footer>
                </Modal>
                < NotificationContainer />
            </Container>
        )
    }
}

export default NewPatient
