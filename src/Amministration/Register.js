import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, } from 'react-bootstrap';
import { api, medico, user } from '../helpers/api/api';
import { Link } from "react-router-dom";
import SimpleReactValidator from 'simple-react-validator';
import { entitiesLabels, message } from '../helpers/Constants';
import 'react-notifications/lib/notifications.css';
import { Eye } from 'react-bootstrap-icons';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { findAllByTestId } from '@testing-library/react';
export class Register extends Component {
    userModelProp = () => ({
        id: 0,
        username: '',
        password: '',
        idRole: 1,

    });
    medicoModelProp = () => ({
        name: '',
        surName: '',
        fiscalCode: '',
        email: '',
        idCentroMedico: 0,
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
            medicoDTO: {
                ...this.medicoModelProp()
            }

        }
        this.getListMedicalCenter = this.getListMedicalCenter.bind(this);
    }
    componentDidMount() {
        this.getListMedicalCenter();
    }
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
            user.post("SaveDoctor", { username: userDto.username, password: userDto.password, doctorDTO: this.state.medicoDTO })
                .then((response) => {
                    if (response.status === 200) {
                        NotificationManager.success(message.MEDICO + message.SuccessInsert, entitiesLabels.SUCCESS, 3000);
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
        statusCopy['medicoDTO']['idCentroMedico'] = parseInt(id);
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

    render() {

        if (this.state.userDto.password === this.state.confirmpassword) {
            var equalPass = true
        } else {
            var equalPass = false;
        }

        const validations = {
            username: this.validator.message(
                'Email',
                this.state.userDto.username,
                'required|email'
            ),
            phoneNumber: this.validator.message(
                'Email',
                this.state.medicoDTO.phoneNumber,
                'required'
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
        return (
            <div class="splash">
                <div class="wrapper">
                    <Form className="centering-form">
                        <Row>
                            <Form.Group className="col-6 mb-2" >
                                <Form.Control onChange={this.handleChange} name="name" alt="medicoDTO" placeholder="Nome" />
                            </Form.Group>
                            <Form.Group className="col-6 mb-2" >
                                <Form.Control onChange={this.handleChange} name="surName" alt="medicoDTO" placeholder="Cognome" />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group className="col-6 mb-2" >
                                <Form.Control onChange={this.handleChange} name="fiscalCode" alt="medicoDTO" placeholder="Codice fiscale" />
                            </Form.Group>
                            <Form.Group className="col-6 mb-2" >
                                <Form.Select onChange={this.onChange} name="mendicalCenter" alt="medicoDTO" placeholder="Centro medico" >
                                    <option id="0">Seleziona Centro </option>
                                    {this.state.listCentriMedici.map((item) =>
                                        <option id={item.id}>{item.nomeCentro}</option>
                                    )}
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group className="col-6 mb-2">
                                <Form.Control onChange={this.handleChange} id='eMail' alt="userDto" name="username" isInvalid={validations.username != null} placeholder="E-mail" />
                            </Form.Group>
                            <Form.Group className="col-6 mb-2">
                                <Form.Control onChange={this.handleChange} id='phoneNumber' alt="medicoDTO" name="phoneNumber" isInvalid={validations.phoneNumber != null} placeholder="Mobile" />
                            </Form.Group>
                        </Row>
                        <Row className='pb-5'>
                            <Form.Group className="col-6 mb-2" controlId="formBasicPassword">
                                <Form.Control type='password' id='password' alt="userDto" onChange={this.handleChange} name="password" isInvalid={validations.password != null} placeholder="Password" />
                            </Form.Group>
                            <Form.Group className="col-6 mb-2" controlId="formBasicPassword">
                                <Form.Control type='password' id='confirmpassword' alt="confirmpassword" onChange={this.handleChangeconfirm} name="confirmpassword" isInvalid={validations.confirmpassword != null || validations.equalPass != null} placeholder="Ripeti password" />
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
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" onClick={() => this.showPassword()}></input>
                                    <label class="form-check-label small" for="flexCheckDefault">
                                        Mostra password
                                    </label>
                            </div>
                        </div>
                        <div class="col-6 col-md-4 mb-3 d-flex justify-content-center justify-content-md-end align-items-start">
                            <Button className="btn btn-primary btn-arrow" onClick={() => this.InsertUser()}>
                                Registrati
                            </Button>
                        </div>
                        </Row>
                       <div class="col-12">
                       <div class="col-6 col-md-8 mb-0">
                            <div class="form-check mb-0">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"></input>
                                    <label class="form-check-label small" for="flexCheckDefault">
                                        Consenso al trattamento dei dati personali
                                    </label>
                            </div>
                            <p>
                                <a href="" class="link-privacy small ps-4">Visualizza informativa privacy</a>
                            </p>
                        </div>
                            <p class="small ps-md-4 mb-0 text-center text-md-start"><strong>Non riesci a registrarti?</strong></p>
                            <p class="mb-0 text-center text-md-start">
                                <a href="tel:" class="link-phone small ps-4">XXX XXXXXXXX</a>
                                <a href="mailto:" class="link-email small ps-4">xxxxxxx@yyyyyyy.it</a>
                            </p>
                        </div>
                    </Form>
                </div>
                < NotificationContainer />
            </div>
        )
    }
}

export default Register
