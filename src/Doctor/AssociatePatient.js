import React, { Component } from 'react';
import { Container, Row, Modal, Form, Button, } from 'react-bootstrap';
import { patient, medico, patientcode, user } from '../helpers/api/api';
import SimpleReactValidator from 'simple-react-validator';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { entitiesLabels, message } from '../helpers/Constants';
export class AssociatePatient extends Component {

    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator();
        this.validatorOTP = new SimpleReactValidator();
        this.state = {
            code: 0,
            otp: '',
            isSuccess: false,
            isSuccessSendOtp: false,
            phone:'',
            patient: {
                patientCode: null,
                idDoctor: JSON.parse(localStorage.getItem("role")).id
            }
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
        statusCopy[objName][inputName] = parseInt(inputValue);
        this.setState(statusCopy);
    };
    handleChangeOtp = (el) => {
        const inputName = el.target.name;
        const inputValue = el.target.value;
        this.updateStateconfirm(inputName, inputValue);
    };
    updateStateconfirm = (inputName, inputValue) => {
        const statusCopy = { ...this.state };
        statusCopy[inputName] = inputValue;

        this.setState(statusCopy);
    };
    handleClose = (el) => {
        window.location.href = "/Dashboard";
    };
    handleCloseOtp = (el) => {
        this.setState({ isSuccessSendOtp: false });
    };
    associate = () => {
        if (this.validatorOTP.allValid()) {
            var code = parseInt(this.state.patient.patientCode);
            user.post("VerifyOTP", {idDispositivo: '', phone: this.state.phone , otp: this.state.otp })
                .then((response) => {
                    if (response.data.statoEsito===0) {
                        patient.post("CollegaPaziente", this.state.patient)
                            .then((response) => {
                                if (response.data.dati) {
                                    // window.location.href = "/Dashboard";
                                    this.setState({ isSuccessSendOtp: true });

                                } else {
                                    this.validator.showMessages();
                                    NotificationManager.error(response.data.descrizioneEsito, entitiesLabels.ERROR, 3000);
                                    this.forceUpdate();
                                }
                            }).catch((error) => {
                                this.setState({ warning: true });
                            });

                    } else {
                        this.validator.showMessages();
                        NotificationManager.error(response.data.descrizioneEsito, entitiesLabels.ERROR, 3000);
                        this.forceUpdate();
                    }
                }).catch((error) => {
                    this.setState({ warning: true });
                });
        }
        else {
            this.validator.showMessages();
            NotificationManager.warning(message.ErrorRequire, entitiesLabels.WARNING, 3000);
            this.forceUpdate();
        }
    }
    sendOtp = () => {
        if (this.validator.allValid()) {
            var code = parseInt(this.state.patient.patientCode);
            patientcode.get("InvioOTP/", code)
                .then((response) => {
                    if (response.data.statoEsito===0) {
                        // window.location.href = "/Dashboard";
                        NotificationManager.success(response.data.descrizioneEsito, entitiesLabels.ERROR, 3000);
                        this.setState({ isSuccessSendOtp: true,  phone: response.data.dati});

                    } else {
                        this.validator.showMessages();
                        this.setState({ isSuccessSendOtp: true });
                        NotificationManager.error(response.data.descrizioneEsito, entitiesLabels.ERROR, 3000);
                        this.forceUpdate();
                    }
                }).catch((error) => {
                    this.setState({ warning: true });
                });
        }
        else {
            this.validator.showMessages();
            NotificationManager.warning(message.ErrorRequire, entitiesLabels.WARNING, 3000);
            this.forceUpdate();
        }
    }
    render() {
        const validations = {
            patientCode: this.validator.message(
                'patientCode',
                this.state.patient.patientCode,
                'required|number'
            ),

        };
        const validationsOTP = {
            otp: this.validatorOTP.message(
                'opt',
                this.state.otp,
                'required'
            ),
        };
        return (<>
            <Container className="">
                <Row className='col-12 pt-4' >
                    <div className='col-12'>
                        <h2>Associa assistito già esistente</h2>
                    </div>
                </Row>
                <Row className='col-6 pt-4' >
                    <Form.Group className="mb-3">
                        <Form.Label>Codice assistito</Form.Label>
                        <Form.Control id="patientCode" onChange={this.handleChange} isInvalid={validations.patientCode != null} alt="patient" name="patientCode" placeholder="Inserisci fornito dall'assistito" />
                    </Form.Group>
                </Row>
                <Row className='col-4 pt-4' >
                    <Button onClick={() => this.sendOtp()}>Associa assistito </Button>
                </Row>
                < NotificationContainer />
            </Container>

            <Modal
                show={this.state.isSuccess}
                onHide={() => this.handleClose()}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{'Associazione avvenuta'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {'Complimenti il paziente è stato correttamente associato'}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => this.handleClose()}>
                        Chiudi
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={this.state.isSuccessSendOtp}
                onHide={() => this.handleCloseOtp()}
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
                            <Form.Control name="otp" alt="patiendDto" id="otpCode" placeholder="Inserisci codice otp inviato al paziente" isInvalid={validationsOTP.otp != null} onChange={this.handleChangeOtp} />
                        </Form.Group>
                    </Row>
                </Modal.Body>
                <Modal.Footer>

                    <Button variant="secondary" onClick={() => this.handleClose()}>
                        Chiudi
                    </Button>
                    <Button variant="primary" onClick={() => this.associate()}>
                        Salva
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
        )
    }
}

export default AssociatePatient
