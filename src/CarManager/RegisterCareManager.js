import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, InputGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { api, medico, user } from '../helpers/api/api';
import { Link } from "react-router-dom";
import SimpleReactValidator from 'simple-react-validator';
import { entitiesLabels, message } from '../helpers/Constants';
import 'react-notifications/lib/notifications.css';
import { Eye } from 'react-bootstrap-icons';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { findAllByTestId } from '@testing-library/react';
import { InfoCircle } from 'react-bootstrap-icons';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import 'react-phone-input-2/lib/style.css'

export class RegisterCareManager extends Component {
    userModelProp = () => ({
        id: 0,
        username: '',
        password: '',
        idRole: 1,

    });
    medicoModelProp = () => ({
        name: '',
        surName: '',
        email: '',
        idUser: 0,
        phoneNumber: ''
    });
    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator();
        this.state = {
            notification: '',
            notificationHeaderMessage: '',
            notificationMessage: '',
            show: undefined,
            confirmpassword: '',
            listCentriMedici: [],

            //TODO DA ELIMINARE 
            mendicalCenter: 1,
            userDto: {
                ...this.userModelProp(),
            },
            careManagerDTO: {
                ...this.medicoModelProp()
            }

        }
        this.getListMedicalCenter = this.getListMedicalCenter.bind(this);
    }

    componentDidMount() {
        this.getListMedicalCenter();
        this.reset();
        document.body.className = "splash custom-login";
    }

    reset = () => {
        window.localStorage.clear();
    };

    getListMedicalCenter = () => {
        medico.getAll("GetCentriMedici")
            .then(async (response) => {
                if (response.status == 200) {
                    this.setState({ listCentriMedici: response.data.dati });
                }
            }).catch((error) => {

            })
            .finally(() => {
            });

    }

    InsertUser = () => {
        if (this.validator.allValid()) {
            let userDto = this.state.userDto;
            let careManagerDTO = this.state.careManagerDTO;
            
            user.post("SaveCareManager", { username: userDto.username, password: userDto.password, careManagerDTO: this.state.careManagerDTO })
                .then((response) => {
                    if (response.data.statoEsito === 0) {
                       
                        NotificationManager.success(message.CAREMANAGER + message.SuccessInsert, entitiesLabels.SUCCESS, 3000);
                        window.location.href = "/Login";
                    } else {
                        NotificationManager.error(response.data.descrizioneEsito, entitiesLabels.ERROR, 3000);
                    }
                }).catch((error) => {
                    NotificationManager.error(message.ErrorServer, entitiesLabels.ERROR, 3000);
                });
        }
        else {
            this.validator.showMessages();
            NotificationManager.warning(message.ErrorRequire, entitiesLabels.WARNING, 3000);
            this.forceUpdate();
        }
    }

    onChange = (inputName) => {
        const selected = inputName.target;
        const id = selected.children[selected.selectedIndex].id;
        const statusCopy = { ...this.state };
        statusCopy['careManagerDTO']['idCentroMedico'] = parseInt(id);
        this.setState(statusCopy);
    };

    handleChangeconfirm = (el) => {
        const inputName = el.target.name;
        const inputValue = el.target.value;
        this.updateStateconfirm(inputName, inputValue);
    };

    updateStateconfirm = (inputName, inputValue) => {
        const statusCopy = { ...this.state };
        statusCopy[inputName] = inputValue;

        this.setState(statusCopy);
    };

    handleChange = (el) => {
        let objName = el.target.alt;
        const inputName = el.target.name;
        const inputValue = el.target.value;
        this.updateState(inputName, inputValue, objName);
    };
    handleChangePhone = (el) => {
        const inputValue = el;
        this.updateState('phoneNumber', inputValue, 'careManagerDTO');
    };
    updateState = (inputName, inputValue, objName) => {
        const statusCopy = { ...this.state };
        statusCopy[objName][inputName] = inputValue;

        this.setState(statusCopy);
    };

    showPassword = () => {
        var x = document.getElementById("password");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
        var x = document.getElementById("confirmpassword");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }

    returnSplash = () => {
        window.location.href = "/";
    };

    render() {

        if (this.state.userDto.password === this.state.confirmpassword) {
            var equalPass = true
        } else {
            var equalPass = false;
        }

        const validations = {
            name: this.validator.message(
                'name',
                this.state.careManagerDTO.name,
                'required'
            ),
            surName: this.validator.message(
                'surName',
                this.state.careManagerDTO.surName,
                'required'
            ),
            username: this.validator.message(
                'Email',
                this.state.userDto.username,
                'required|email'
            ),
            phoneNumber: this.validator.message(
                'Email',
                this.state.careManagerDTO.phoneNumber,
                'required|phone'
            ),
            password: this.validator.message(
                'Password',
                this.state.userDto.password,
                'required'
            ),
            confirmpassword: this.validator.message(
                'Confirm Password',
                this.state.confirmpassword,
                'required'
            ),
            equalPass: this.validator.message('equalPass', equalPass, 'accepted'),
        };

        function keyDown(e) { 
            var e = window.event || e;
            var key = e.keyCode;
            //space pressed
             if (key == 32) { //space
              e.preventDefault();
             }                  
          }

        return (
            <>
                <Form className="centering-form">
                    <Row>
                        <Form.Group className="col-6 mb-2" >
                            <Form.Control onChange={this.handleChange} name="name" isInvalid={validations.name != null} alt="careManagerDTO" placeholder="Nome" />
                        </Form.Group>
                        <Form.Group className="col-6 mb-2" >
                            <Form.Control onChange={this.handleChange} name="surName" alt="careManagerDTO" isInvalid={validations.surName != null} placeholder="Cognome" />
                        </Form.Group>
                    </Row>
                    <Row>
                        <InputGroup className="col-6 mb-2 input-custom-regCa ">
                            <Form.Control onChange={this.handleChange} id='eMail' alt="userDto" name="username" isInvalid={validations.username != null} placeholder="E-mail" />
                        </InputGroup >
                        <InputGroup   className={validations.phoneNumber != null && (this.state.careManagerDTO?.phoneNumber === ""  || this.state.careManagerDTO?.phoneNumber === undefined || (this.state.careManagerDTO?.phoneNumber.length <= 10  )) ?"error-validation-custom col-6 mb-2 input-custom-regCa ": "col-6 mb-2 input-custom-regCa "}>
                            <PhoneInput
                                defaultCountry="IT"
                                placeholder="Enter phone number"
                                onChange={this.handleChangePhone}
                                />
                        </InputGroup >
                    </Row>
                    <Row className='pb-5'>
                        <Form.Group className="col-5 mb-2" controlId="formBasicPassword">
                            <Form.Control type='password' id='password' alt="userDto" onChange={this.handleChange} name="password" isInvalid={validations.password != null} placeholder="Password" />
                        </Form.Group>
                        <div className='col-1 mb-2'>
                            <OverlayTrigger
                                delay={{ hide: 450, show: 300 }}
                                overlay={(props) => (
                                    <Tooltip {...props}>
                                        La password deve contenere un minimo di 8 caratteri di cui uno numerico, sia maiuscole che minuscole ed almeno un carattere speciale.
                                    </Tooltip>
                                )}
                                placement="bottom"
                            ><InfoCircle size='20' style={{ 'marginTop': "8px" }} />
                            </OverlayTrigger>
                        </div>
                        <Form.Group className="col-6 mb-2" controlId="formBasicPassword">
                            <Form.Control type='password' id='confirmpassword' alt="confirmpassword" onChange={this.handleChangeconfirm} name="confirmpassword" isInvalid={validations.confirmpassword != null || validations.equalPass != null} placeholder="Password" />
                        </Form.Group>
                        {validations.equalPass ? (
                            <div className=" input-layout-wrapper text-danger">
                                {' '}
                                Le password devono coincidere{' '}
                            </div>
                        ) : <div className=" input-layout-wrapper text-danger is-12">
                            {' '}{' '}
                        </div>}
                    </Row>
                    <Row>
                        <div class="col-6 col-md-8 mb-0">
                            <div class="form-check mb-0">
                                <Eye size='22' onClick={() => this.showPassword()} className='icon-black' style={{ 'marginRight': "5px" }} />
                                <label class="form-check-label small" for="flexCheckDefault">
                                    Mostra password
                                </label>
                            </div>
                        </div>
                        <div class="col-6 col-md-4 mb-3 d-flex justify-content-center justify-content-md-end align-items-start">
                            <Button className="btn btn-secondary btn-arrow me-3" onClick={() => this.returnSplash()}>
                                Indietro
                            </Button>
                            <Button className="btn btn-primary btn-arrow" onClick={() => this.InsertUser()}>
                                Registrati
                            </Button>
                        </div>
                    </Row>
                </Form>

                < NotificationContainer />
            </>
        )
    }
}

export default RegisterCareManager
