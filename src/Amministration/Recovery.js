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
                    if (response.statoEsito = 0 ) {
                        NotificationManager.success(message.MEDICO + message.ErroSendRevocery, entitiesLabels.SUCCESS, 5000);
                        this.setState((prevState) => ({ isSending: false }))
                        // window.location.href = "/Login";
                    }else{
                         this.setState((prevState) => ({ isSending: false }))
                    NotificationManager.error(message.ErrorNotFound, entitiesLabels.ERROR, 3000);
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

            <html lang="en" >

                <body className="splash custom-login">
                    <div className="wrapper">
                        <form action="" class="container">
                            <div className="row justify-content-center">
                                <div className="col-12 col-md-6 mb-3">
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
                        </form>
                    </div>
                    <script src="./script/jquery.slim.min.js"></script>
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
                    <script src="./script/swiper.bundle.min.js"></script>
                    < NotificationContainer />

                </body>
            </html>
        )
    }
}

export default Recovery
