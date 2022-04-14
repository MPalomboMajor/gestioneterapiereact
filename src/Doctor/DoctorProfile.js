import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, Modal, Spinner } from 'react-bootstrap';
import { Eye } from 'react-bootstrap-icons';
import { user, medico } from '../helpers/api/api';
import '../css/style.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { NotificationContainer as ContainerModal, NotificationManager as ManagerModal } from 'react-notifications';
import { entitiesLabels, message } from '../helpers/Constants';
import SimpleReactValidator from 'simple-react-validator';
export class DoctorProfile extends Component {
    userModelProp = () => ({
        email: '',
        fiscalCode: '',
        id: '',
        idCentroMedico: 0,
        idUSer: 0,
        isAbilitatoCarta: false,
        name: '',
        phoneNumber: '',
        surName: '',

    });

    constructor(props) {
        super(props);

        this.validator = new SimpleReactValidator();
        this.state = {
            isOpenChangePassword: false,
            email: '',
            isSending: false,
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
        let dto = localStorage.getItem("role");
        dto = JSON.parse(dto);
        medico.get("Get/", dto.id)
            .then(async (response) => {
                if (response.status == 200) {
                    this.setState({ userDto: response.data.dati });
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
    sedRestCode = () => {
        this.setState((prevState) => ({ isSending: true }))
        user.post("RequestNewPassword", this.state.userDto.email)
            .then((response) => {
                if (response.status === 200) {
                    ManagerModal.success(message.CODICE + message.SuccessSend, entitiesLabels.SUCCESS, 3000);
                    this.setState({ isSending: false });
                } else {
                    ManagerModal.error(message.CODICE + message.ErroSend, entitiesLabels.ERROR, 3000);
                    this.setState({ isSending: false });
                }
            }).catch((error) => {
                ManagerModal.error(message.CODICE + message.ErroSend, entitiesLabels.ERROR, 3000);
                this.setState({ isSending: false });
            });
    }
    updateProfileDoctor = () => {
        medico.post("Edit", this.state.userDto)
            .then((response) => {
                if (response.status === 200) {
                    ManagerModal.success(message.MEDICO + message.SuccessInsert, entitiesLabels.SUCCESS, 3000);
                }
            }).catch((error) => {
                ManagerModal.error(message.ErrorServer, entitiesLabels.ERROR, 3000);
            });
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
    showPassword = () => {
        var x = document.getElementById("newPassword");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }

    showConfirmPassword = () => {
        var x = document.getElementById("confirmnewPassword");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }

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
        return (<>
            <Container className='col-12 pt-4 row'>
                <Form className='col-12 pt-4 row'>
                    <Row className="col-12 mb-3" >
                        <Form.Group className="col-6 mb-3" controlId="formBasicEmail">
                            <Form.Label className="">Cognome</Form.Label>
                            <Form.Control name="lastname" value={this.state.userDto.surName} placeholder="Enter cognome" />
                        </Form.Group>
                        <Form.Group className="col-6 mb-3" controlId="formBasicEmail">
                            <Form.Label className="">Nome</Form.Label>
                            <Form.Control name="firstname" value={this.state.userDto.name} placeholder="Enter Nome" />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group className="col-6 mb-3" controlId="formBasicEmail">
                            <Form.Label className="">Codice Fiscale</Form.Label>
                            <Form.Control name="fiscalCode" value={this.state.userDto.fiscalCode} placeholder="Enter Codice fiscale" />
                        </Form.Group>
                        <Form.Group className="col-6 mb-3" controlId="formBasicEmail">
                            <Form.Label className="">Centro Medico</Form.Label>
                            <Form.Control name="mendicalCenter" value={this.state.userDto.idCentroMedico} placeholder="Enter centro medico" />
                        </Form.Group>
                    </Row>

                    <Row>
                        <Form.Group className="col-6 mb-3" controlId="formBasicEmail">
                            <Form.Label className="">Email</Form.Label>
                            <Form.Control disabled id='email' name="email" value={this.state.userDto.email} isInvalid={validations.email != null} placeholder="Enter email" />
                        </Form.Group>
                        <Form.Group className="col-6 mb-3" controlId="formBasicEmail">
                            <Form.Label className="">Telefono</Form.Label>
                            <Form.Control name="telephone" isInvalid={validations.telephone != null} value={this.state.userDto.phoneNumber} placeholder="Enter telefono" />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group className="col-4 mb-3" controlId="formBasicPassword">
                            <Button variant="btn btn-primary " onClick={() => this.handleShowChangePassword()}>
                                Modifica Password
                            </Button>
                        </Form.Group>
                        <Form.Group className="col-4 mb-3" controlId="formBasicPassword">
                            <Button variant="btn btn-primary " onClick={() => this.updateProfileDoctor()}>
                                Modifica Profilo
                            </Button>
                        </Form.Group>
                    </Row>

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
                                <Form.Label className="text">Username</Form.Label>
                                <Form.Control value={this.state.userDto.email} disabled name="farmaco" placeholder="Inserisci farmaco" />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group className="col-6 mb-3" controlId="formBasicEmail">
                                <Form.Label className="text">Nuova Password</Form.Label><Eye size='22' onClick={() => this.showPassword()} className='icon-black' />
                                <Form.Control id="newPassword" name="newPassword" type='password' placeholder="Inserisci Dosagio" />
                            </Form.Group>
                            <Form.Group className="col-6 mb-3" controlId="formBasicEmail">
                                <Form.Label className="text" >Conferma Password</Form.Label><Eye size='22' onClick={() => this.showConfirmPassword()} className='icon-black' />
                                <Form.Control id="confirmnewPassword" name="confirmnewPassword"  type='password' placeholder="Inserisci quantita" />
                            </Form.Group>
                            
                            {validations.equalPass ? (
                                <div   className=" input-layout-wrapper text-danger">
                                    {' '}
                                    Le password devono coincidere{' '}
                                </div>
                            ) : <div   className=" input-layout-wrapper text-danger is-12">
                            {' '}{' '}
                        </div>}
                        </Row>
                        <Row>
                            <Form.Group className="col-12 mb-3" controlId="formBasicEmail">
                                <Form.Label className="text">Codice Reset</Form.Label>
                                <Form.Control name="farmaco" placeholder="Inserisci farmaco" />
                            </Form.Group>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.handleCloseChangePassword()}>
                            Chiudi
                        </Button>
                        <Button variant="secondary" onClick={() => this.sedRestCode()} > {this.state.isSending == true ? <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        /> : ''}Richiedi codice</Button>
                        <Button variant="primary">Cambia Password</Button>
                    </Modal.Footer>
                    <ContainerModal />
                </Modal>
            </Container>
            < NotificationContainer />
        </>
        )
    }
}

export default DoctorProfile
