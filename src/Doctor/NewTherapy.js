import React, { Component, useState, useEffect } from 'react';
import '../css/style.css';
import { Tabs, Tab, Container, Form, Row, InputGroup, Button, FormControl, Table, Modal } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { PatientInfo } from "./PatientComponent"
import { medico, pianoterapeutico, patient } from '../helpers/api/api';
import DatePicker from "react-datepicker";
import { PatientRow, PatientAllergyRow } from "./PatientComponent";
import moment from 'moment';
import Pagination from '../helpers/pagination';

export class NewTherapy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            dateNow: '',
            patients: [],
            pharmacyPatients: [],
            currentPage: 1,
            patientsPerPage: 5,
            allergiesDTO:
            {
                id: 0,
                nomeFarmaco: "",
                idPatientProfile: 0
            },
            therapyDto: {
                id: 1,
                versione: 0,
                maxReminderNotification: 0,
                dataPrescrizione: moment(new Date()),
                inizioTerapia: moment(new Date()),
                dataFineTerapia: moment(new Date()),
                motivoFineTerapia: "",
                idDoctor: 1,
                idPatientProfile: 1
            }
        };
    }

    componentDidMount() {
        pianoterapeutico.get("Get/", this.state.therapyDto.idPatientProfile)
            .then((response) => {
                if (response.status === 200) {
                    this.setState({

                    });
                }
            }).catch((error) => {
                this.setState({ error: 1 })
            });

        patient.get("GetAllergies/", this.state.therapyDto.idPatientProfile)
            .then((response) => {
                if (response.status === 200) {
                    this.setState({
                        pharmacyPatients: response.data.dati,
                    });
                }
            }).catch((error) => {
                this.setState({ error: 1 })
            });
    }
    //FUNZIONI POST
    updateTherapy = () => {
        pianoterapeutico.post("Save", this.state.therapyDto)
            .then((response) => {
                if (response.status === 200) {
                    this.setState({

                    });
                }
            }).catch((error) => {
                this.setState({ error: 1 })
            });


    }
    AddAllergies = () => {
        if (this.state.therapyDto.idPatientProfile != 0) {
            let updateDTO = this.state.allergiesDTO;
            updateDTO.idPatientProfile = this.state.therapyDto.idPatientProfile;
        }
        patient.post("Allergy", this.state.allergiesDTO)
            .then((response) => {
                if (response.status === 200) {
                    this.setState({
                        pharmacyPatients: response.data.dati,
                        isOpenAllergic: false
                    });
                }
            }).catch((error) => {
                this.setState({ error: 1 })
            });


    }
     deleteItem  (el) {
        patient.delete("Allergy/", el)
        .then((response) => {
            if (response.status === 200) {
                this.setState({
                    pharmacyPatients: response.data.dati,
                });
            }
        }).catch((error) => {
            this.setState({ error: 1 })
        });
    }
    setCurrentPage = (n) => {
        this.setState({ currentPage: n });
    }

    handleCloseOtherPharmacy = () => {
        this.setState({ isOpenOtherPharmacy: false });
    }
    handleShowOtherPharmacy = () => {
        this.setState({ isOpenOtherPharmacy: true });
    }

    handleCloseAllergic = () => {
        this.setState({ isOpenAllergic: false });
    }
    handleShowAllergic = () => {
        this.setState({ isOpenAllergic: true });
    }
    initialState = () => {
        var value = moment(new Date()).format("DD/MM/YYYY");
        this.setState({ dateNow: value });

    }
    handleChange = (value, formattedValue) => {
        this.setState({
            dateNow: moment(value).format("DD/MM/YYYY"),
            formattedValue: formattedValue
        });
        this.updateState('dataFineTerapia', moment(value).format("DD/MM/YYYY"), 'therapyDto');
    }
    handleChangeNote = (el) => {
        let objName = el.target.alt;
        const inputName = el.target.name;
        const inputValue = el.target.value;
        this.updateState(inputName, inputValue, 'therapyDto');
    };
    handleChangeFarmaco = (el) => {
        let objName = el.target.alt;
        const inputName = el.target.name;
        const inputValue = el.target.value;
        this.updateState(inputName, inputValue, 'allergiesDTO');
    };
    updateState = (inputName, inputValue, objName) => {
        let statusCopy = Object.assign({}, this.state);
        statusCopy[objName][inputName] = inputValue;
        this.setState(statusCopy);
    };
    returnToMenu = () => {
        localStorage.removeItem('newPatient');
        window.location.href = "/Dashboard";
    }
    
    render() {
        const indexOfLastPatient = this.state.currentPage * this.state.patientsPerPage;
        const indexOfFirstPatient = indexOfLastPatient - this.state.patientsPerPage;
        const indexOfLastpharmacyPatient = this.state.currentPage * this.state.patientsPerPage;
        const indexOfFirstpharmacyPatient = indexOfLastPatient - this.state.patientsPerPage;
        const currentPatients = this.state.patients.slice(indexOfFirstPatient, indexOfLastPatient);
        const pharmacyPatients = this.state.pharmacyPatients.slice(indexOfFirstpharmacyPatient, indexOfLastpharmacyPatient);
        return (
            <Container className=''>
                <Row className='col-12 pt-4' >
                    <Tabs defaultActiveKey="terapia" id="uncontrolled-tab-example" className=" col-12 mb-3">
                        <Tab eventKey="terapia" title="Terapia">

                            <Form className="">
                                <Row>
                                    <Form.Group className="col-6 mb-3" >
                                        <Form.Label className="text">Data inizio terapia</Form.Label>
                                        <InputGroup className="mb-3">
                                            <Button disabled variant="outline-secondary" className='bi bi-calendar-date-fill' id="button-addon1" />
                                            <div className='datepicker-wrapper-date datepicker-wrapper'>
                                                <DatePicker disabled id='startTherapy' name={'startTherapy'} aria-label="Example text with button addon"
                                                    aria-describedby="basic-addon1" className=' form-control bi bi-calendar-date-fill' value={this.state.therapyDto.inizioTerapia} onChange={this.handleChange} />
                                            </div>
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group className="col-6 mb-3" >
                                        <Form.Label className="text">Data fine terapia</Form.Label>
                                        <InputGroup className="mb-3">
                                            <Button variant="outline-secondary" className='bi bi-calendar-date-fill' id="button-addon1" />
                                            <div className='datepicker-wrapper-date datepicker-wrapper'>
                                                <DatePicker id='endTherapy' name={'endTherapy'} aria-label="Example text with button addon"
                                                    aria-describedby="basic-addon1" className=' form-control bi bi-calendar-date-fill' value={this.state.therapyDto.dataFineTerapia} onChange={this.handleChange} />
                                            </div>
                                        </InputGroup>
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <div className='col-lg-8'>
                                        <InputGroup className="mb-3">
                                            <InputGroup.Text>Motivo fine terapia </InputGroup.Text>
                                            <FormControl as="textarea" aria-label="With textarea" id="motivoFineTerapia" onChange={this.handleChangeNote} name="motivoFineTerapia" />
                                        </InputGroup>
                                    </div>
                                </Row>
                                <Row>
                                    <Form.Group className="col-4 mb-3" controlId="formBasicPassword">
                                        <Button variant="btn btn-info " onClick={() => this.returnToMenu()}>
                                            Indietro
                                        </Button>
                                    </Form.Group>
                                    <Form.Group className="col-4 mb-3" controlId="formBasicPassword">
                                        <Button variant="btn btn-info  " onClick={this.updateTherapy}>
                                            Salva
                                        </Button>
                                    </Form.Group>
                                </Row>
                            </Form>
                        </Tab>
                        <Tab eventKey="ontozry" title="Ontozry">
                            <Row>

                            </Row>
                            <Row>
                                <Form.Group className="col-4 mb-3" controlId="formBasicPassword">
                                    <Button variant="btn btn-info bi bi-arrow-left" >

                                    </Button>
                                </Form.Group>
                                <Form.Group className="col-4 mb-3" controlId="formBasicPassword">
                                    <Button variant="btn btn-info  bi bi-arrow-right">

                                    </Button>
                                </Form.Group>
                                <Form.Group className="col-4 mb-3" controlId="formBasicPassword">
                                    <Button variant="btn btn-success bi-cloud-check" >

                                    </Button>
                                </Form.Group>
                            </Row>
                        </Tab>
                        <Tab eventKey="altriFarmaci" title="Altri Farmaci" >
                            <Modal
                                show={this.state.isOpenOtherPharmacy}
                                onHide={() => this.handleCloseOtherPharmacy()}
                                backdrop="static"
                                keyboard={false}
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title>Aggiungi nuovi farmaci </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Row>
                                        <Form.Group className="col-12 mb-3" controlId="formBasicEmail">
                                            <Form.Label className="text-">Farmaco</Form.Label>
                                            <Form.Control disabled name="farmaco" placeholder="Inserisci farmaco" />
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group className="col-6 mb-3" controlId="formBasicEmail">
                                            <Form.Label className="text-">Doagio</Form.Label>
                                            <Form.Control disabled name="dosagio" placeholder="Inserisci Dosagio" />
                                        </Form.Group>
                                        <Form.Group className="col-6 mb-3" controlId="formBasicEmail">
                                            <Form.Label className="text-">Quantita</Form.Label>
                                            <Form.Control disabled name="quantita" placeholder="Inserisci quantita" />
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Row>
                                            <Form.Group className="col-6 mb-3" >
                                                <Form.Label className="text">Data inizio terapia</Form.Label>
                                                <InputGroup className="mb-3">
                                                    <Button variant="outline-secondary" className='bi bi-calendar-date-fill' id="button-addon1" />
                                                    <div className='datepicker-wrapper-datemodal datepicker-wrapper-modal'>
                                                        <DatePicker id='startTherapy' name={'startTherapy'} aria-label="Example text with button addon"
                                                            aria-describedby="basic-addon1" className=' form-control bi bi-calendar-date-fill' value={this.state.dateNow} onChange={this.handleChange} />
                                                    </div>
                                                </InputGroup>
                                            </Form.Group>
                                            <Form.Group className="col-6 mb-3" >
                                                <Form.Label className="text">Data fine terapia</Form.Label>
                                                <InputGroup className="mb-3">
                                                    <Button variant="outline-secondary" className='bi bi-calendar-date-fill' id="button-addon1" />
                                                    <div className='datepicker-wrapper-datemodal datepicker-wrapper-modal'>
                                                        <DatePicker id='endTherapy' name={'endTherapy'} aria-label="Example text with button addon"
                                                            aria-describedby="basic-addon1" className=' form-control bi bi-calendar-date-fill' value={this.state.dateNow} onChange={this.handleChange} />
                                                    </div>
                                                </InputGroup>
                                            </Form.Group>
                                        </Row>
                                    </Row>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={() => this.handleCloseOtherPharmacy()}>
                                        Chiudi
                                    </Button>
                                    <Button variant="primary">Aggiungi</Button>
                                </Modal.Footer>
                            </Modal>
                            <Row>
                                <Form.Group className="col-4 mb-3" controlId="formBasicPassword">
                                    <Button variant="btn btn-info bi bi-plus-square" onClick={() => this.handleShowOtherPharmacy()}>

                                    </Button>
                                </Form.Group></Row>
                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th>Codice Paziente</th>
                                        <th>Codice Fiscale</th>
                                        <th>Cognome</th>
                                        <th>Nome</th>
                                        <th>Telefono</th>
                                        <th>Email</th>
                                        <th>Stato Paziente</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        currentPatients.map((pa) => <PatientRow key={pa.codicePaziente} patient={pa} />)
                                    }
                                </tbody>
                            </Table>
                            <Pagination
                                patientsPerPage={3}
                                totalPatients={this.state.patients.length}
                                paginate={(pageNumber) => this.setCurrentPage(pageNumber)}
                            />
                            <Row>
                                <Form.Group className="col-4 mb-3" controlId="formBasicPassword">
                                    <Button variant="btn btn-info bi bi-arrow-left">

                                    </Button>
                                </Form.Group>
                                <Form.Group className="col-4 mb-3" controlId="formBasicPassword">
                                    <Button variant="btn btn-info  bi bi-arrow-right">

                                    </Button>
                                </Form.Group>
                                <Form.Group className="col-4 mb-3" controlId="formBasicPassword">
                                    <Button variant="btn btn-success bi-cloud-check" >

                                    </Button>
                                </Form.Group>
                            </Row>
                        </Tab>
                        <Tab eventKey="allergieFarmaci" title="Allergie a farmaci" >
                            <Modal
                                show={this.state.isOpenAllergic}
                                onHide={() => this.handleCloseAllergic()}
                                backdrop="static"
                                keyboard={false}
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title>Aggiungi farmaco  a cui è allergico il paziente</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Row>
                                        <Form.Group className="col-12 mb-3" controlId="formBasicEmail">
                                            <Form.Label className="text-">Farmaco avverso</Form.Label>
                                            <Form.Control id="nomeFarmaco" onChange={this.handleChangeFarmaco} alt="allergiesDTO" name="nomeFarmaco" placeholder="Inserisci farmaco" />
                                        </Form.Group>
                                    </Row>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={() => this.handleCloseAllergic()}>
                                        Chiudi
                                    </Button>
                                    <Button variant="primary" onClick={() => this.AddAllergies()}>Aggiungi</Button>
                                </Modal.Footer>
                            </Modal>
                            <Row>
                                <Form.Group className="col-4 mb-3" controlId="formBasicPassword">
                                    <Button variant="btn btn-info bi bi-plus-square" onClick={() => this.handleShowAllergic()}>

                                    </Button>
                                </Form.Group></Row>
                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th>Farmaco a cui è allergico il paziente</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        pharmacyPatients.map((pa) => <PatientAllergyRow key={pa.id} allergy={pa.nomeFarmaco} delete={(el)=>this.deleteItem(el)}   id={pa.id}/>)
                                    }
                                </tbody>
                            </Table>
                            <Pagination
                                patientsPerPage={this.state.patientsPerPage}
                                totalPatients={this.state.pharmacyPatients?.length}
                                paginate={(pageNumber) => this.setCurrentPage(pageNumber)}
                            />
                            <Row>
                                <Form.Group className="col-4 mb-3" controlId="formBasicPassword">
                                    <Button variant="btn btn-info bi bi-arrow-left">

                                    </Button>
                                </Form.Group>
                                <Form.Group className="col-4 mb-3" controlId="formBasicPassword">
                                    <Button variant="btn btn-primary bi-cloud-check" >
                                        Termina creazione paziente
                                    </Button>
                                </Form.Group>
                            </Row>
                        </Tab>
                    </Tabs>
                </Row></Container>
        );
        // }
    }
}

export default NewTherapy;
