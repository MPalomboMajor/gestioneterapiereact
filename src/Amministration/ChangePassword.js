import React, { Component } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { api, user } from '../helpers/api/api';
import { Link } from "react-router-dom";
import SimpleReactValidator from 'simple-react-validator';
import { entitiesLabels, message, role } from '../helpers/Constants';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import moment from 'moment';
export class ChangePassword extends Component {
    //STATO
    userModelProp = () => ({

    });
    constructor(props) {
        super(props);
        this.state = {
            sendpassword: '',
            newpassword: '',
            repetpassword: '',
            
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
           
        } else {
            this.validator.showMessages();
            NotificationManager.warning(message.ErrorRequire, entitiesLabels.WARNING, 3000);
            this.forceUpdate();
        }
    };

    //VIEW 
    render() {

        const validations = {
            sendpassword: this.validator.message(
                'Email',
                this.state.username,
                'required|email'
            ),
            newpassword: this.validator.message(
                'Password',
                this.state.password,
                'required'
            ),
            repetpassword: this.validator.message(
                'Password',
                this.state.password,
                'required'
            ),
        };
        return (
           
            <html lang="en" >

                <body className="splash custom-login">
                    <div className="wrapper">
                        <form action="" class="container">
                            <div className="row justify-content-center">
                                <div className="col-12 col-md-6 mb-3">
                                    <Form.Control isInvalid={validations.sendpassword != null} onChange={this.handleChange} type="sendPassword" name="sendPassword" placeholder="Password ricevuta" />
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-12 col-md-6 mb-3 mb-md-3">
                                    <Form.Control isInvalid={validations.password != null} onChange={this.handleChange} name="newpassword" type="password" placeholder="Nuova password" />
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-12 col-md-6 mb-3 mb-md-3">
                                    <Form.Control isInvalid={validations.password != null} onChange={this.handleChange} name="repetpassword" type="password" placeholder="Ripeti password" />
                                </div>
                            </div>
                            <div class="row justify-content-center">
                                <div className="col-12 col-md-6 mb-3 d-flex justify-content-center justify-content">
                                <Button className='btn btn-primary btn-arrow'  onClick={() => this.postLogin()} >
                                Conferma
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

export default ChangePassword
