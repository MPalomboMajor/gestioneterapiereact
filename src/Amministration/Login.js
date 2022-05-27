import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import { api, user } from '../helpers/api/api';
import { Link } from "react-router-dom";
import SimpleReactValidator from 'simple-react-validator';
import { entitiesLabels, message, role } from '../helpers/Constants';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import moment from 'moment';
import { Eye } from 'react-bootstrap-icons';

export class Login extends Component {
    //STATO
    userModelProp = () => ({

    });

    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator();
        this.validatorOTP = new SimpleReactValidator();
        this.state = {
            username: '',
            password: '',
            idDispositivo: '',
            dataOraRichiesta: moment(new Date()).format("DD/MM/YYYY HH:mm"),
            otp: '',
            isSuccess: false,
            isSuccessSendOtp: false,
            phone: '',
        }
        this.validator = new SimpleReactValidator();
        this.reset = this.reset.bind(this);
    }

    componentDidMount() {
        this.reset();
        document.body.className = "splash custom-login";
    }

    //FUNZIONI 
    reset = () => {
        window.localStorage.clear();
    };
    handleChange = (el) => {
        const inputName = el.target.name;
        const inputValue = el.target.value;
        this.updateState(inputName, inputValue);
    };

    updateState = (inputName, inputValue) => {
        const statusCopy = { ...this.state };
        statusCopy[inputName] = inputValue;
        this.setState(statusCopy);
    };

    postLogin = () => {
        if (this.validator.allValid()) {
            user.post("Login", this.state)
                .then((response) => {
                    if (response.data.statoEsito === 0) {
                        if (response.data.dati.userDTO.idRole === role.DOCTOR || response.data.dati.userDTO.idRole === role.CAREMANAGER || response.data.dati.userDTO.idRole === role.ADMIN) {
                            localStorage.setItem('accessToken', response.data.dati.accessToken);
                            localStorage.setItem('refreshToken', response.data.dati.refreshToken);
                            localStorage.setItem('role', JSON.stringify(response.data.dati.userDTO));
                            this.setState({ phone: JSON.parse(localStorage.getItem("role")).phone });
                            user.post("RequestOTP/", response.data.dati.userDTO.phone)
                                .then((response) => {
                                    if (response.status === 200) {
                                        NotificationManager.success(response.data.descrizioneEsito, entitiesLabels.SUCCESS, 3000);
                                        this.setState({ isSuccessSendOtp: true });
                                    }
                                }).catch((error) => {
                                    NotificationManager.error(message.ErrorServer, entitiesLabels.ERROR, 3000);
                                });

                        } else {
                            NotificationManager.error(message.ErrorUnauthorized, entitiesLabels.ERROR, 3000);
                        }
                    } else {
                        NotificationManager.error(response.data.descrizioneEsito, entitiesLabels.ERROR, 3000);
                    }
                }).catch((error) => {
                    NotificationManager.error(message.ErrorLogin, entitiesLabels.ERROR, 3000);
                });
        } else {
            this.validator.showMessages();
            NotificationManager.warning(message.ErrorRequire, entitiesLabels.WARNING, 3000);
            this.forceUpdate();
        }
    };

    returnSplash = () => {
        window.location.href = "/";
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
        window.location.href = "/Login";
    };

    handleCloseOtp = (el) => {
        this.setState({ isSuccessSendOtp: false });
    };

    showPassword = () => {
        var x = document.getElementById("password");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }

    verifyOtp = () => {
        if (this.validatorOTP.allValid()) {
            user.post("VerifyLoginOTP/", { idDispositivo: '', phone: this.state.phone, otp: this.state.otp })
                .then((response) => {
                    if (response.data.statoEsito === 0 && response.data.descrizioneEsito !== "Codice OTP non valido") {
                        localStorage.setItem('accessToken', response.data.dati.accessToken);
                        localStorage.setItem('refreshToken', response.data.dati.refreshToken);
                        localStorage.setItem('role', JSON.stringify(response.data.dati.userDTO));
                        window.location.href = "/DoctorChartsInterface";

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

    //VIEW 
    render() {

        const validations = {
            username: this.validator.message(
                'Email',
                this.state.username,
                'required|email'
            ),
            password: this.validator.message(
                'Password',
                this.state.password,
                'required'
            ),
        };

        const validationsOTP = {
            otp: this.validatorOTP.message(
                'opt',
                this.state.otp,
                'required'
            ),
        };

        return (
            /* <Container className=" text-center">
                 <h1 className="text-color-title mt-2 p-2"> Login</h1>
                 <Row className="mt-4">
                     <Col lg={4} md={5} sm={12} className="form box-color p-5 m-auto" >
                         <Form>
                             <Form.Group className="mb-3" controlId="formBasicEmail">
                                 <Form.Label className="text-light">Username</Form.Label>
                                 <Form.Control isInvalid={validations.username != null} onChange={this.handleChange} type="username" name="username" placeholder="Username" />
                             </Form.Group>
                             <Form.Group className="mb-3" controlId="formBasicPassword">
                                 <Form.Label className="text-light">Password</Form.Label>
                                 <Form.Control isInvalid={validations.password != null} onChange={this.handleChange} name="password" type="password" placeholder="Password" />
                             </Form.Group>
 
                         </Form>
                         <Row>
                         <Col  className="form box-color p-5 m-auto col-6" >
                         <Button className=' ' variant="light " onClick={() => this.postLogin()} >
                                 Login
                             </Button>
                         </Col>
                         <Col  className="form box-color p-5 m-auto col-6" >
                         <Link className='btn  btn-light position-button' variant="light " to="/Register">Signin</Link>
                         </Col> 
                             
                         </Row>
                     </Col>
 
                     <h6 className="mt-4 p-3 text-center text-secondary">Copyright <i className="fa fa-copyright"></i> </h6>
                 </Row>
 
                 < NotificationContainer />
             </Container>*/
            <>

                <form action="" class="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-12 mb-3">
                            <Form.Control isInvalid={validations.username != null} onChange={this.handleChange} type="username" name="username" placeholder="E-mail" onKeyDown={event => { if (event.key === 'Enter') { this.postLogin() } }} />
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-12 mb-3 mb-md-3">
                            <Form.Control isInvalid={validations.password != null} onChange={this.handleChange} id="password" name="password" type="password" placeholder="Password" onKeyDown={event => { if (event.key === 'Enter') { this.postLogin() } }} />
                        </div>
                    </div>
                    <div class="col-12 col-md-12 mb-0 justify-content-center">
                        <div class="form-check mb-0">
                            <Eye size='22' onClick={() => this.showPassword()} className='icon-black' style={{ 'marginRight': "5px" }} />
                            <label class="form-check-label small" for="flexCheckDefault">
                                Mostra password
                            </label>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-12 mb-2">
                            <p className="text-center">
                                <a href="/Recovery" className="link-recovery small">Hai dimenticato la password?</a>
                            </p>
                        </div>
                    </div>
                    <div class="row justify-content-center">
                        <div className="col-12 col-md-6 mb-3 d-flex justify-content-center justify-content">
                            <Button className='btn btn-secondary btn-arrow' onClick={() => this.returnSplash()} >
                                Indietro
                            </Button>
                        </div>
                        <div className="col-12 col-md-6 mb-3 d-flex justify-content-center justify-content">
                            <Button className='btn btn-primary btn-arrow' onClick={() => this.postLogin()} >
                                Login
                            </Button>
                        </div>
                    </div>
                </form>




                <div className="modal fade" id="welcome" tabindex="-1" aria-labelledby="welcome" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-sm">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <p className="text-center">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni facere, facilis, ullam vero voluptatem labore.</p>
                            </div>
                            <div className="modal-footer"></div>
                        </div>
                    </div>

                </div>

                <Modal
                    show={this.state.isSuccessSendOtp}
                    onHide={() => this.handleCloseOtp()}
                    backdrop="static"
                    keyboard={false}
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{'Codice OTP inviato'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Form.Group className="col-12 mb-3" >
                                <Form.Label className="text-">Ti abbiamo inviato un <strong>codice di verifica</strong> al numero di cellulare indicato in fase di registrazione. Inseriscilo nel campo sottostante e premi Invia.</Form.Label>
                                {/* isInvalid={validationsOTP.otp != null} onChange={this.handleChangeOtp} */}
                                <Form.Control name="otp" alt="patiendDto" id="otpCode" placeholder="Inserisci il codice OTP" onChange={this.handleChangeOtp} isInvalid={validationsOTP.otp != null} onKeyDown={event => { if (event.key === 'Enter') { this.verifyOtp() } }} />
                            </Form.Group>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>

                        <Button variant="secondary" onClick={() => this.handleClose()}>
                            Chiudi
                        </Button>
                        <button class="btn btn-secondary mx-2" id="reinvia" onClick={() => this.postLogin()}>Invia di nuovo</button>
                        <Button variant="primary" onClick={() => this.verifyOtp()} >
                            Invia
                        </Button>
                    </Modal.Footer>
                </Modal>


                < NotificationContainer />
            </>
        )
    }
}

export default Login
