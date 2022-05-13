import React, { Component } from 'react';
import { Container, Row, Col, Form, Button ,Modal, Spinner } from 'react-bootstrap';
import { api, user } from '../helpers/api/api';
import { Link , useParams} from "react-router-dom";
import SimpleReactValidator from 'simple-react-validator';
import { entitiesLabels, message, role } from '../helpers/Constants';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import moment from 'moment';
export class ChangePassword extends Component {
    //STATO
    passwordModelProp = () => ({
        resetPasswordCode:'' ,
        confirmPassword: '',
        newPassword: '',
        username: '',

    });
    constructor(props) {
        super(props);
        this.state = {
            isSending:false,
            sendCode:false,
            passwordModel: {
                ...this.passwordModelProp(),
            }
        }
        this.validator = new SimpleReactValidator();
        this.validatorSend = new SimpleReactValidator();
    }

    //FUNZIONI 

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

    
    sendChangePassword = () => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const page_type = urlParams.get('codiceInviato');
        const dto =  this.state.passwordModel;
        dto.resetPasswordCode = page_type
        if (this.validator.allValid()) {
            
        user.post("ChangePassword",dto)
            .then((response) => {
                if (response.data.statoEsito===0) {
                    NotificationManager.success(message.CODICE + message.SuccessSend, entitiesLabels.SUCCESS, 3000);
                    this.setState({ isSending: false });
                    window.location.href = "/Login";
                }else{
                    NotificationManager.error( response.data.descrizioneEsito, entitiesLabels.ERROR, 3000);
                    this.setState({ isSending: false });
                }
            }).catch((error) => {
                NotificationManager.error(message.CODICE + message.ErroSend, entitiesLabels.ERROR, 3000);
                this.setState({ isSending: false });
            });
        } else {
            this.validator.showMessages();
            this.setState({ warning: true });
            this.forceUpdate();
        }
    }
    sedRestCode = () => {

       
        if (this.validatorSend.allValid()) {
        this.setState((prevState) => ({ isSending: true }))
        user.post("RequestNewPassword", this.state.passwordModel.username)
            .then((response) => {
                if (response.data.statoEsito===0) {
                    NotificationManager.success(message.CODICE + message.SuccessSend, entitiesLabels.SUCCESS, 3000);
                    this.setState({ isSending: false , sendCode:true});
                }else{
                    NotificationManager.error( response.data.descrizioneEsito, entitiesLabels.ERROR, 3000);
                    this.setState({ isSending: false , sendCode:false});
                }
            }).catch((error) => {
                NotificationManager.error(message.CODICE + message.ErroSend, entitiesLabels.ERROR, 3000);
                this.setState({ isSending: false });
            });
        } else {
            this.validator.showMessages();
            this.setState({ warning: true });
            this.forceUpdate();
        }
    }
    //VIEW 
    render() {
        
        const validations = {
            username: this.validator.message(
                'Email',
                this.state.passwordModel.username,
                'required|email'
            ),
            newPassword: this.validator.message(
                'Password',
                this.state.passwordModel.newPassword,
                'required'
            ),
            confirmPassword: this.validator.message(
                'Password',
                this.state.passwordModel.confirmPassword,
                'required'
            ),
        };
        const validationsSend = {
            username: this.validatorSend.message(
                'Email',
                this.state.passwordModel.username,
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
                                    <Form.Control isInvalid={validations.username != null || validationsSend.username != null} onChange={this.handleChange} name="username"  alt="passwordModel"  placeholder="E-Mail" />
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-12 col-md-6 mb-3 mb-md-3">
                                    <Form.Control isInvalid={validations.newPassword != null} onChange={this.handleChange} name="newPassword"  alt="passwordModel"type="password" placeholder="Nuova password" />
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-12 col-md-6 mb-3 mb-md-3">
                                    <Form.Control isInvalid={validations.confirmPassword != null} onChange={this.handleChange} name="confirmPassword" alt="passwordModel" type="password" placeholder="Ripeti password" />
                                </div>
                            </div>
                            <div class="row justify-content-center">
                                <div className="col-6 col-md-6 mb-3 d-flex justify-content-center justify-content">
                                <Button variant="secondary" onClick={() => this.sedRestCode()} > {this.state.isSending == true ? <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                /> : ''} {!this.state.sendCode ?  "Richiedi codice" : "Richiedi nuovamente "}</Button>
                                </div>
                                <div className="col-6 col-md-6 mb-3 d-flex justify-content-center justify-content">
                                <Button className='btn btn-primary btn-arrow'  onClick={() => this.sendChangePassword()} >
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
