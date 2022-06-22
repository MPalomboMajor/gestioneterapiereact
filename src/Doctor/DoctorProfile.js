import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, Modal, Spinner, Tabs, Tab, Table } from 'react-bootstrap';
import { RowCustom } from "../Doctor/PatientComponent";
import { Eye } from 'react-bootstrap-icons';
import { user, medico, patient, patientcode } from '../helpers/api/api';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { NotificationContainer as ContainerModal, NotificationManager as ManagerModal } from 'react-notifications';
import { entitiesLabels, message, role } from '../helpers/Constants';
import SimpleReactValidator from 'simple-react-validator';

export class DoctorProfile extends Component {
    userModelProp = () => ({
        idDoctor: 0,
        fiscalCode: '',
        name: '',
        surName: '',
        email: '',
        phoneNumber: '',
        idCentroMedico: 0,

    });
    passwordModelProp = () => ({
        resetPasswordCode: '',
        confirmPassword: '',
        newPassword: '',
        username: '',

    });
    constructor(props) {
        super(props);

        this.validator = new SimpleReactValidator();
        this.state = {
            isOpenChangePassword: false,
            email: '',
            isSending: false,
            listCentriMedici: [],
            listFilterRegion:  [],
            listRegion: [],
            listPatient: [],
            listPatientCode: [],
            currentPage: 1,
            itemPerPage: 5,
            sendCode: false,
            idRegion:0,
            userDto: {
                ...this.userModelProp(),
            },

            passwordModel: {
                ...this.passwordModelProp(),
            }
        }
        this.getProfile = this.getProfile.bind(this);
        this.getListPatient = this.getListPatient.bind(this);
        this.getListMedicalCenter = this.getListMedicalCenter.bind(this);
    }
    componentDidMount() {
        this.getProfile();
        this.getListPatient();
        this.getListRegion();
        this.getListMedicalCenter();
    }

    //FUNZIONI
    getListPatient = () => {



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
    getListMedicalCenter = () => {
        medico.getAll("GetCentriMedici")
            .then(async (response) => {
                if (response.status == 200) {
                    this.setState({ listCentriMedici: response.data.dati , listFilterRegion: response.data.dati  });

                }
            }).catch((error) => {

            })
            .finally(() => {
            });

    }
    getProfile = () => {
        let id = window.location.pathname.split('/').pop();
        id = parseInt(id);
        if (!id) {
            let dto = localStorage.getItem("role");
            dto = JSON.parse(dto);
            id = dto.idRole == 1 ? dto.id : 0;
        }
        medico.get("Get/", parseInt(id))
            .then((response) => {
                if (response.status == 200) {
                    this.setState({ userDto: response.data.dati });

                    const statusCopy = { ...this.state };
                    statusCopy['userDto']['idDoctor'] = response.data.dati.id;
                    if (JSON.parse(localStorage.getItem("role")).idRole == role.CAREMANAGER) {

                        patient.get("GetByDoctor/", response.data.dati.id)
                            .then((response) => {
                                if (response.status === 200) {
                                    this.setState({ listPatient: response.data.dati });
                                }
                            }).catch((error) => {

                            });
                        // patientcode.getAll("GetCodiciPazienti")
                        //     .then((response) => {
                        //         if (response.status === 200) {
                        //             this.setState({ listPatientCode: response.data.dati });
                        //         }
                        //     }).catch((error) => {

                        //     });
                    }
                }
            }).catch((error) => {
                if (error) {
                    const statusCopy = { ...this.state };
                    statusCopy['userDto']['idDoctor'] = error;
                }
            })

    }
    onChange = (inputName) => {
        const selected = inputName.target;
        const id = selected.children[selected.selectedIndex].id;
        const statusCopy = { ...this.state };
        statusCopy['userDto']['idCentroMedico'] = parseInt(id);
        this.setState(statusCopy);
    };
    onChangeRegion = (inputName) => {
        const selected = inputName.target;
        const id = selected.children[selected.selectedIndex].id;
        const statusCopy = { ...this.state };
        if(id!= 0){
            statusCopy['listFilterRegion'] = this.state.listCentriMedici.filter( x  => x.idRegione == id);
        }else{
            statusCopy['listFilterRegion'] = this.state.listCentriMedici;
        }
        
        this.setState(statusCopy);
    };
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
                    this.setState({ isSending: false, sendCode: true });
                } else {
                    ManagerModal.error(message.CODICE + message.ErroSend, entitiesLabels.ERROR, 3000);
                    this.setState({ isSending: false, sendCode: false });

                }
            }).catch((error) => {
                ManagerModal.error(message.CODICE + message.ErroSend, entitiesLabels.ERROR, 3000);
                this.setState({ isSending: false });
            });
    }
    sendChangeProfile = () => {
        this.setState((prevState) => ({ isSending: true }))
        medico.post("Edit", this.state.userDto)
            .then((response) => {
                if (response.status === 200) {
                    NotificationManager.success(message.MEDICO + message.SuccessUpdate, entitiesLabels.SUCCESS, 3000);
                    this.setState({ isSending: false });
                } else {
                    NotificationManager.error(message.MEDICO + message.ErrorServer, entitiesLabels.ERROR, 3000);
                    this.setState({ isSending: false });
                }
            }).catch((error) => {
                NotificationManager.error(message.MEDICO + message.ErrorServer, entitiesLabels.ERROR, 3000);
                this.setState({ isSending: false });
            });
    }
    sendChangePassword = () => {
        if (this.validator.allValid()) {
            this.setState((prevState) => ({ isSending: true }))
            const statusCopy = { ...this.state };
            statusCopy['passwordModel']['username'] = this.state.userDto.email;

            this.setState(statusCopy);
            user.post("ChangePassword", this.state.passwordModel)
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
        } else {
            this.validator.showMessages();
            this.setState({ warning: true });
            this.forceUpdate();
        }
    }
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
        var x = document.getElementById("newPassword");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }

    showConfirmPassword = () => {
        var x = document.getElementById("confirmPassword");
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
            code: this.validator.message(
                'Reset Code',
                this.state.passwordModel.resetPasswordCode,
                'required'
            ),
            newPassword: this.validator.message(
                'New Password',
                this.state.passwordModel.newPassword,
                'required'
            ),
            confirmPassword: this.validator.message(
                'Confirm Password',
                this.state.passwordModel.confirmPassword,
                'required'
            ),
        };
        const indexOfLastPatient = this.state.currentPage * this.state.itemPerPage;
        const indexOfFirstPatient = indexOfLastPatient - this.state.itemPerPage;
        const currentItem = this.state.listPatient ? this.state.listPatient.slice(indexOfFirstPatient, indexOfLastPatient) : [];
        const currentRegion = this.state.listCentriMedici != [] ? this.state.listCentriMedici.filter( x  => x.id == this.state.userDto.idCentroMedico): [];
        const currentItemsCode = this.state.listPatientCode ? this.state.listPatientCode.slice(indexOfFirstPatient, indexOfLastPatient) : [];
        var objRegion   = currentRegion != [] ? this.state.listCentriMedici.filter( x  => x.id == this.state.userDto.idCentroMedico): null;
        var idRegion = objRegion.length > 0 ? objRegion[0].idRegione : 0;
        
        return (<>
            {JSON.parse(localStorage.getItem("role")).idRole == role.CAREMANAGER ?
                //CAREMANAGER
                <>
                    <Container className='col-12 pt-4 row'>
                        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className=" col-12 mb-3">
                            <Tab eventKey="profile" title="Anagrafica Medico">
                                <Form className='col-12 pt-4 row'>
                                    <Row className="col-12 mb-3" >
                                        <Form.Group className="col-6 mb-3" controlId="formBasicEmail">
                                            <Form.Label className="">Cognome</Form.Label>
                                            <Form.Control id='surName' alt='userDto' name="surName" onChange={this.handleChange} value={this.state.userDto.surName ? this.state.userDto.surName : ''} placeholder="Enter cognome" />
                                        </Form.Group>
                                        <Form.Group className="col-6 mb-3" controlId="formBasicEmail">
                                            <Form.Label className="">Nome</Form.Label>
                                            <Form.Control id='name' alt='userDto' name="name" onChange={this.handleChange} value={this.state.userDto.name ? this.state.userDto.name : ''} placeholder="Enter Nome" />
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group className="col-12 mb-3" controlId="formBasicEmail">
                                            <Form.Label className="">Email</Form.Label>
                                            <Form.Control disabled id='email' name="email" onChange={this.handleChange} value={this.state.userDto.email} isInvalid={validations.email != null} placeholder="Enter email" />
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group className="col-6 mb-2" >
                                            <Form.Label className="">Regione</Form.Label>
                                            <Form.Select onChange={this.onChangeRegion} name="region" alt="medicoDTO" placeholder="Centro medico"  >
                                                <option id="0">Seleziona Regione</option>
                                                {this.state.listRegion.map((item) =>
                                                    <option selected={idRegion == item.id ? "selected" : ''} id={item.id}>{item.nomeRegione}</option>
                                                )}
                                            </Form.Select>
                                        </Form.Group>
                                        <Form.Group className="col-6 mb-3 input-layout-wrapper" >
                                            <Form.Label className="">Centro Medico</Form.Label>
                                            <Form.Select id='mendicalCenter' onChange={this.onChange} name="mendicalCenter" alt="medicoDTO" placeholder="Inserisci centro medico" >
                                                {this.state.listFilterRegion.map((item) =>

                                                    <option id={item.id} selected={this.state.userDto.idCentroMedico == item.id ? "selected" : ''}>{item.nomeCentro}</option>
                                                )}
                                            </Form.Select>
                                        </Form.Group>
                                    </Row>

                                    <Row>
                                        <Form.Group className="col-6 mb-3" controlId="formBasicEmail">
                                            <Form.Label className="">Codice Fiscale</Form.Label>
                                            <Form.Control id='fiscalCode' alt='userDto' name="fiscalCode" onChange={this.handleChange} value={this.state.userDto.fiscalCode ? this.state.userDto.fiscalCode : ''} placeholder="Enter Codice fiscale" />
                                        </Form.Group>
                                        <Form.Group className="col-6 mb-3" controlId="formBasicEmail">
                                            <Form.Label className="">Telefono</Form.Label>
                                            <Form.Control id='phoneNumber' alt='userDto' name="phoneNumber" onChange={this.handleChange} isInvalid={validations.telephone != null} value={this.state.userDto.phoneNumber} placeholder="Enter telefono" />
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group className="col-4 mb-3" controlId="formBasicPassword">
                                            <Button variant="btn btn-primary " onClick={() => this.handleShowChangePassword()}>
                                                Modifica Password
                                            </Button>
                                        </Form.Group>
                                        <Form.Group className="col-4 mb-3" controlId="formBasicPassword">
                                            <Button variant="btn btn-primary " onClick={() => this.sendChangeProfile()}>
                                                Modifica Profilo
                                            </Button>
                                        </Form.Group>
                                        <Form.Group className="col-4 mb-3" controlId="formBasicPassword">
                                            {JSON.parse(localStorage.getItem("role")).idRole == 4 ?
                                                <Form.Check
                                                    type="switch"
                                                    id="custom-switch"
                                                    label="Disattiva"
                                                /> : ''
                                            }
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
                                                <Form.Control value={this.state.userDto.email} disabled name="farmaco" placeholder="Inserisci email" />
                                            </Form.Group>
                                        </Row>
                                        <Row>
                                            <Form.Group className="col-6 mb-3" controlId="formBasicEmail">
                                                <Form.Label className="text">Nuova Password</Form.Label><Eye size='22' onClick={() => this.showPassword()} className='icon-black' />
                                                <Form.Control id="newPassword" alt="passwordModel" onChange={this.handleChange} name="newPassword" type='password' placeholder="Inserisci password" />
                                            </Form.Group>
                                            <Form.Group className="col-6 mb-3" controlId="formBasicEmail">
                                                <Form.Label className="text" >Conferma Password</Form.Label><Eye size='22' onClick={() => this.showConfirmPassword()} className='icon-black' />
                                                <Form.Control id="confirmPassword" alt="passwordModel" onChange={this.handleChange} name="confirmPassword" type='password' placeholder="Inserisci  conferma password" />
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
                                            <Form.Group className="col-12 mb-3" controlId="formBasicEmail">
                                                <Form.Label className="text">Codice Reset</Form.Label>
                                                <Form.Control id="resetPasswordCode" name="resetPasswordCode" alt="passwordModel" onChange={this.handleChange} placeholder="Inserisci codice" />
                                            </Form.Group>
                                        </Row>
                                    </Modal.Body>
                                    <ContainerModal />
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
                                        <Button variant="primary" onClick={() => this.sendChangePassword()}>{this.state.isSending == true ? <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        /> : ''}Cambia Password</Button>
                                    </Modal.Footer>
                                    <ContainerModal />
                                </Modal>
                                < NotificationContainer />
                            </Tab>
                            <Tab eventKey="listPatient" title="Elenco assistiti">
                                <Table striped bordered hover size="sm">
                                    <thead>
                                        <tr>
                                            <th>Codice assistito</th>
                                            <th>Codice assistito</th>
                                            <th>Codice Fiscale</th>
                                            <th>Cognome</th>
                                            <th>Nome</th>
                                            <th>Email</th>
                                            <th>Telefono</th>
                                            <th>Stato assistito</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.listPatient ? currentItem.map((pa) => <RowCustom colums={["id", "codicePaziente", "fiscalCode", "surName", "name", "email", "phoneNumber", "isActive"]} link={'id'} reference={'id'} controller={'PatientRegistry'} item={pa} />) : ''
                                        }
                                    </tbody>
                                </Table>
                            </Tab>
                        </Tabs>
                        
                    </Container>
                </>
                :
                //MEDICO
                <>
                    <Container className='col-12 pt-4 row'>
                        <Form className='col-12 pt-4 row'>

                            <Form.Group className="col-6 mb-3" controlId="formBasicEmail">
                                <Form.Label className="">Cognome</Form.Label>
                                <Form.Control id='surName' alt='userDto' name="surName" onChange={this.handleChange} value={this.state.userDto.surName} placeholder="Inserisci cognome" />
                            </Form.Group>
                            <Form.Group className="col-6 mb-3" controlId="formBasicEmail">
                                <Form.Label className="">Nome</Form.Label>
                                <Form.Control id='name' alt='userDto' name="name" onChange={this.handleChange} value={this.state.userDto.name} placeholder="Inserisci Nome" />
                            </Form.Group>

                            <Form.Group className="col-12 mb-3" controlId="formBasicEmail">
                                <Form.Label className="">Codice Fiscale</Form.Label>
                                <Form.Control id='fiscalCode' alt='userDto' name="fiscalCode" onChange={this.handleChange} value={this.state.userDto.fiscalCode} placeholder="Inserisci Codice fiscale" />
                            </Form.Group>
                            <Form.Group className="col-6 mb-2" >
                            <Form.Label className="">Regione</Form.Label>
                                <Form.Select onChange={this.onChangeRegion} name="region" alt="medicoDTO" placeholder="Centro medico"  >
                                    <option id="0">Seleziona Regione</option>
                                    {this.state.listRegion.map((item) =>
                                        <option selected={ idRegion == item.id  ? "selected" : ''} id={item.id}>{item.nomeRegione}</option>
                                    )}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="col-6 mb-3 input-layout-wrapper" >
                                <Form.Label className="">Centro Medico</Form.Label>
                                <Form.Select id='mendicalCenter' onChange={this.onChange} name="mendicalCenter" alt="medicoDTO" placeholder="Inserisci centro medico" >
                                    {this.state.listFilterRegion.map((item) =>

                                        <option id={item.id} selected={this.state.userDto.idCentroMedico == item.id ? "selected" : ''}>{item.nomeCentro}</option>
                                    )}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="col-6 mb-3" controlId="formBasicEmail">
                                <Form.Label className="">Email</Form.Label>
                                <Form.Control disabled id='email' name="email" onChange={this.handleChange} value={this.state.userDto.email} isInvalid={validations.email != null} placeholder="Inserisci email" />
                            </Form.Group>
                            <Form.Group className="col-6 mb-3" controlId="formBasicEmail">
                                <Form.Label className="">Telefono</Form.Label>
                                <Form.Control disabled id='phoneNumber' alt='userDto' name="phoneNumber" onChange={this.handleChange} isInvalid={validations.telephone != null} value={this.state.userDto.phoneNumber} placeholder="Inserisci telefono" />
                            </Form.Group>

                            <Form.Group className="col-4 mb-3" controlId="formBasicPassword">
                                <Button variant="btn btn-primary " onClick={() => this.handleShowChangePassword()}>
                                    Modifica Password
                                </Button>
                            </Form.Group>
                            <Form.Group className="col-4 mb-3" controlId="formBasicPassword">
                                <Button variant="btn btn-primary " onClick={() => this.sendChangeProfile()}>
                                    Salva modifiche
                                </Button>
                            </Form.Group>
                            <Form.Group className="col-4 mb-3" controlId="formBasicPassword">
                                {JSON.parse(localStorage.getItem("role")).idRole == 4 ?
                                    <Form.Check
                                        type="switch"
                                        id="custom-switch"
                                        label="Disattiva"
                                    /> : ''
                                }
                            </Form.Group>


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
                                        <Form.Control value={this.state.userDto.email} disabled name="farmaco" placeholder="Inserisci email" />
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group className="col-6 mb-3" controlId="formBasicEmail">
                                        <Form.Label className="text">Nuova Password</Form.Label><Eye size='22' onClick={() => this.showPassword()} style={{ 'marginLeft': "5px" }} className='icon-black' />
                                        <Form.Control id="newPassword" alt="passwordModel" isInvalid={validations.newPassword != null} onChange={this.handleChange} name="newPassword" type='password' placeholder="Inserisci password" />
                                    </Form.Group>
                                    <Form.Group className="col-6 mb-3" controlId="formBasicEmail">
                                        <Form.Label className="text" >Conferma Password</Form.Label><Eye size='22' onClick={() => this.showConfirmPassword()} style={{ 'marginLeft': "5px" }} className='icon-black' />
                                        <Form.Control id="confirmPassword" alt="passwordModel" isInvalid={validations.confirmPassword != null || validations.equalPass != null} onChange={this.handleChange} name="confirmPassword" type='password' placeholder="Inserisci password" />
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
                                    <Form.Group className="col-12 mb-3" controlId="formBasicEmail">
                                        <Form.Label className="text">Codice Reset</Form.Label>
                                        <Form.Control id="resetPasswordCode" name="resetPasswordCode" isInvalid={validations.code != null} alt="passwordModel" onChange={this.handleChange} placeholder="Inserisci codice" />
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group className="col-12 mb-3" controlId="formBasicEmail">
                                        {this.state.sendCode ? <Form.Label className="text">Il codice di verifica è stato inviato all'indirizzo e-mail fornito. Digitarlo nel campo Codice Reset e cliccare su Cambia password.</Form.Label> : ''}
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
                                /> : ''} {!this.state.sendCode ? "Richiedi codice" : "Richiedi nuovamente "}</Button>
                                <Button variant="primary" onClick={() => this.sendChangePassword()}>{this.state.isSending == true ? <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                /> : ''}Cambia Password</Button>
                            </Modal.Footer>
                            <ContainerModal />
                        </Modal>
                    </Container>
                    < NotificationContainer />
                </>

            }
        </>
        )
    }
}

export default DoctorProfile
