import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import { api, user } from '../helpers/api/api';
import { Link } from "react-router-dom";
import SimpleReactValidator from 'simple-react-validator';
import { entitiesLabels, message, role } from '../helpers/Constants';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import moment from 'moment';
export class Recovery extends Component {
    //STATO
    userModelProp = () => ({

    });
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            isSending: false,

        }
        this.validator = new SimpleReactValidator();
    }

    //FUNZIONI 
    componentDidMount() {
        document.body.className = "splash custom-login";
    }
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
            this.setState((prevState) => ({ isSending: true }))
            user.post("RequestNewPassword", this.state.email)
                .then((response) => {
                    if (response.data.statoEsito === 0) {
                        NotificationManager.success( message.ErroSendRevocery, entitiesLabels.SUCCESS, 5000);
                        this.setState((prevState) => ({ isSending: false }))
                        // window.location.href = "/Login";
                    } else {
                        NotificationManager.error(response.data.descrizioneEsito, entitiesLabels.ERROR, 3000);
                        this.setState((prevState) => ({ isSending: false }))
                    }
                }).catch((error) => {
                    this.setState((prevState) => ({ isSending: false }))
                    NotificationManager.error(message.ErrorServer, entitiesLabels.ERROR, 3000);
                });
        } else {
            this.validator.showMessages();
            this.setState((prevState) => ({ isSending: false }))
            NotificationManager.warning(message.ErrorRequire, entitiesLabels.WARNING, 3000);
            this.forceUpdate();
        }
    };
    returnLogin = () => {

        window.location.href = "/Login";
    };
    //VIEW 
    render() {

        const validations = {
            email: this.validator.message(
                'Email',
                this.state.email,
                'required|email'
            ),
        };
        return (
            <>

                <form action="" class="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-12 mb-3">
                            <Form.Control isInvalid={validations.email != null} onChange={this.handleChange} name="email" placeholder="Inserisci  indirizzo e-mail" />
                        </div>
                    </div>
                    <div class="row justify-content-center">
                        <div className="col-6 col-md-6 mb-3 d-flex justify-content-center justify-content">
                            <Button className="btn btn-secondary btn-arrow" onClick={() => this.returnLogin()}>
                                Indietro
                            </Button>
                        </div>
                        <div className="col-6 col-md-6 mb-3 d-flex justify-content-center justify-content ">
                            <Button className='btn btn-primary btn-arrow' onClick={() => this.postLogin()} >{this.state.isSending == true ? <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            /> : ''}
                                Invia
                            </Button>
                        </div>
                    </div>
                    < NotificationContainer />
                </form>

            </>
        )
    }
}

export default Recovery
