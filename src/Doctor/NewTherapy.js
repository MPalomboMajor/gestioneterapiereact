import React, { Component, useState, useEffect } from 'react';
import '../css/style.css';
import { Tabs, Tab, Container, Form, Row, InputGroup, Button, FormControl, Table, Modal } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { RowCustom } from "./PatientComponent"
import { medico, pianoterapeutico, patient, medication } from '../helpers/api/api';
import DatePicker from "react-datepicker";
import { PatientRow, PatientAllergyRow } from "./PatientComponent";
import moment from 'moment';
import Pagination from '../helpers/pagination';

export class NewTherapy extends Component {
    allergiesProps = () => ({
        id: 0,
        nomeFarmaco: "",
        idPatientProfile: 0
    })
    farmaciProps = () => ({
        id: 1,
        quantitaPrescrizione: 0,
        oraAssunzioneIndicata: '',
        dataFine: '',
        dataInizio: '',
        isActiveReminder: false,
        idPianoTerapeutico: 1,
        farmaco: {
            id: 1,
            nome: "",
            isOntozry: false
        },
        formulazione: {
            id: 1,
            formula: "",
            idFarmaco: 1
        }
    })
    constructor(props) {
        super(props);
        this.state = {

            listOntozry: [],
            isOntozryFlag: false,
            items: [],
            dateNow: '',
            patients: [],
            pharmacyPatients: [],
            currentPage: 1,
            patientsPerPage: 5,
            allergiesDTO: { ...this.allergiesProps() },
            isOpenAllergic: false,
            isOpenModalOntozry: false,
            therapyDto: {
                id: 1,

                versione: 0,
                maxReminderNotification: 0,
                dataPrescrizione: "",
                inizioTerapia: "",
                dataFineTerapia: "",
                motivoFineTerapia: "",
                idDoctor: JSON.parse(localStorage.getItem("role")).id,
                idPatientProfile: 0,
                elencoFarmaciPrescritti: [],
                ontozryMedication: [],
                otherMedication: [],
                medicationAllergies: [],
                storicPlan: [],
            },
            medicationDTO: {
                ...this.farmaciProps()
            },
        };
    }

    componentDidMount() {
        localStorage.removeItem('newPatient');
        pianoterapeutico.get("Get/", this.state.therapyDto.idPatientProfile)
            .then((response) => {
                if (response.status === 200) {
                    this.setState({

                    });
                }
            }).catch((error) => {
                this.setState({ error: 1 })
            });
        medication.getAll("GetAllOntozry/")
            .then((response) => {
                if (response.status === 200) {
                    this.setState({
                        listOntozry: response.data.dati,
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
        var list = [];
        var allergia = this.state.allergiesDTO;
        list = this.state.therapyDto.medicationAllergies;
        var id = this.state.therapyDto.medicationAllergies.length;
        allergia.id = id + 1;
        list.push(allergia);
        this.setState({ isOpenAllergic: false, allergiesDTO: { ...this.allergiesProps() } });
        /* patient.post("Allergy", this.state.allergiesDTO)
             .then((response) => {
                 if (response.status === 200) {
                     this.setState({
                         pharmacyPatients: response.data.dati,
                         isOpenAllergic: false
                     });
                 }
             }).catch((error) => {
                 this.setState({ error: 1 })
             });*/


    }
    deleteItem(el) {
        var listFilter = this.state.therapyDto.medicationAllergies.filter(x => x.id != el)
        this.updateState('medicationAllergies', listFilter, 'therapyDto');
        /*patient.delete("Allergy/", el)
            .then((response) => {
                if (response.status === 200) {
                    this.setState({
                        pharmacyPatients: response.data.dati,
                    });
                }
            }).catch((error) => {
                this.setState({ error: 1 })
            });*/
    }
    setCurrentPage = (n) => {
        this.setState({ currentPage: n });
    }

    handleCloseOtherPharmacy = () => {
        this.setState({ isOpenOtherPharmacy: false });
    }
    handleShowOtherPharmacy = () => {
        this.setState({ isOpenModalOntozry: true, isOntozryFlag: false });
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
    handleChangeStartDateMedication = (value, formattedValue) => {
        this.setState({
            dateNow: moment(value).format("DD/MM/YYYY"),
            formattedValue: formattedValue
        });
        this.updateState('dataInizio', moment(value).format("DD/MM/YYYY"), 'medicationDTO');
    }
    handleChangeEndDateMedication = (value, formattedValue) => {
        this.setState({
            dateNow: moment(value).format("DD/MM/YYYY"),
            formattedValue: formattedValue
        });
        this.updateState('dataFine', moment(value).format("DD/MM/YYYY"), 'medicationDTO');
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
    handleChangeTherapy = (el) => {
        let objName = el.target.alt;
        const inputName = el.target.name;
        const inputValue = el.target.value;
        this.updateState(inputName, inputValue, objName);
    };
    updateState = (inputName, inputValue, objName) => {
        let statusCopy = Object.assign({}, this.state);
        statusCopy[objName][inputName] = inputValue;
        this.setState(statusCopy);
    };
    openModalOntozry = () => {

        this.setState({ isOpenModalOntozry: true, isOntozryFlag: true });
    }
    handleClose = () => {
        this.setState({ isOpenModalOntozry: false, isOntozryFlag: false });
    }
    returnToMenu = () => {
        localStorage.removeItem('newPatient');
        window.location.href = "/Dashboard";
    }
    activeReminder = () => {
        const inputValue = this.state.medicationDTO.isActiveReminder ? false : true;
        this.updateState('isActiveReminder', inputValue, 'medicationDTO');
    }
    addOntozry = () => {
        var list = [];
        var farmaco = this.state.medicationDTO;

        var id = this.state.therapyDto.ontozryMedication.length;
        farmaco.id = id + 1;
        var list = this.state.therapyDto.ontozryMedication.push(farmaco);
        this.setState({ ontozryMedication: { list }, isOpenModalOntozry: false, medicationDTO: { ...this.farmaciProps() } });

    }
    addOther = () => {
        var list = [];
        var farmaco = this.state.medicationDTO;
        list = this.state.therapyDto.ontozryMedication;
        var id = this.state.therapyDto.otherMedication.length;
        farmaco.id = id + 1;
        list = this.state.therapyDto.otherMedication;
        list.push(farmaco);
        this.setState({ otherMedication: { list }, isOpenModalOntozry: false, medicationDTO: { ...this.farmaciProps() } });

    }
    handleChangeDosagio = (inputName) => {
        var formulaziones = {
            id: 1,
            formula: inputName.target.value,
            idFarmaco: 0,
        };
        this.updateState('dosagio', inputName.target.value, 'medicationDTO');
        this.updateState('formulazione', formulaziones, 'medicationDTO');
    }
    onChangeDrop = (inputName) => {
        const selected = inputName.target;
        const id = selected.children[selected.selectedIndex].id;
        var element = this.state.listOntozry.filter(x => x.id == id)
        var farmaciProps = {
            id: element[0].id,
            nome: element[0].formula,
            isOntozry: true
        },
            formulazione = {
                id: 1,
                formula: element[0].id,
                idFarmaco: element[0].id,
            }
        this.updateState('nome', farmaciProps.nome, 'medicationDTO');
        this.updateState('farmaco', farmaciProps, 'medicationDTO');
        this.updateState('formulazione', formulazione, 'medicationDTO');
    };
    deleteElementOnto = (el) => {
        var listFilter = this.state.therapyDto.ontozryMedication.filter(x => x.id != el)
        this.updateState('ontozryMedication', listFilter, 'therapyDto');
    }
    deleteElementOther = (el) => {
        var listFilter = this.state.therapyDto.otherMedication.filter(x => x.id != el)
        this.updateState('otherMedication', listFilter, 'therapyDto');
    }
    render() {
        const indexOfLastPatient = this.state.currentPage * this.state.patientsPerPage;
        const indexOfFirstPatient = indexOfLastPatient - this.state.patientsPerPage;
        const indexOfLastpharmacyPatient = this.state.currentPage * this.state.patientsPerPage;
        const indexOfFirstpharmacyPatient = indexOfLastPatient - this.state.patientsPerPage;
        const currentFarmaci = this.state.therapyDto.otherMedication.slice(indexOfFirstPatient, indexOfLastPatient);
        const pharmacyPatients = this.state.therapyDto.medicationAllergies.slice(indexOfFirstpharmacyPatient, indexOfLastpharmacyPatient);
        const currentItem = this.state.therapyDto.ontozryMedication.slice(indexOfFirstPatient, indexOfLastPatient);
        currentFarmaci.map((pa) => { pa.delete = 'delete'; });
        currentItem.map((pa) => { pa.delete = 'delete'; });
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
                                        <Button variant="btn btn-primary " onClick={() => this.returnToMenu()}>
                                            Indietro
                                        </Button>
                                    </Form.Group>
                                    <Form.Group className="col-4 mb-3" controlId="formBasicPassword">
                                        <Button variant="btn btn-primary  " >
                                            Avanti
                                        </Button>
                                    </Form.Group>
                                </Row>
                            </Form>
                        </Tab>
                        <Tab eventKey="ontozry" title="Ontozry">
                            <Row>
                                <Form.Group className="col-4 mb-3" controlId="formBasicPassword">
                                    <Button variant="btn btn-primary" onClick={() => this.openModalOntozry()}>
                                        Aggiungi
                                    </Button>
                                </Form.Group></Row>
                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th>Ontozry</th>
                                        <th>Quantita</th>
                                        <th>Data Inizio</th>
                                        <th>Data Fine</th>
                                        <th>Orario Assunzione</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        currentItem.map((pa) => <RowCustom colums={["nome", "quantitaPrescrizione", "dataInizio", "dataFine", "oraAssunzioneIndicata", "delete"]} elementDelete={"delete"} reference={'id'} delete={(el) => this.deleteElementOnto(el)} item={pa} />)
                                    }
                                </tbody>
                            </Table>
                            <Row>
                                <Form.Group className="col-4 mb-3" controlId="formBasicPassword">
                                    <Button variant="btn btn-primary" >
                                        Indietro
                                    </Button>
                                </Form.Group>
                                <Form.Group className="col-4 mb-3" controlId="formBasicPassword">
                                    <Button variant="btn btn-primary">
                                        Avanti
                                    </Button>
                                </Form.Group>
                            </Row>
                            <Modal
                                show={this.state.isOpenModalOntozry}
                                onHide={() => this.handleClose()}
                                backdrop="static"
                                keyboard={false}
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title>{this.state.isOntozryFlag ? 'Aggiungi Ontozry' : 'Aggiungi nuovi farmaci'}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Row className="col-12 mb-3">
                                        {!this.state.isOntozryFlag ?
                                            <Form.Group className={this.state.isOntozryFlag ? "col-6 mb-3" : "col-12 mb-3"} controlId="formBasicEmail">
                                                <Form.Label className="text-">{this.state.isOntozryFlag ? 'Ontozry' : 'Farmaco'} </Form.Label>
                                                <Form.Control id="nome" onChange={this.handleChangeTherapy} alt="medicationDTO" name="nome" placeholder="Inserisci farmaco" />
                                            </Form.Group>
                                            :
                                            <Form.Group className="col-6 mb-3 input-layout-wrapper" >
                                                <Form.Label className="text">Formualzione</Form.Label>
                                                <Form.Select onChange={(el) => this.onChangeDrop(el)} name="mendicalCenter" alt="medicoDTO" placeholder="Enter centro medico" >
                                                    <option id="0">Seleziona </option>
                                                    {this.state.listOntozry.filter(x => x.isOntozry != false).map((item) =>
                                                        <option id={item.id}>{item.formula}</option>
                                                    )}
                                                </Form.Select>
                                            </Form.Group>}
                                        {!this.state.isOntozryFlag ? <>
                                            <Form.Group className="col-6 mb-3" controlId="formBasicEmail">
                                                <Form.Label className="text-">Dosagio</Form.Label>
                                                <Form.Control id="quantitaPrescrizione" onChange={this.handleChangeDosagio} alt="medicationDTO" name="quantitaPrescrizione" placeholder="Inserisci farmaco" />
                                            </Form.Group>
                                            <Form.Group className="col-6 mb-3" controlId="formBasicEmail">
                                                <Form.Label className="text-">Quantita</Form.Label>
                                                <Form.Control id="quantitaPrescrizione" onChange={this.handleChangeTherapy} type='number' alt="medicationDTO" name="quantitaPrescrizione" placeholder="Inserisci farmaco" />
                                            </Form.Group>
                                        </>
                                            : <Form.Group className="col-6 mb-3" controlId="formBasicEmail">
                                                <Form.Label className="text-">Quantita</Form.Label>
                                                <Form.Control id="quantitaPrescrizione" onChange={this.handleChangeTherapy} type='number' alt="medicationDTO" name="quantitaPrescrizione" placeholder="Inserisci farmaco" />
                                            </Form.Group>}
                                    </Row>
                                    <Row className="col-14 mb-3">
                                        <Form.Group className="col-6 mb-3" >
                                            <Form.Label className="text">Data inizio terapia</Form.Label>
                                            <InputGroup className="mb-3">
                                                <Button variant="outline-secondary" className='bi bi-calendar-date-fill' id="button-addon1" />
                                                <div className='datepicker-wrapper-datemodal datepicker-wrapper-modal'>
                                                    <DatePicker id='startTherapy' name={'startTherapy'} aria-label="Example text with button addon"
                                                        aria-describedby="basic-addon1" className=' form-control bi bi-calendar-date-fill' value={this.state.medicationDTO.dataInizio} onChange={this.handleChangeStartDateMedication} />
                                                </div>
                                            </InputGroup>
                                        </Form.Group>
                                        <Form.Group className="col-6 mb-3" >
                                            <Form.Label className="text">Data fine terapia</Form.Label>
                                            <InputGroup className="mb-3">
                                                <Button variant="outline-secondary" className='bi bi-calendar-date-fill' id="button-addon1" />
                                                <div className='datepicker-wrapper-datemodal datepicker-wrapper-modal'>
                                                    <DatePicker id='startTherapy' name={'startTherapy'} aria-label="Example text with button addon"
                                                        aria-describedby="basic-addon1" className=' form-control bi bi-calendar-date-fill' value={this.state.medicationDTO.dataFine} onChange={this.handleChangeEndDateMedication} />
                                                </div>
                                            </InputGroup>
                                        </Form.Group>
                                    </Row>
                                    <Row className="col-12 mb-3">

                                        <Form.Group className="col-6 mb-3" controlId="formBasicEmail">
                                            <Form.Label className="text-">Orario  consigliato assunzione {this.state.isOntozryFlag ? 'Ontozry' : ''} </Form.Label>
                                            <Form.Control id="oraAssunzioneIndicata" onChange={this.handleChangeTherapy} alt="medicationDTO" name="oraAssunzioneIndicata" placeholder="Inserisci farmaco" />
                                        </Form.Group>
                                        <Form.Group className="col-2 mb-3" controlId="formBasicEmail">
                                            <Form.Label className="text-">Promemoria Terapie</Form.Label>
                                            <Form.Check
                                                type="switch"
                                                defaultChecked={this.state.medicationDTO.isActiveReminder}
                                                id="custom-switch"
                                                onClick={() => this.activeReminder()}
                                                label={!this.state.medicationDTO.isActiveReminder ? 'No' : 'Si'}
                                            />
                                        </Form.Group>
                                    </Row>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={() => this.handleClose()}>
                                        Chiudi
                                    </Button>
                                    {this.state.isOntozryFlag ?
                                        <Button variant="primary" onClick={() => this.addOntozry()}>{'Aggiungi'}</Button> :
                                        <Button variant="primary" onClick={() => this.addOther()}>{'Aggiungi'}</Button>}

                                </Modal.Footer>
                            </Modal>
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
                                        <Form.Group className="col-8 mb-3" controlId="formBasicEmail">
                                            <Form.Label className="text-">Farmaco</Form.Label>
                                            <Form.Control name="farmaco" placeholder="Inserisci farmaco" onChange={this.handleChangeTherapy} />
                                        </Form.Group>
                                        <Form.Group className="col-2 mb-3" controlId="formBasicEmail">
                                            <Form.Label className="text-">Promemoria Terapie</Form.Label>
                                            <Form.Check
                                                type="switch"
                                                defaultChecked={this.state.medicationDTO.isActiveReminder}
                                                id="custom-switch"
                                                onClick={() => this.activeReminder()}
                                                label={!this.state.medicationDTO.isActiveReminder ? 'No' : 'Si'}
                                            />
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group className="col-6 mb-3" controlId="formBasicEmail">
                                            <Form.Label className="text-">Doagio</Form.Label>
                                            <Form.Control name="dosagio" placeholder="Inserisci Dosagio" onChange={this.handleChangeTherapy} />
                                        </Form.Group>
                                        <Form.Group className="col-6 mb-3" controlId="formBasicEmail">
                                            <Form.Label className="text-">Quantita</Form.Label>
                                            <Form.Control name="quantita" placeholder="Inserisci quantita" onChange={this.handleChangeTherapy} />
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
                                                            aria-describedby="basic-addon1" className=' form-control bi bi-calendar-date-fill' value={this.state.dateNow} onChange={this.handleChangeStartDateMedication} />
                                                    </div>
                                                </InputGroup>
                                            </Form.Group>
                                            <Form.Group className="col-6 mb-3" >
                                                <Form.Label className="text">Data fine terapia</Form.Label>
                                                <InputGroup className="mb-3">
                                                    <Button variant="outline-secondary" className='bi bi-calendar-date-fill' id="button-addon1" />
                                                    <div className='datepicker-wrapper-datemodal datepicker-wrapper-modal'>
                                                        <DatePicker id='endTherapy' name={'endTherapy'} aria-label="Example text with button addon"
                                                            aria-describedby="basic-addon1" className=' form-control bi bi-calendar-date-fill' value={this.state.dateNow} onChange={this.handleChangeEndDateMedication} />
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
                                    <Button variant="btn btn-primary" onClick={() => this.handleShowOtherPharmacy()}>
                                        Aggiungi
                                    </Button>
                                </Form.Group></Row>
                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th>Farmaco</th>
                                        <th>Dosagio</th>
                                        <th>Quantita</th>
                                        <th>Data Inizio</th>
                                        <th>Data Fine</th>
                                        <th>Orario Assunzione</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        currentFarmaci.map((pa) => <RowCustom colums={["nome", "dosagio", "quantitaPrescrizione", "dataInizio", "dataFine", "oraAssunzioneIndicata", "delete"]} elementDelete={"delete"} reference={'id'} delete={(el) => this.deleteElementOther(el)} item={pa} />)
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
                                    <Button variant="btn btn-primary">
                                        Indietro
                                    </Button>
                                </Form.Group>
                                <Form.Group className="col-4 mb-3" controlId="formBasicPassword">
                                    <Button variant="btn btn-primary">
                                        Avanti
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
                                    <Button variant="btn btn-primary" onClick={() => this.handleShowAllergic()}>
                                        Aggiungi
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
                                        pharmacyPatients.map((pa) => <PatientAllergyRow key={pa.id} allergy={pa.nomeFarmaco} delete={(el) => this.deleteItem(el)} id={pa.id} />)
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
                                    <Button variant="btn btn-primary">
                                        Indietro
                                    </Button>
                                </Form.Group>
                                <Form.Group className="col-4 mb-3" controlId="formBasicPassword">
                                    <Button variant="btn btn-primary bi-cloud-check" >
                                        Salva Terapia
                                    </Button>
                                </Form.Group>
                            </Row>
                        </Tab>
                        <Tab eventKey="storicoTerapie" title="Storico Terapie" >

                        </Tab>
                    </Tabs>
                </Row></Container>
        );
        // }
    }
}

export default NewTherapy;
