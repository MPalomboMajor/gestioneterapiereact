import React, { Component, Fragment } from 'react';
import moment from 'moment';
import { Container, Row, Table, Form, Button, Modal, Tabs, Tab } from 'react-bootstrap';
import { user, medico, patient, caremanager } from '../helpers/api/api';
import { RowCustom } from "../Doctor/PatientComponent";
import Pagination from '../helpers/pagination';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { SatisfactionInfo } from './SatisfactionInfo';
import { Link } from 'react-bootstrap-icons';


export class ContactInfoPatient extends Component {
    contactInfoDtoProps = () => ({
        id: 0,
        dataOraContatto: "",
        pazienteContattato: true,
        info: "",
        idCareManager: 0,
        idPatient: 0

    })
    constructor(props) {
        super(props);
        this.state = {
            linkTab: 'contactInfo',
            listPatientInfo: [],
            currentPage: 1,
            itemPerPage: 5,
            isOpenModal: false,
            isUpdate: false,
            contactInfoDto: { ...this.contactInfoDtoProps(), },
            patient: {}
        }

        this.GetListPatientInfo = this.GetListPatientInfo.bind(this);
        this.getPatient = this.getPatient.bind(this);
    }
    componentDidMount() {
        this.GetListPatientInfo();
        this.getPatient();
    }
    getPatient = () => {
        let id = window.location.pathname.split('/').pop();
        id = parseInt(id);
        patient.get("GET/", id)
            .then(async (response) => {
                if (response.status == 200) {
                    this.setState({ patient: response.data.dati });
                }
            }).catch((error) => {

            })
            .finally(() => {
            });
    }
    GetListPatientInfo = () => {
        let id = window.location.pathname.split('/').pop();
        id = parseInt(id);
        caremanager.get("ContactInfo/", id)
            .then(async (response) => {
                if (response.status == 200) {
                    response.data.dati != null ? this.setState({ listPatientInfo: response.data.dati }) : this.setState({ listPatientInfo: [] });
                }
            }).catch((error) => {

            })
            .finally(() => {
            });
    }
    sedNote = () => {
        const dto = this.state.contactInfoDto;
        dto.idCareManager = JSON.parse(localStorage.getItem("role")).id;
        dto.idPatient = this.state.patient.id;
        caremanager.post("ContactInfo", this.state.contactInfoDto)
            .then(async (response) => {
                if (response.status == 200) {

                    this.GetListPatientInfo();
                    this.setState({ isOpenModal: false });
                }
            }).catch((error) => {

            })
            .finally(() => {
            });
    }
    handleChange = (el) => {
        const inputName = el.target.name;
        const inputValue = el.target.value;
        this.updateState(inputName, inputValue, 'contactInfoDto');
    };
    handleChangeDate = (el) => {
        const inputName = el.target.name;
        const inputValue = el.target.value;
        this.updateState(inputName, inputValue, 'contactInfoDto');
    };
    handleClose = () => {
        this.setState({ isOpenModal: false });
    }
    openModal = (el) => {
        this.setState({ isOpenModal: true });
    }
    updateState = (inputName, inputValue, objName) => {
        const statusCopy = { ...this.state };
        statusCopy[objName][inputName] = inputValue;

        this.setState(statusCopy);
    };
    setCurrentPage = (n) => {
        this.setState({ currentPage: n });
    }
    setPrevPage = (n) => {
        this.setState({ currentPage: n - 1 });
    }
    setNexPage = (n) => {
        this.setState({ currentPage: n + 1 });
    }
    selectTab = (e) => {
        this.setState({ linkTab: e });
    }
    render() {
        const indexOfLastPatient = this.state.currentPage * this.state.itemPerPage;
        const indexOfFirstPatient = indexOfLastPatient - this.state.itemPerPage;
        const currentItem = this.state.listPatientInfo?.slice(indexOfFirstPatient, indexOfLastPatient);
        const doclist = this.state.patient.doctorNameIdDTOs ? this.state.patient.doctorNameIdDTOs.slice(indexOfFirstPatient, indexOfLastPatient) : [];
        const element = {};
        currentItem.map((pa) => { pa.openModal = 'openModal'; });
        return (
            <>
                <Tabs defaultActiveKey="contactInfo" activeKey={this.state.linkTab} onSelect={(k) => this.selectTab(k)} id="" className="nav secondary-menu mb-4" >
                    <Tab eventKey="contactInfo" title="Info">
                        <Container className="">
                        <h1 class="h1">Info contatto {this.state.patient.name} {this.state.patient.surName} - Codice assistito: {this.state.patient.codicePaziente}</h1>
                            <Row className='col-12 pt-4' >
                                <Row className='col-8 pt-4' >

                                    <Row className='col-12 pt-4' >
                                        <Form.Group className="col-6 mb-3" controlId="formBasicEmail">
                                            <Form.Label className="">Codice fiscale assistito</Form.Label>
                                            <Form.Control disabled id='surName' value={this.state.patient.fiscalCode ? this.state.patient.fiscalCode : ''} alt='userDto' name="surName" placeholder="Enter cognome" />
                                        </Form.Group>
                                        <Form.Group className="col-6 mb-3" controlId="formBasicEmail">
                                            <Form.Label className="">Telefono</Form.Label>
                                            <Form.Control disabled id='name' value={this.state.patient.phoneNumber ? this.state.patient.phoneNumber : ''} alt='userDto' name="name" placeholder="Enter Nome" />
                                        </Form.Group>

                                    </Row>
                                    <Row className='col-12 pt-4' >
                                        <Form.Group className="col-12 mb-3" controlId="formBasicEmail">
                                            <Form.Label className="">Email</Form.Label>
                                            <Form.Control disabled id='name' alt='userDto' name="name" value={this.state.patient.email ? this.state.patient.email : ''} placeholder="Enter Nome" />
                                        </Form.Group>

                                    </Row>
                                </Row>
                                <Row className='col-3 pt-4 pl-4' >
                                    <div className="table-wrapper">
                                        <Table className="table custom">
                                            <thead>
                                                <tr>
                                                    <th>Nome Medico </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.patient.doctorNameIdDTOs ? doclist.map((pa) => 
                                                    
                                                    <RowCustom colums={["nameDoctor"]} item={pa} />) : ''
                                                }
                                            </tbody>
                                        </Table>
                                    </div>
                                </Row>
                                <Row className='col-3 ml-3 pt-4' >
                                    <Button className='ml-4 mb-3' onClick={() => this.openModal()}>Aggiungi Info</Button>
                                </Row>
                                <Row className='col-3 pt-4' >

                                </Row>
                            </Row>
                            <Row className='col-12 pt-4' >
                                <Row className='col-12 pt-4' >
                                    <div className="table-wrapper">
                                        <Table className="table custom">
                                            <thead>
                                                <tr>
                                                    <th>Data </th>
                                                    <th>Info</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    currentItem.map((pa) => <RowCustom colums={["dataOraContatto", "info"]} link={'codicePaziente'} reference={'codicePaziente'} controller={'ContactInfoPatient'} item={pa} />)
                                                }
                                            </tbody>
                                        </Table>
                                    </div>
                                    <Pagination
                                        patientsPerPage={5}
                                        totalPatients={this.state.listPatientInfo.length}
                                        paginate={(pageNumber) => this.setCurrentPage(pageNumber)}
                                        currentPage={this.state.currentPage}
                                        prevPage={(pageNumber) => this.setPrevPage(pageNumber)}
                                        nextPage={(pageNumber) => this.setNexPage(pageNumber)}
                                    />
                                </Row>

                            </Row>
                            <Modal
                                show={this.state.isOpenModal}
                                onHide={() => this.handleClose()}
                                backdrop="static"
                                keyboard={false}
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title>{this.state.isUpdate ? 'Modifica Info' : 'Aggiungi Info'}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Row>
                                        <div className="col-12 col-md-8">
                                            <div className="input-group mb-8">
                                            <span className="input-group-text" id="label-inizio">Inizio  contatto</span>
                                                <input type="datetime-local" className="form-control form-control-sm" id="data" aria-describedby="label-data" name="dataOraContatto" onChange={this.handleChangeDate} min={moment().format("YYYY-MM-DD")}  />
                                            </div>
                                        </div>
                                    </Row>
                                    <Row>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                            <Form.Label>Note</Form.Label>
                                            <Form.Control as="textarea" id='info' alt='contactInfoDto' name='info' onChange={this.handleChange} rows={3} />
                                        </Form.Group>
                                    </Row>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={() => this.handleClose()}>
                                        Chiudi
                                    </Button>
                                    <Button variant="primary" onClick={() => this.sedNote()} >{'Salva'}</Button>
                                </Modal.Footer>
                            </Modal>
                        </Container>
                    </Tab>
                    <Tab eventKey="satisfactionInfo" title="Soddisfazione servizio" >
                        <SatisfactionInfo />
                    </Tab>
                </Tabs>
                < NotificationContainer />
            </>
        )
    }
}

export default ContactInfoPatient
