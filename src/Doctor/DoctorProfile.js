import React, { Component } from 'react';
import { Container, Row, Col, Form, Button , Modal} from 'react-bootstrap';
import { entitiesLabels } from '../helpers/Constants';
import { api , medico} from '../helpers/api/api';
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
            isOpenChangePassword: false,
            email:'',
            userDto: {
                ...this.userModelProp(),
            }
        }
        this.getProfile = this.getProfile.bind(this);
    }
    componentDidMount() {
        this.getProfile();
    }

    //FUNZIONI
    getProfile = () => {
        let dto= localStorage.getItem("role") ;
        dto= JSON.parse(dto);
            medico.get("Get/", dto.id)
                .then(async (response) => {
                    if (response.status == 200) {
                        this.setState({ email: response.data.dati.username });
                    }
                }).catch((error) => {

                })
                .finally(() => {
                });

    }

    handleCloseChangePassword = () => {
        this.setState({ isOpenChangePassword: false });
    }
    handleShowChangePassword = () => {
        this.setState({ isOpenChangePassword: true });
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
            <Container className='col-12 pt-4 row'>
                <Form className='col-12 pt-4 row'>
                        <Row className="col-12 mb-3" >
                            <Form.Group className="col-6 mb-3" controlId="formBasicEmail">
                                <Form.Label className="">Cognome</Form.Label>
                                <Form.Control disabled name="lastname" placeholder="Enter cognome" />
                            </Form.Group>
                            <Form.Group className="col-6 mb-3" controlId="formBasicEmail">
                                <Form.Label className="">Nome</Form.Label>
                                <Form.Control disabled name="firstname" placeholder="Enter Nome" />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group className="col-6 mb-3" controlId="formBasicEmail">
                                <Form.Label className="">Codice Fiscale</Form.Label>
                                <Form.Control disabled name="fiscalCode" placeholder="Enter Codice fiscale" />
                            </Form.Group>
                            <Form.Group className="col-6 mb-3" controlId="formBasicEmail">
                                <Form.Label className="">Centro Medico</Form.Label>
                                <Form.Control disabled name="mendicalCenter" placeholder="Enter centro medico" />
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group className="col-6 mb-3" controlId="formBasicEmail">
                                <Form.Label className="">Email</Form.Label>
                                <Form.Control disabled id='email' name="email" value={this.state.email}  isInvalid={validations.email != null} placeholder="Enter email" />
                            </Form.Group>
                            <Form.Group className="col-6 mb-3" controlId="formBasicEmail">
                                <Form.Label className="">Telefono</Form.Label>
                                <Form.Control disabled name="telephone" isInvalid={validations.telephone != null} placeholder="Enter telefono" />
                            </Form.Group>
                        </Row>
                        <Row>
                                <Form.Group className="col-4 mb-3" controlId="formBasicPassword">
                                    <Button variant="btn btn-info " onClick={() => this.handleShowChangePassword()}>
                                        Modifica Password
                                    </Button>
                                </Form.Group></Row>
                    </Form>
                    <Modal
                                show={this.state.isOpenChangePassword}
                                onHide={() => this.handleCloseChangePassword()}
                                backdrop="static"
                                keyboard={false}
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title>Modifica Password</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Row>
                                        <Form.Group className="col-12 mb-3" controlId="formBasicEmail">
                                            <Form.Label className="text-">Username</Form.Label>
                                            <Form.Control  name="farmaco" placeholder="Inserisci farmaco" />
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group className="col-6 mb-3" controlId="formBasicEmail">
                                            <Form.Label className="text-">Nuova Password</Form.Label>
                                            <Form.Control  name="dosagio" placeholder="Inserisci Dosagio" />
                                        </Form.Group>
                                        <Form.Group className="col-6 mb-3" controlId="formBasicEmail">
                                            <Form.Label className="text-">Conferma Password</Form.Label>
                                            <Form.Control  name="quantita" placeholder="Inserisci quantita" />
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group className="col-12 mb-3" controlId="formBasicEmail">
                                            <Form.Label className="text-">Codice Reset</Form.Label>
                                            <Form.Control  name="farmaco" placeholder="Inserisci farmaco" />
                                        </Form.Group>
                                    </Row>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={() => this.handleCloseOtherPharmacy()}>
                                        Chiudi
                                    </Button>
                                    <Button variant="secondary">Richiedi codice</Button>
                                    <Button variant="primary">Cambia Password</Button>
                                </Modal.Footer>
                            </Modal>
                    </Container>
        )
    }
}

export default DoctorProfile
