import React, { Component } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { entitiesLabels } from '../helpers/Constants';
import { api } from '../helpers/api/api';
import '../css/style.css';
import { Link } from "react-router-dom";
import SimpleReactValidator from 'simple-react-validator';
export class DoctorProfile extends Component {
    userModelProp = () => ({
        fiscalCode: '',
        lastname: '',
        firstname: '',
        mendicalCenter: '',
        email: '',
        telephone: '',
        password: '',
        confirmpassword: '',

    });

    constructor(props) {
        super(props);

        this.validator = new SimpleReactValidator();
        this.state = {
            userDto: {
                ...this.userModelProp(),
            }
        }

    }
    //FUNZIONI

    InsertUser = () => {
        if (this.validator.allValid()) {
            api.post("/InsertUser", this.state.userDto)
                .then(async (response) => {
                    if (response.status == 200) {
                        console.log('ok')
                    }
                }).catch((error) => {

                })
                .finally(() => {
                });
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }

    }
    handleChange = (el) => {
        const inputName = el.target.name;

        const inputValue = el.target.value;

        this.updateState(inputName, inputValue, 'userDto');
    };

    updateState = (inputName, inputValue, objName) => {
        const statusCopy = { ...this.state };
        statusCopy[objName][inputName] = inputValue;

        this.setState(statusCopy);
    };


    render() {
        const validations = {
            email: this.validator.message(
                'Email',
                this.state.userDto.email,
                'required'
            ),
            telephone: this.validator.message(
                'Telefone',
                this.state.userDto.telephone,
                'required'
            ),
            password: this.validator.message(
                'Password',
                this.state.userDto.password,
                'required'
            ),
            confirmpassword: this.validator.message(
                'Confirm Password',
                this.state.userDto.confirmpassword,
                'required'
            ),
        };
        return (
            <Container className=" text-center">
                <h1 className="text-color-title mt-2 p-2"> Profile</h1>
                <Container className=" form box-color text-center ms-container">

                    <Form className="centering-form">
                        <Row>
                            <Form.Group className="col-4 mb-3" controlId="formBasicEmail">
                                <Form.Label className="text-light">Cognome</Form.Label>
                                <Form.Control disabled name="lastname" placeholder="Enter cognome" />
                            </Form.Group>
                            <Form.Group className="col-4 mb-3" controlId="formBasicEmail">
                                <Form.Label className="text-light">Nome</Form.Label>
                                <Form.Control disabled name="firstname" placeholder="Enter Nome" />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group className="col-4 mb-3" controlId="formBasicEmail">
                                <Form.Label className="text-light">Codice Fiscale</Form.Label>
                                <Form.Control disabled name="fiscalCode" placeholder="Enter Codice fiscale" />
                            </Form.Group>
                            <Form.Group className="col-4 mb-3" controlId="formBasicEmail">
                                <Form.Label className="text-light">Centro Medico</Form.Label>
                                <Form.Control disabled name="mendicalCenter" placeholder="Enter centro medico" />
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group className="col-4 mb-3" controlId="formBasicEmail">
                                <Form.Label className="text-light">Email</Form.Label>
                                <Form.Control disabled id='email' name="email" isInvalid={validations.email != null} placeholder="Enter email" />
                            </Form.Group>
                            <Form.Group className="col-4 mb-3" controlId="formBasicEmail">
                                <Form.Label className="text-light">Telefono</Form.Label>
                                <Form.Control disabled name="telephone" isInvalid={validations.telephone != null} placeholder="Enter telefono" />
                            </Form.Group>
                        </Row>
                    </Form>
                </Container>
            </Container>
        )
    }
}

export default DoctorProfile
