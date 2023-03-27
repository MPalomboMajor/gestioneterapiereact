import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, InputGroup, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { api, medico, user } from '../helpers/api/api';
import { Link } from "react-router-dom";
import SimpleReactValidator from 'simple-react-validator';
import { entitiesLabels, message } from '../helpers/Constants';
import 'react-notifications/lib/notifications.css';
import { Eye, InfoCircle } from 'react-bootstrap-icons';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { findAllByTestId } from '@testing-library/react';
import PhoneInput, { isValidPhoneNumber }  from 'react-phone-number-input';
import 'react-phone-number-input/style.css';


export class Register extends Component {
    userModelProp = () => ({
        id: 0,
        username: '',
        password: '',
        idRole: 1,
        flag1: '0',
        flag2: '0',
        flag3: '0',
        flag4: '0',
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
        this.validatorOTP = new SimpleReactValidator();
        this.state = {
            notification: '',
            notificationHeaderMessage: '',
            notificationMessage: '',
            show: undefined,
            confirmpassword: '',
            policy: '',
            otp: '',
            isApprove: false,
            iSSendOtp: false,
            listRegion: [],
            listFilterRegion: [],
            listCentriMedici: [],

            isSelectRegion:0,
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
        this.getListRegion();
        this.reset();
        document.body.className = "splash";
    }
    reset = () => {
        window.localStorage.clear();
    };
    getListMedicalCenter = () => {
        medico.getAll("GetCentriMedici")
            .then(async (response) => {
                if (response.status == 200) {
                    this.setState({ listCentriMedici: response.data.dati, listFilterRegion: response.data.dati });
                }
            }).catch((error) => {

            })
            .finally(() => {
            });

    }
    getListRegion = () => {
        medico.getAll("GetRegions")
            .then(async (response) => {
                if (response.status == 200) {
                    this.setState({ listRegion: response.data.dati });
                }
            }).catch((error) => {

            })
            .finally(() => {
            });

    }
    InsertUser = () => {
        if (this.validatorOTP.allValid()) {
            let userDto = this.state.userDto;
            user.post("VerifyOTP", { idDispositivo: '', phone: this.state.medicoDTO.phoneNumber, otp: this.state.otp })
                .then((response) => {
                    if (response.data.statoEsito === 0) {
                        let userDto = this.state.userDto;
                        user.post("Save", this.state.userDto)
                            .then((response) => {
                                if (response.status === 200) {
                                    let medicoDto = this.state.medicoDTO;
                                    medicoDto.email = response.data.dati.username;
                                    medicoDto.idUser = response.data.dati.id;
                                    medico.post("Register", this.state.medicoDTO)
                                        .then((response) => {
                                            if (response.status === 200) {
                                                NotificationManager.success(message.MEDICO + message.SuccessInsert, entitiesLabels.SUCCESS, 3000);
                                                window.location.href = "/Login";
                                            }
                                        }).catch((error) => {
                                            NotificationManager.error(message.ErrorServer, entitiesLabels.ERROR, 3000);
                                        });
                                }
                            }).catch((error) => {
                                NotificationManager.error(message.ErrorServer, entitiesLabels.ERROR, 3000);
                            });
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
    sedOtp = () => {
        if (this.validator.allValid()) {
            let userDto = this.state.userDto;
            let doctorDTO = this.state.medicoDTO;
            doctorDTO.phoneNumber = doctorDTO.phoneNumber.startsWith('+39') ? doctorDTO.phoneNumber : "+39" + doctorDTO.phoneNumber
            doctorDTO.phoneNumber = doctorDTO.phoneNumber.replace(/ /g, '');
            console.log(userDto);
            user.post("PreSaveDoctor",JSON.stringify( 
            {
                username: userDto.username, 
                password: userDto.password, 
                flag1: userDto.flag1, 
                flag2: userDto.flag2, 
                flag3: userDto.flag3, 
                flag4: userDto.flag4, 
                doctorDTO: doctorDTO 
            }))
                .then((response) => {
                    if (response.data.statoEsito === 0) {
                        localStorage.setItem('accessToken', response.data.dati);
                        this.setState({ iSSendOtp: true });
                        NotificationManager.success("Ti abbiamo inviato un codice di verifica al numero di cellulare indicato in fase di registrazione", entitiesLabels.SUCCESS, 3000);
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
        statusCopy['medicoDTO']['idCentroMedico'] = parseInt(id);
        this.setState(statusCopy);
    };
    onChangeRegion = (inputName) => {
        const selected = inputName.target;
        const id = selected.children[selected.selectedIndex].id;
        const statusCopy = { ...this.state };
        if (id != 0) {
            statusCopy['listFilterRegion'] = this.state.listCentriMedici.filter(x => x.idRegione == id);
            statusCopy['isSelectRegion'] = 1;
        } else {
            statusCopy['listFilterRegion'] = this.state.listCentriMedici;
            statusCopy['isSelectRegion'] = 0;
        }
        
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
    handleChangePhone = (el) => {
        const inputValue = el;
        this.updateState('phoneNumber', inputValue, 'medicoDTO');
    };
    handleChange = (el) => {
        console.log(el.target.value);
        let objName = el.target.alt;
        const inputName = el.target.name;
        const inputValue = el.target.value;
        this.updateState(inputName, inputValue, objName);
    };
    handleCheckChange = (el) => {
        let objName = el.target.alt;
        const inputName = el.target.name;
        const inputValue = el.target.checked ? el.target.value : '0';
        this.updateState(inputName, inputValue, objName);
    };
    updateState = (inputName, inputValue, objName) => {
        const statusCopy = { ...this.state };
        statusCopy[objName][inputName] = inputValue;
        this.setState(statusCopy);
    };

    returnSplash = () => {
        window.location.href = "/";
    };

    return = () => {
        this.setState({ iSSendOtp: false });
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

    plocyApprove = () => {
        this.setState({ isApprove: !this.state.isApprove, policy: 'ok' });
    }
    flag1Approve = () => {
        this.setState({ 
            //isApprove: !this.state.isApprove, policy: 'ok' 
        });
    }
    flag2Approve = () => {
        this.setState({ isApprove: !this.state.isApprove, policy: 'ok' });
    }
    flag3Approve = () => {
        this.setState({ isApprove: !this.state.isApprove, policy: 'ok' });
    }
    render() {

        if (this.state.userDto.password === this.state.confirmpassword) {
            var equalPass = true
        } else {
            var equalPass = false;
        }

        const validations = {
            // approve: this.validator.message(
            //     'Approve',
            //     this.state.isApprove,
            //     'accepted'
            // ),
            // policy: this.validator.message(
            //     'policy',
            //     this.state.policy,
            //     'required'
            // ),
            // flag1: this.validator.message(
            //     'flag1',
            //     this.state.flag1,
            //     'required'
            // ),
            // flag2: this.validator.message(
            //     'flag2',
            //     this.state.flag2,
            //     'required'
            // ),
            // flag3: this.validator.message(
            //     'flag3',
            //     this.state.flag3,
            //     'required'
            // ),
            username: this.validator.message(
                'Email',
                this.state.userDto.username,
                'required|email'
            ),
            name: this.validator.message(
                'name',
                this.state.medicoDTO.name,
                'required'
            ),
            surName: this.validator.message(
                'surName',
                this.state.medicoDTO.surName,
                'required'
            ),
            fiscalCode: this.validator.message(
                'fiscalCode',
                this.state.medicoDTO.fiscalCode,
                'required|size:16,string'
            ),
            phoneNumber: this.validator.message(
                'Email',
                this.state.medicoDTO.phoneNumber,
                'required|phone'
            ),
            password: this.validator.message(
                'Password',
                this.state.userDto.password,
                'required'
            ),
            mendicalCenter: this.validator.message(
                'mendicalCenter',
                this.state.medicoDTO.idCentroMedico != 0 ,
                'accepted'
            ),
            selectRegion: this.validator.message(
                'selectRegion',
                this.state.isSelectRegion  != 0 ,
                'accepted'
            ),
            confirmpassword: this.validator.message(
                'Confirm Password',
                this.state.confirmpassword,
                'required'
            ),
            
            equalPass: this.validator.message('equalPass', equalPass, 'accepted'),
        };
        const validationsOTP = {
            otp: this.validatorOTP.message(
                'opt',
                this.state.otp,
                'required'
            ),
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
            this.state.iSSendOtp ?


                <div className="centering-form">
                    <Row>
                        <p class="text-center">Ti abbiamo inviato un <strong>codice di verifica</strong> al numero di cellulare indicato in fase di registrazione</p>
                        <input type="text" class="form-control text-center" id="otp" name="otp" onChange={this.handleChangeconfirm} isInvalid={validationsOTP.otp != null} placeholder="Inserisci il codice di verifica"></input>
                    </Row>
                    <Row className={"pt-4"}>
                        <div class="col-12 mb-3 d-flex justify-content-center">
                            <button class="btn btn-secondary mx-2" id="indietro" onClick={() => this.return()}>Indietro</button>
                            <button class="btn btn-secondary mx-2" id="reinvia" onClick={() => this.sedOtp()}>Invia di nuovo</button>
                            <Button className="btn btn-primary mx-2" onClick={() => this.InsertUser()}>
                                Verifica
                            </Button>
                        </div>
                        <div className=" input-layout-wrapper text-danger is-12">
                            {' '}{' '}
                        </div>
                    </Row>
                    < NotificationContainer />
                </div>



                :


                <Form className="centering-form">
                    <Row>
                        <Form.Group className="col-6 mb-2" >
                            <Form.Control onChange={this.handleChange} name="name" alt="medicoDTO" placeholder="Nome"  isInvalid={validations.name != null}value={this.state.medicoDTO.name} />
                        </Form.Group>
                        <Form.Group className="col-6 mb-2" >
                            <Form.Control onChange={this.handleChange} name="surName" alt="medicoDTO" placeholder="Cognome" isInvalid={validations.surName != null} value={this.state.medicoDTO.surName} />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group className="col-12 mb-2" >
                            <Form.Control onChange={this.handleChange} name="fiscalCode" alt="medicoDTO" placeholder="Codice fiscale" isInvalid={validations.fiscalCode != null} value={this.state.medicoDTO.fiscalCode} />
                        </Form.Group>
                    </Row>

                    <Row>
                        <Form.Group className="col-6 mb-2" >
                            <Form.Select onChange={this.onChangeRegion} name="region" alt="medicoDTO" placeholder="Centro medico" className={validations.selectRegion != null ? "error-validation-custom-select " :''  }> 
                                <option id="0">Seleziona Regione</option>
                                {this.state.listRegion.map((item) =>
                                    <option id={item.id}>{item.nomeRegione}</option>
                                )}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="col-6 mb-2  "  >
                            <Form.Select onChange={this.onChange} name="mendicalCenter" alt="medicoDTO" placeholder="Centro medico" className={validations.mendicalCenter != null ? "error-validation-custom-select " :''  }>
                                <option id="0">Seleziona Centro </option>
                                {this.state.listFilterRegion.map((item) =>
                                    <option id={item.id}>{item.nomeCentro}</option>
                                )}
                            </Form.Select>
                        </Form.Group>
                    </Row>
                    <Row>
                        <InputGroup className={validations.username != null ?" mr-0 error-validation-custom col-6 mb-2  input-custom-reg": "mr-0 col-6 mb-2  input-custom-reg"}>
                            <Form.Control onChange={this.handleChange} type="email" id='eMail' alt="userDto" name="username" isInvalid={validations.username != null} placeholder="E-mail" value={this.state.userDto.username} />
                        </InputGroup >
                        <InputGroup className={validations.phoneNumber != null && (this.state.medicoDTO?.phoneNumber === ""  || this.state.medicoDTO?.phoneNumber === undefined || (this.state.medicoDTO?.phoneNumber.length <= 10  )) ?"error-validation-custom col-6 mb-2  input-custom-reg": "col-6 mb-2  input-custom-reg"} >
                            <PhoneInput
                                defaultCountry="IT"
                                placeholder="Enter phone number"
                                value={this.state.medicoDTO?.phoneNumber} onKeyDown={() => keyDown()}
                                onChange={this.handleChangePhone}
                                />
                        </InputGroup >
                    </Row>
                    <Row className='pb-5'>
                        <Form.Group className="col-5 mb-2" controlId="formBasicPassword">
                            <Form.Control type='password' id='password' alt="userDto" onChange={this.handleChange} name="password" isInvalid={validations.password != null} value={this.state.userDto.password} placeholder="Password" />
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
                            <Form.Control type='password' id='confirmpassword' alt="confirmpassword" onChange={this.handleChangeconfirm} value={this.state.confirmpassword} name="confirmpassword" isInvalid={validations.confirmpassword != null || validations.equalPass != null} placeholder="Ripeti password" />
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
                        <div class="col-2 col-md-5 mb-0">
                            <div class="form-check mb-0">
                                <label class="form-check-label small">
                                    <Eye size='22' onClick={() => this.showPassword()} className='icon-black' style={{ 'marginRight': "5px" }} />
                                    Mostra password
                                </label>
                            </div>
                        </div>
                        <div class="col-3 col-md-3 mb-3 d-flex justify-content-center justify-content-md-end align-items-start">
                            <Button className="btn btn-secondary btn-arrow" onClick={() => this.returnSplash()}>
                                Indietro
                            </Button>
                        </div>
                        <div class="col-3 col-md-4 mb-3 d-flex justify-content-center justify-content-md-end align-items-start">
                            <Button className="btn btn-primary btn-arrow" onClick={() => this.sedOtp()}>
                                Registrati
                            </Button>
                        </div>
                    </Row>
                    <Row>
                    <div class="col-12 mb-0">
                            <div class="form-check mb-0">
                                <input class="form-check-input" onChange={this.handleCheckChange} value="1" alt="userDto" type="checkbox" id="flag1" name="flag1" ></input>
                                <label class="form-check-label small" for="flag1">
                                Presa visione informativa <a href='informativa_privacy_medico.pdf' target={'blank'} class="link-privacy small ps-4">privacy</a> (OBBLIGATORIO)
                                </label>
                            </div>
                            <div class="form-check mb-0">
                                <input class="form-check-input" onChange={this.handleCheckChange} value="1" alt="userDto" type="checkbox" id="flag2" name="flag2" ></input>
                                <label class="form-check-label small" for="flag2">
                                Consenso al trattamento dei dati sensibili (OBBLIGATORIO)
                                </label>
                            </div>
                            <div class="form-check mb-0">
                                <input class="form-check-input" onChange={this.handleCheckChange} value="1" alt="userDto" type="checkbox" id="flag3" name="flag3" ></input>
                                <label class="form-check-label small" for="flag3">
                                Consenso al trattamento dei dati finalità A3 (NON OBBLIGATORIO)
                                </label>
                            </div>
                            <div class="form-check mb-0">
                                <input class="form-check-input" onChange={this.handleCheckChange} value="1" alt="userDto" type="checkbox" id="flag4" name="flag4" ></input>
                                <label class="form-check-label small" for="flag4">
                                Consenso al trattamento dei dati finalità A4 (NON OBBLIGATORIO)
                                </label>
                            </div>
                            <div class="mb-0">
                                <label class="form-check-label small">Accedendo confermi di aver letto e accettato i <a href='informativa_privacy_medico.pdf' target={'blank'} class="link-privacy small ps-4">termini e condizioni</a> e la politica della <a href='informativa_privacy_medico.pdf' target={'blank'} class="link-privacy small ps-4">privacy</a>.</label>
                            </div>
                            {/* <div class="form-check mb-0">
                                <input class="form-check-input" type="checkbox" onChange={() => this.plocyApprove()} isInvalid={validations.approve != null} checked={this.state.isApprove ? true : false} id="flexCheckDefault" ></input>
                                <label className={(validations.policy != null) ? 'form-check-label small error-checkbox-message' : 'form-check-label small'} for="flexCheckDefault">
                                    Consenso al trattamento dei dati personali
                                </label>

                            </div> */}
                        </div>
                    </Row>
                    <Row>
                        <div class="col-12  mb-0">
                            <p class="small ps-md-4 mb-0 text-center text-md-start"><strong>Non riesci a registrarti?</strong></p>
                            <p class="mb-0 text-center text-md-start">
                                <a class="link-phone small ps-4">0696741200</a> <a href="mailto:epionapp@pharmaprime.com" class="link-email small ps-4">epionapp@pharmaprime.com</a>
                            </p>
                        </div>
                    </Row>
                    <NotificationContainer />
                </Form>

        )
    }
}

export default Register
