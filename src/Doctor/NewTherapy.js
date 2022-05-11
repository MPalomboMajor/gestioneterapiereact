import React, { Component, useState, useEffect } from 'react';
import { Tabs, Tab, Container, Form, Row, InputGroup, Button, FormControl, Table, Modal } from 'react-bootstrap';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { RowCustom } from "./PatientComponent"
import { medico, pianoterapeutico, patient, medication } from '../helpers/api/api';
import DatePicker from "react-datepicker";
import { entitiesLabels, message } from '../helpers/Constants';
import { PatientRow, PatientAllergyRow } from "./PatientComponent";
import moment from 'moment';
import Pagination from '../helpers/pagination';

export class NewTherapy extends Component {
    allergiesProps = () => ({
        id: 0,
        nomeFarmaco: "",
        idPatientProfile: parseInt(window.location.pathname.split('/').pop())
    })
    farmaciProps = () => ({
        id: 0,
        quantitaPrescrizione: 0,
        oraAssunzioneIndicata: 0,
        dataFine: null,
        dataInizio: null,
        isActiveReminder: false,
        idPianoTerapeutico: 1,
        formulazione: {
            id: 0,
            formula: 0,
            idFarmaco: 0,
            isStandard: false,
            farmaco: {
                id: 0,
                nome: '',
                isOntozry: false
            }
        }
    })
    constructor(props) {
        super(props);
        this.state = {
            linkTab: 'ontozry',
            listOntozry: [],
            listOtherPharmacy: [],
            isOntozryFlag: false,
            aderenze: [],
            dateNow: '',
            isNewPatient: localStorage.getItem('newPatient'),
            patients: [],
            pharmacyPatients: [],
            currentPage: 1,

            patientsPerPage: 5,
            //STATE PAGINATION Ontozry
            currentOntozryPage: 1,
            ontozryPerPage: 5,
            //STATE PAGINATION OTHER MEDICATION
            currentOtherPage: 1,
            otherMedicationPerPage: 5,
            //STATE PAGINATION Allergies
            currentAllergiesPage: 1,
            allergiesPerPage: 5,
            //STATE PAGINATION storico
            currentStoricoPage: 1,
            storicoPerPage: 2,
            //STATE PAGINATION afderenze
            currentAderenzePage: 1,
            aderenzePerPage: 5,

            storicPlan: [],
            allergiesDTO: { ...this.allergiesProps() },
            isOpenAllergic: false,
            isOpenModalOntozry: false,
            isOtherOntozry: false,
            therapyDto: {

                therapeuticPlan: {
                    id: 0,

                    versione: 0,
                    maxReminderNotification: 0,
                    dataPrescrizione: moment(new Date()).format("DD/MM/YYYY"),
                    inizioTerapia: null,
                    dataFineTerapia: null,
                    motivoFineTerapia: "",
                    idDoctor: JSON.parse(localStorage.getItem("role")).id,
                    idPatientProfile: parseInt(window.location.pathname.split('/').pop()),
                    elencoFarmaciPrescritti: [],
                },
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
        medication.getAll("GetAll/")
            .then((response) => {
                if (response.status === 200) {
                    var listOntozryInfo = response.data.dati.filter((x) => x.isOntozry == true);
                    var listOtherPharmacyInfo = response.data.dati.filter((x) => x.isOntozry != true);
                    this.setState({
                        listOntozry: listOntozryInfo[0].elencoFormulazioni,
                        listOtherPharmacy: listOtherPharmacyInfo
                    });
                }
            }).catch((error) => {
                NotificationManager.error(message.ErrorServer, entitiesLabels.ERROR, 3000);
            });
        patient.get("GetAllergies/", window.location.pathname.split('/').pop())
            .then((response) => {
                if (response.status === 200) {
                    this.setState({
                        pharmacyPatients: response.data.dati,
                    });
                }
            }).catch((error) => {
                NotificationManager.error(message.ErrorServer, entitiesLabels.ERROR, 3000);
            });
        pianoterapeutico.get("Get/", parseInt(window.location.pathname.split('/').pop()))
            .then((response) => {
                if (response.status === 200 && response.data.dati != null) {

                    this.setState({
                        therapyDto: response.data.dati,
                    });
                }
            }).catch((error) => {
                this.setState({ error: 1 })
            });
        pianoterapeutico.get("Storico/", parseInt(window.location.pathname.split('/').pop()))
            .then((response) => {
                if (response.status === 200) {
                    this.setState({
                        storicPlan: response.data.dati,
                    });
                }
            }).catch((error) => {
                NotificationManager.error(message.ErrorServer, entitiesLabels.ERROR, 3000);
            });
        pianoterapeutico.get("Adherence/", parseInt(window.location.pathname.split('/').pop()))
            .then((response) => {
                if (response.status === 200) {
                    this.setState({
                        aderenze: response.data.dati,
                    });
                }
            }).catch((error) => {
                NotificationManager.error(message.ErrorServer, entitiesLabels.ERROR, 3000);
            });
    }
    //FUNZIONI POST
    updateTherapy = () => {
        this.state.therapyDto.ontozryMedication.map((el) =>
            el.id != 0 ? el.id = 0 : ''
        )
        this.state.therapyDto.otherMedication.map((el) =>
            el.id != 0 ? el.id = 0 : ''
        )

        this.state.therapyDto.therapeuticPlan.id = 0;
        pianoterapeutico.post("SaveCompleteTherapy", this.state.therapyDto)
            .then((response) => {
                if (response.status === 200) {
                    if (response.data.dati.statoesito != 1) {
                        NotificationManager.success(message.TERAPIA + message.SuccessInsert, entitiesLabels.SUCCESS, 3000);
                        this.setState({
                            therapyDto: response.data.dati,
                        });
                        pianoterapeutico.get("Storico/", parseInt(window.location.pathname.split('/').pop()))
                            .then((response) => {
                                if (response.status === 200) {
                                    this.setState({
                                        storicPlan: response.data.dati,
                                    });
                                }
                            }).catch((error) => {
                                NotificationManager.error(message.ErrorServer, entitiesLabels.ERROR, 3000);
                            });
                    } else {
                        NotificationManager.error(message.ErrorServer, entitiesLabels.ERROR, 3000);
                    }
                }
            }).catch((error) => {
                NotificationManager.error(message.ErrorServer, entitiesLabels.ERROR, 3000);
            });
    }
    AddAllergies = () => {
        if (this.state.therapyDto.idPatientProfile != 0) {
            let updateDTO = this.state.allergiesDTO;
            updateDTO.idPatientProfile = this.state.therapyDto.therapeuticPlan.idPatientProfile;
        }
        var list = [];
        var allergia = this.state.allergiesDTO;
        list = this.state.therapyDto.medicationAllergies;
        var id = this.state.therapyDto.medicationAllergies.length;
        allergia.id = id + 1;
        list.push(allergia);
        this.setState({ isOpenAllergic: false, allergiesDTO: { ...this.allergiesProps() } });
    }
    deleteItem(el) {
        var listFilter = this.state.therapyDto.medicationAllergies.filter(x => x.id != el)
        this.updateState('medicationAllergies', listFilter, 'therapyDto');
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
            dateNow: moment(value.target.value).format("DD/MM/YYYY"),
            formattedValue: formattedValue
        });
        var plan = this.state.therapyDto.therapeuticPlan;
        plan.dataFineTerapia = moment(value.target.value).format("DD/MM/YYYY");
        this.updateState('therapeuticPlan', plan, 'therapyDto');
    }
    handleChangeStartDateMedication = (value, formattedValue) => {
        this.setState({
            dateNow: value.target.value,
            formattedValue: formattedValue
        });
        this.updateState('dataInizio', moment(value.target.value).format("DD/MM/YYYY"), 'medicationDTO');
    }
    handleChangeEndDateMedication = (value, formattedValue) => {
        this.setState({
            dateNow: value.target.value,
            formattedValue: formattedValue
        });
        this.updateState('dataFine', moment(value.target.value).format("DD/MM/YYYY"), 'medicationDTO');
    }
    handleChangeNote = (el) => {
        var plan = this.state.therapyDto.therapeuticPlan;
        plan.motivoFineTerapia = el.target.value;
        this.updateState('therapeuticPlan', plan, 'therapyDto');
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
    handleChangeIntTherapy = (el) => {
        let objName = el.target.alt;
        const inputName = el.target.name;
        const inputValue = el.target.value;
        this.updateState(inputName, parseInt(inputValue), objName);
    };
    handleChangeIntTimeTherapy = (el) => {
        let objName = el.target.alt;
        const inputName = el.target.name;
        const inputValue = el.target.value;
        this.updateState('oraAssunzioneIndicata', parseInt(inputValue), 'medicationDTO');
    };
    updateState = (inputName, inputValue, objName) => {
        let statusCopy = Object.assign({}, this.state);
        statusCopy[objName][inputName] = inputValue;
        this.setState(statusCopy);
    };
    updateStateOnt = (inputName, inputValue, objName) => {
        let statusCopy = Object.assign({}, this.state);
        if (inputValue.farmaco.id == 0) {

            statusCopy.isOtherOntozry = true;
        } else {
            statusCopy.isOtherOntozry = false;
        }

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
        window.location.href = "/PatientProfile/"+window.location.pathname.split('/').pop();
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
        farmaco.id = 0;
        list = this.state.therapyDto.otherMedication;
        list.push(farmaco);
        this.setState({ otherMedication: { list }, isOpenModalOntozry: false, medicationDTO: { ...this.farmaciProps() } });

    }
    handleChangeDosaggio = (inputName) => {
        var formulaziones = this.state.medicationDTO.formulazione;
        formulaziones.formula = inputName.target.value;
        this.updateState('formulazione', formulaziones, 'medicationDTO');
    }
    handleChangeNameFarmaco = (inputName) => {
        var formulaziones = this.state.medicationDTO.formulazione;
        formulaziones.farmaco.nome = inputName.target.value;
        this.updateState('formulazione', formulaziones, 'medicationDTO');
    }
    onChangeDrop = (inputName) => {
        const selected = inputName.target;
        if (inputName.target.value == "Altra formulazione") {
            var isOtherOntozry = true;
        }
        if (inputName.target.value == "Seleziona") {
            var isOtherOntozry = false;
        }
        if (!isOtherOntozry) {
            if (inputName.target.value != "Seleziona") {
                let id = selected.children[selected.selectedIndex].id;
                var element = this.state.listOntozry.filter(x => x.id == id)
                var formulazione = {
                    id: 0,
                    formula: element[0].formula,
                    idFarmaco: 0,
                    isStandard: true,
                    farmaco: {
                        id: element[0].id,
                        nome: 'Ontozry',
                        isOntozry: true
                    }
                }
            } else {
                var formulazione = {
                    id: 0,
                    formula: '',
                    idFarmaco: 0,
                    isStandard: false,
                    farmaco: {
                        id: -1,
                        nome: 'Ontozry',
                        isOntozry: true
                    }
                }
            }
        } else {

            var formulazione = {
                id: 0,
                formula: '',
                idFarmaco: 0,
                farmaco: {
                    id: 0,
                    nome: 'Ontozry',
                    isOntozry: true
                }
            }

        }

        this.updateStateOnt('formulazione', formulazione, 'medicationDTO');
    };
    onChangeDropOther = (inputName) => {
        const selected = inputName.target;

        let id = selected.children[selected.selectedIndex].id;
        var element = this.state.listOtherPharmacy.filter(x => x.id == id)
        var formulazione = {
            id: 0,
            formula: element[0].formula,
            idFarmaco: 0,
            farmaco: {
                id: element[0].id,
                nome: element[0].nome,
                isOntozry: true
            }
        }
        this.updateStateOnt('formulazione', formulazione, 'medicationDTO');
    };
    deleteElementOnto = (el) => {
        var listFilter = this.state.therapyDto.ontozryMedication.filter(x => x.id != el)
        this.updateState('ontozryMedication', listFilter, 'therapyDto');
    }
    deleteElementOther = (el) => {
        var listFilter = this.state.therapyDto.otherMedication.filter(x => x.id != el)
        this.updateState('otherMedication', listFilter, 'therapyDto');
    }
    selectTab = (e) => {
        this.setState({ linkTab: e });
    }
    setCurrentPage = (n) => {
        this.setState({ currentPage: n });
    }
    setPrevPage = (n) => {
        this.setState({ currentPage: n - 1 });
    }
    setNexPage = (n) => {
        this.setState({ currentPage: n + 1 });
    }
    //Ontozry Pagination
    setCurrentOntozryPage = (n) => {
        this.setState({ currentOntozryPage: n });
    }
    setPrevOntozryPage = (n) => {
        this.setState({ currentOntozryPage: n - 1 });
    }
    setNexOntozryPage = (n) => {
        this.setState({ currentOntozryPage: n + 1 });
    }
    //OTHERPAGINATION
    setCurrentOtherPage = (n) => {
        this.setState({ currentOtherPage: n });
    }
    setPrevOtherPage = (n) => {
        this.setState({ currentOtherPage: n - 1 });
    }
    setNexOtherPage = (n) => {
        this.setState({ currentOtherPage: n + 1 });
    }
    //Allergies PAGINATION
    setCurrentAllergiesPage = (n) => {
        this.setState({ currentAllergiesPage: n });
    }
    setPrevAllergiesPage = (n) => {
        this.setState({ currentAllergiesPage: n - 1 });
    }
    setNexAllergiesPage = (n) => {
        this.setState({ currentAllergiesPage: n + 1 });
    }
    //Storico PAGINATION
    setCurrentStoricoPage = (n) => {
        this.setState({ currentStoricoPage: n });
    }
    setPrevStoricoPage = (n) => {
        this.setState({ currentStoricoPage: n - 1 });
    }
    setNexStoricoPage = (n) => {
        this.setState({ currentStoricoPage: n + 1 });
    }
    //Aderenze PAGINATION
    setCurrentAderenzePage = (n) => {
        this.setState({ currentAderenzePage: n });
    }
    setPrevAderenzePage = (n) => {
        this.setState({ currentAderenzePage: n - 1 });
    }
    setNexAderenzePage = (n) => {
        this.setState({ currentAderenzePage: n + 1 });
    }
    render() {
        //PAGINATION OTHER MERDICATION
        const indexOfLastOther = this.state.currentOtherPage * this.state.otherMedicationPerPage;
        const indexOfFirstOther = indexOfLastOther - this.state.otherMedicationPerPage;
        const currentFarmaci = this.state.therapyDto.otherMedication.slice(indexOfFirstOther, indexOfLastOther);
        //PAGINATION Ontozry
        const indexOfLastOntozry = this.state.currentOntozryPage * this.state.ontozryPerPage;
        const indexOfFirstOntozry = indexOfLastOntozry - this.state.ontozryPerPage;
        const currentItem = this.state.therapyDto.ontozryMedication.slice(indexOfFirstOntozry, indexOfLastOntozry);
        //PAGINATION Allergie
        const indexOfLastAllergies = this.state.currentAllergiesPage * this.state.allergiesPerPage;
        const indexOfFirstAllergies = indexOfLastAllergies - this.state.allergiesPerPage;
        const pharmacyPatients = this.state.therapyDto.medicationAllergies.slice(indexOfFirstAllergies, indexOfLastAllergies);
        //PAGINATION Storico
        const indexOfLastStorico = this.state.currentStoricoPage * this.state.storicoPerPage;
        const indexOfFirstStorico = indexOfLastStorico - this.state.storicoPerPage;
        const currentstoric = this.state.storicPlan ? this.state.storicPlan.slice(indexOfFirstStorico, indexOfLastStorico) : [];
        //PAGINATION Aderenze
        const indexOfLastAderenze= this.state.currentAderenzePage * this.state.aderenzePerPage;
        const indexOfFirstAderenze = indexOfLastAderenze - this.state.aderenzePerPage;
        const adherences =  this.state.aderenze ?this.state.aderenze.slice(indexOfFirstAderenze, indexOfLastAderenze) : [];


        const indexOfLastPatient = this.state.currentPage * this.state.patientsPerPage;
        const indexOfFirstPatient = indexOfLastPatient - this.state.patientsPerPage;
        const indexOfLastpharmacyPatient = this.state.currentPage * this.state.patientsPerPage;
        const indexOfFirstpharmacyPatient = indexOfLastPatient - this.state.patientsPerPage;



        currentFarmaci.map((pa) => { pa.delete = 'delete'; });
        currentItem.map((pa) => { pa.delete = 'delete'; });
        return (<>
            <h1 class="h1">Crea / Modifica terapia</h1>
            <Tabs defaultActiveKey="ontozry" activeKey={this.state.linkTab} onSelect={(k) => this.selectTab(k)} id="uncontrolled-tab-example" className=" nav secondary-menu mb-4" >

                <Tab eventKey="ontozry" title="Ontozry">
                    <Row>
                        <Form.Group className="col-4 mb-3" >
                            <Button variant="btn btn-primary" onClick={() => this.openModalOntozry()}>
                                Aggiungi
                            </Button>
                        </Form.Group></Row>
                    <div className="table-wrapper">
                        <Table className="table custom">
                            <thead>
                                <tr>
                                    <th>Ontozry</th>
                                    <th>Quantità</th>
                                    <th>Data Inizio</th>
                                    <th>Data Fine</th>
                                    <th>Orario Assunzione</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    currentItem.map((pa) => <RowCustom colums={["formulazione.formula", "quantitaPrescrizione", "dataInizio", "dataFine", "oraAssunzioneIndicata", "delete"]} elementDelete={"delete"} reference={'id'} delete={(el) => this.deleteElementOnto(el)} item={pa} />)
                                }
                            </tbody>
                        </Table>
                    </div>
                    <Pagination
                        patientsPerPage={this.state.ontozryPerPage}
                        totalPatients={this.state.therapyDto.ontozryMedication?.length}
                        paginate={(pageNumber) => this.setCurrentOntozryPage(pageNumber)}
                        currentPage={this.state.currentOntozryPage}
                        prevPage={(pageNumber) => this.setPrevOntozryPage(pageNumber)}
                        nextPage={(pageNumber) => this.setNexOntozryPage(pageNumber)}
                    />
                    <Row>
                        <Form.Group className="col-4 mb-3" >
                            <Button variant="btn  btn-secondary" onClick={() => this.returnToMenu()}>
                                Indietro
                            </Button>
                        </Form.Group>
                        <Form.Group className="col-4 mb-3" >
                            <Button variant="btn btn-primary" onClick={(k) => this.selectTab('altriFarmaci')} >
                                Avanti
                            </Button >
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
                                    <Form.Group className="col-6 mb-3 input-layout-wrapper" >
                                        <Form.Label className="text">Formulazione</Form.Label>
                                        <Form.Select onChange={(el) => this.onChangeDropOther(el)} name="mendicalCenter" alt="medicoDTO" placeholder="Enter centro medico" >
                                            <option id="0">Seleziona </option>

                                            {this.state.listOtherPharmacy.map((item) =>
                                                <option id={item.id}>{item.nome}</option>
                                            )}
                                        </Form.Select>
                                    </Form.Group>
                                    :
                                    <Form.Group className="col-6 mb-3 input-layout-wrapper" >
                                        <Form.Label className="text">Formulazione</Form.Label>
                                        <Form.Select onChange={(el) => this.onChangeDrop(el)} name="mendicalCenter" alt="medicoDTO" placeholder="Enter centro medico" >
                                            <option id="0">Seleziona </option>

                                            {this.state.listOntozry.filter(x => x.isOntozry != false && x.isStandard == true).map((item) =>
                                                <option id={item.id}>{item.formula}</option>
                                            )}
                                            <option id="OTHER">Altra formulazione</option>
                                        </Form.Select>
                                    </Form.Group>}
                                {!this.state.isOntozryFlag ? <React.Fragment >
                                    <Form.Group className="col-6 mb-3" >
                                        <Form.Label className="text-">Dosaggio</Form.Label>
                                        <Form.Control id="quantitaPrescrizione" onChange={this.handleChangeDosaggio} alt="medicationDTO" name="quantitaPrescrizione" placeholder="Inserisci dosaggio" />
                                    </Form.Group>
                                    <Form.Group className="col-6 mb-3" >
                                        <Form.Label className="text-">Quantità</Form.Label>
                                        <Form.Control id="quantitaPrescrizione" onChange={this.handleChangeIntTherapy} type='number' alt="medicationDTO" name="quantitaPrescrizione" placeholder="Inserisci quantità" />
                                    </Form.Group>
                                </React.Fragment>
                                    : <React.Fragment >
                                        {this.state.isOtherOntozry ?
                                            <Form.Group className="col-6 mb-3" >
                                                <Form.Label className="text-">Formulazione personalizzata</Form.Label>
                                                <Form.Control id="formulazioneOnt" type='number' onChange={this.handleChangeDosaggio} alt="medicationDTO" name="quantitaPrescrizione" placeholder="Formulazione personalizzata" />
                                            </Form.Group>
                                            : ''}
                                    </React.Fragment>
                                }
                            </Row>
                            {this.state.isOntozryFlag ? <React.Fragment >
                                <Row className="col-14 mb-3">
                                    <Form.Group className="col-6 mb-3" >
                                        <Form.Label className="text-">Quantità</Form.Label>
                                        <Form.Control id="quantitaPrescrizione" onChange={this.handleChangeIntTherapy} type='number' alt="medicationDTO" name="quantitaPrescrizione" placeholder="Inserisci quantità" />
                                    </Form.Group>
                                </Row>
                            </React.Fragment> : ''}
                            <Row className="col-16 mb-3">
                                <Form.Group className="col-8 mb-3" >
                                    <div class="input-group mb-3 w-sm-50">
                                        <span class="input-group-text" id="label-data">Data Inizio terapia</span>
                                        <input type="date" name={'startTherapy'} class="form-control form-control-sm" id="startTherapy" aria-describedby="label-data" onChange={this.handleChangeStartDateMedication}></input>
                                    </div>
                                </Form.Group>
                                <Form.Group className="col-8 mb-3" >
                                    <div class="input-group mb-3 w-sm-50">
                                        <span class="input-group-text" id="label-data">Data fine terapia</span>
                                        <input type="date" name={'endTherapy'} class="form-control form-control-sm" id="endTherapy" aria-describedby="label-data" onChange={this.handleChangeEndDateMedication}></input>
                                    </div>
                                </Form.Group>
                            </Row>
                            <Row className="col-12 mb-3">
                                <Form.Group className="col-6 mb-3" >
                                    <Form.Label className="text-">Orario consigliato assunzione {this.state.isOntozryFlag ? 'Ontozry' : ''} </Form.Label>
                                    <Form.Select id="oraAssunzioneIndicata" onChange={this.handleChangeIntTimeTherapy} alt="medicationDTO" name="oraAssunzioneIndicata" placeholder="Inserisci orario" >
                                        <option></option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                        <option value="11">11</option>
                                        <option value="12">12</option>
                                        <option value="13">13</option>
                                        <option value="14">14</option>
                                        <option value="15">15</option>
                                        <option value="16">16</option>
                                        <option value="17">17</option>
                                        <option value="18">18</option>
                                        <option value="19">19</option>
                                        <option value="20">20</option>
                                        <option value="21">21</option>
                                        <option value="22">22</option>
                                        <option value="23">23</option>
                                        <option value="24">24</option>
                                    </Form.Select>
                                </Form.Group>
                                {/* <Form.Group className="col-6 mb-3" >
                                    <Form.Label className="text-">Orario consigliato assunzione {this.state.isOntozryFlag ? 'Ontozry' : ''} </Form.Label>
                                    <Form.Control id="oraAssunzioneIndicata" onChange={this.handleChangeIntTherapy} alt="medicationDTO" name="oraAssunzioneIndicata" placeholder="Inserisci orario" />
                                </Form.Group> */}
                                <Form.Group className="col-2 mb-3" >
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
                <Tab eventKey="altriFarmaci" title="Altri antiepilettici" >
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
                                <Form.Group className="col-8 mb-3" >
                                    <Form.Label className="text-">Farmaco</Form.Label>
                                    <Form.Control name="farmaco" placeholder="Inserisci farmaco" onChange={this.handleChangeTherapy} />
                                </Form.Group>
                                <Form.Group className="col-2 mb-3" >
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
                                <Form.Group className="col-6 mb-3" >
                                    <Form.Label className="text-">Dosaggio</Form.Label>
                                    <Form.Control name="dosaggio" placeholder="Inserisci dosaggio" onChange={this.handleChangeTherapy} />
                                </Form.Group>
                                <Form.Group className="col-6 mb-3" >
                                    <Form.Label className="text-">Quantità</Form.Label>
                                    <Form.Control name="quantita" placeholder="Inserisci quantità" onChange={this.handleChangeTherapy} />
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
                        <Form.Group className="col-4 mb-3" >
                            <Button variant="btn btn-primary" onClick={() => this.handleShowOtherPharmacy()}>
                                Aggiungi
                            </Button>
                        </Form.Group></Row>
                    <div className="table-wrapper">
                        <Table className="table custom">
                            <thead>
                                <tr>
                                    <th>Farmaco</th>
                                    <th>Dosaggio</th>
                                    <th>Quantità</th>
                                    <th>Data Inizio</th>
                                    <th>Data Fine</th>
                                    <th>Orario Assunzione</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    currentFarmaci.map((pa) => <RowCustom id={pa.id} colums={["formulazione.farmaco.nome", "formulazione.formula", "quantitaPrescrizione", "dataInizio", "dataFine", "oraAssunzioneIndicata", "delete"]} elementDelete={"delete"} reference={'id'} delete={(el) => this.deleteElementOther(el)} item={pa} />)
                                }
                            </tbody>
                        </Table>
                    </div>
                    <Pagination
                        patientsPerPage={this.state.otherMedicationPerPage}
                        totalPatients={this.state.therapyDto?.otherMedication?.length}
                        paginate={(pageNumber) => this.setCurrentOtherPage(pageNumber)}
                        currentPage={this.state.currentOtherPage}
                        prevPage={(pageNumber) => this.setPrevOtherPage(pageNumber)}
                        nextPage={(pageNumber) => this.setNexOtherPage(pageNumber)}
                    />
                    <Row>
                        <Form.Group className="col-4 mb-3" >
                            <Button variant="btn btn-secondary" onClick={(k) => this.selectTab('ontozry')}>
                                Indietro
                            </Button>
                        </Form.Group>
                        <Form.Group className="col-4 mb-3" >
                            <Button variant="btn btn-primary" onClick={(k) => this.selectTab('allergieFarmaci')}>
                                Avanti
                            </Button>
                        </Form.Group>
                    </Row>
                </Tab>
                <Tab eventKey="allergieFarmaci" title="Allergie e farmaci" >
                    <Modal
                        show={this.state.isOpenAllergic}
                        onHide={() => this.handleCloseAllergic()}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Aggiungi nome farmaco o molecola a cui è allergico l'assistito</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Row>
                                <Form.Group className="col-12 mb-3" >
                                    <Form.Label className="text-">Nome farmaco o molecola</Form.Label>
                                    <Form.Control id="nomeFarmaco" onChange={this.handleChangeFarmaco} alt="allergiesDTO" name="nomeFarmaco" placeholder="Inserisci nome farmaco o molecola" />
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
                        <Form.Group className="col-4 mb-3" >
                            <Button variant="btn btn-primary" onClick={() => this.handleShowAllergic()}>
                                Aggiungi
                            </Button>
                        </Form.Group></Row>
                    <div className="table-wrapper">
                        <Table className="table custom">
                            <thead>
                                <tr>
                                    <th>Farmaco a cui è allergico l'assistito</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    pharmacyPatients.map((pa) => <PatientAllergyRow key={pa.id} allergy={pa.nomeFarmaco} delete={(el) => this.deleteItem(el)} id={pa.id} />)
                                }
                            </tbody>
                        </Table>
                    </div>
                    <Pagination
                        patientsPerPage={this.state.allergiesPerPage}
                        totalPatients={this.state.therapyDto.medicationAllergies?.length}
                        paginate={(pageNumber) => this.setCurrentAllergiesPage(pageNumber)}
                        currentPage={this.state.currentAllergiesPage}
                        prevPage={(pageNumber) => this.setPrevAllergiesPage(pageNumber)}
                        nextPage={(pageNumber) => this.setNexAllergiesPage(pageNumber)}
                    />
                    <Row>
                        <Form.Group className="col-4 mb-3" >
                            <Button variant="btn btn-secondary" onClick={(k) => this.selectTab('altriFarmaci')}>
                                Indietro
                            </Button>
                        </Form.Group>
                        <Form.Group className="col-4 mb-3" >
                            <Button variant="btn btn-primary " onClick={() => this.updateTherapy()} >
                                Salva
                            </Button>
                        </Form.Group>
                    </Row>
                </Tab>
                {this.state.isNewPatient ? '' :

                    <Tab eventKey="terapia" title="Cessazione Terapia">

                        <Form className="">
                            <Row>
                                <Form.Group className="col-6 mb-3" >
                                    <div class="input-group mb-3 w-sm-50">
                                        <span class="input-group-text" id="label-data">Data fine terapia</span>
                                        <input type="date" class="form-control form-control-sm" id="endTherapy" aria-describedby="label-data" onChange={this.handleChange}></input>
                                    </div>
                                </Form.Group>
                            </Row>
                            <Row>
                                <div class="box">
                                    <div class="label label-secondary">Motivo fine terapia</div>
                                    <FormControl as="textarea" aria-label="With textarea" id="motivoFineTerapia" className="text-area-custom" onChange={this.handleChangeNote} name="motivoFineTerapia" />
                                </div>
                            </Row>
                            <Row>
                                <Form.Group className="col-4 mb-3" >
                                    <Button variant="btn btn-primary" onClick={() => this.updateTherapy()} >
                                        Salva
                                    </Button>
                                </Form.Group>
                            </Row>
                        </Form>
                    </Tab>}
                {this.state.isNewPatient ? '' :
                    <Tab eventKey="storicoTerapie" title="Storico terapie" >
                        <Row>
                            <div className="table-wrapper col-8 custom-th">
                                <Table className="table custom">
                                    <thead>
                                        <tr>
                                            <th>Farmaco</th>
                                            <th>Formula</th>
                                            <th>Quantità</th>
                                            <th>Data Inizio</th>
                                            <th>Data Fine</th>
                                        </tr>
                                    </thead>
                                </Table>
                            </div>
                            {
                                currentstoric.map((el) =>
                                    <Row className='pb-2 mb-5'>
                                        <div className='col-2 custom-td'>
                                            <span className="label label-primary">{el.nameDoctor}</span>
                                        </div>
                                        <div className="table-wrapper col-8">
                                            <Table className="table custom">
                                                <tbody>
                                                    {
                                                        el.elencoFarmaciPrescritti != [] ? el.elencoFarmaciPrescritti.map((pa) => <RowCustom colums={["formulazione.farmaco.nome", "formulazione.formula", "quantitaPrescrizione", "dataInizio", "dataFine"]} oBoB={["formulazione.formula ", "formulazione.formula.nome"]} item={pa} />) : ''
                                                    }
                                                </tbody>
                                            </Table>
                                        </div>
                                    </Row>

                                )
                            }
                            <Pagination
                                patientsPerPage={this.state.storicoPerPage}
                                totalPatients={this.state.storicPlan?.length}
                                paginate={(pageNumber) => this.setCurrentStoricoPage(pageNumber)}
                                currentPage={this.state.currentStoricoPage}
                                prevPage={(pageNumber) => this.setPrevStoricoPage(pageNumber)}
                                nextPage={(pageNumber) => this.setNexStoricoPage(pageNumber)}
                            />
                        </Row>
                    </Tab>
                }
                {this.state.isNewPatient ? '' :
                    <Tab eventKey="aderenza" title="Aderenza alla terapia" >

                        <div className="table-wrapper">
                            <Table className="table custom">
                                <thead>
                                    <tr>
                                        <th>Data</th>
                                        <th>Ora</th>
                                        <th>Farmaco antiepilettico</th>
                                        <th>Assunzione</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        adherences.map((pa) => <RowCustom colums={["dataOraInvioNotifica", "oraAssunzioneIndicata", "farmaco", "esitoDosagePushNotification"]} item={pa} />)
                                    }
                                </tbody>
                            </Table>
                        </div>
                        <Pagination
                                patientsPerPage={this.state.aderenzePerPage}
                                totalPatients={this.state.aderenze?.length}
                                paginate={(pageNumber) => this.setCurrentAderenzePage(pageNumber)}
                                currentPage={this.state.currentAderenzePage}
                                prevPage={(pageNumber) => this.setPrevAderenzePage(pageNumber)}
                                nextPage={(pageNumber) => this.setNexAderenzePage(pageNumber)}
                            />
                    </Tab>
                }
            </Tabs>
            < NotificationContainer />
        </>
        );
    }
}

export default NewTherapy;
