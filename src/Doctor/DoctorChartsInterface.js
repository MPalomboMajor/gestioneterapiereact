import moment from 'moment';
import { dashboard } from '../helpers/api/api'
import { useState, useEffect } from 'react';
import { role } from '../helpers/Constants';
import { Link } from "react-router-dom";
import { Tabs, Tab } from 'react-bootstrap';
import { Patients } from '../Dashboard/Tabs/Patients';
import { Therapies } from '../Dashboard/Tabs/Therapies';
import { Monitoring } from '../Dashboard/Tabs/Monitoring';
import { ContactInfo } from '../Dashboard/Tabs/ContactInfo';

function DoctorChartsInterface() {
    const user = JSON.parse(localStorage.getItem("role"));
    const isCareManger = user.idRole === role.CAREMANAGER ? true : false
    const isDoctor = user.idRole === role.DOCTOR ? true : false
    const [key, setKey] = useState('patients');
    const date = new Date();
    const [dataInizio, setDataInizio] = useState(moment(date));
    const [dataFine, setDataFine] = useState(moment(date).subtract(13, 'days'));
    //Assistiti
    const [dataGetTotalRegisterActive, setDataGetTotalRegisterActive] = useState("36");
    const [dataGetTotalNumberDropOff, setDataGetTotalNumberDropOff] = useState("35");
    const [dataGetAllDropOff, setDataGetAllDropOff] = useState([{ "id": "Causa 5", "label": "Causa 5", "value": 67, "color": "hsl(57, 100%, 50%)" }, { "id": "Causa 3", "label": "Causa 3", "value": 33, "color": "hsl(57, 2%, 50%)" }]);
    const [dataGetBySex, setDataGetBySex] = useState([{ "sesso": "Maschi", "registrazioni": 9, "registrazioniColor": "hsl(233, 100%, 50%)", "attivazioni": 6, "attivazioniColor": "hsl(37, 100 %, 50 %)" }, { "sesso": "Femmine", "registrazioni": 2, "registrazioniColor": "hsl(233, 100%, 50%)", "attivazioni": 9, "attivazioniColor": "hsl(37, 100 %, 50 %)" }, { "sesso": "Altro", "registrazioni": 6, "registrazioniColor": "hsl(233, 100%, 50%)", "attivazioni": 4, "attivazioniColor": "hsl(37, 100 %, 50 %)" }]);
    const [dataGetMonthlyTrend, setDataGetMonthlyTrend] = useState([{ "id": "Registrati", "color": "hsl(233, 100%, 50%)", "data": [{ "x": "06/2022", "y": 0 }, { "x": "05/2022", "y": 4 }, { "x": "04/2022", "y": 0 }, { "x": "03/2022", "y": 0 }] }, { "id": "Attivi", "color": "hsl(37, 100%, 50%)", "data": [{ "x": "06/2022", "y": 0 }, { "x": "05/2022", "y": 1 }, { "x": "04/2022", "y": 0 }, { "x": "03/2022", "y": 0 }] }]);
    const [dataGetByAge, setDataGetByAge] = useState([{ "fasciaDiEta": "0-18", "registrazioni": 4, "registrazioniColor": "hsl(233, 100%, 50%)", "attivazioni": 5, "attivazioniColor": "hsl(37, 100%, 50%)" }, { "fasciaDiEta": "18-35", "registrazioni": 8, "registrazioniColor": "hsl(233, 100%, 50%)", "attivazioni": 9, "attivazioniColor": "hsl(37, 100%, 50%)" }, { "fasciaDiEta": "35-50", "registrazioni": 3, "registrazioniColor": "hsl(233, 100%, 50%)", "attivazioni": 2, "attivazioniColor": "hsl(37, 100%, 50%)" }, { "fasciaDiEta": ">50", "registrazioni": 7, "registrazioniColor": "hsl(233, 100%, 50%)", "attivazioni": 4, "attivazioniColor": "hsl(37, 100%, 50%)" }]);
    //Terapia
    const [dataGetAllPatientByFormulation, setDataGetAllPatientByFormulation] = useState([{ "formula": "12.5", "numeroPazienti": 4, "colore": "hsl(233, 100%, 50%)" }, { "formula": "25", "numeroPazienti": 6, "colore": "hsl(233, 100%, 50%)" }, { "formula": "50", "numeroPazienti": 9, "colore": "hsl(233, 100%, 50%)" }, { "formula": "100", "numeroPazienti": 4, "colore": "hsl(233, 100%, 50%)" }, { "formula": "200", "numeroPazienti": 1, "colore": "hsl(233, 100%, 50%)" }]);
    const [dataGetDayByFormulation, setDataGetDayByFormulation] = useState([{ "id": "12,5", "label": "12,5", "value": 16, "color": "hsl(233, 100%, 50%)" }, { "id": "200", "label": "200", "value": 15, "color": "hsl(57, 2%, 50%)" }, { "id": "50", "label": "50", "value": 13, "color": "hsl(200, 100%, 50%)" }, { "id": "25", "label": "25", "value": 14, "color": "hsl(37, 100%, 50%)" }, { "id": "100", "label": "100", "value": 7, "color": "hsl(57, 100%, 50%)" }]);
    //Monitoraggio
    const [dataGetPatientsByEpilecticSeizure, setDataGetPatientsByEpilecticSeizure] = useState([{ "id": "0-2", "label": "0-2", "value": 2, "color": "hsl(233, 100%, 50%)" }, { "id": "3-5", "label": "3-5", "value": 1, "color": "hsl(37, 100%, 50%)" }, { "id": "6-8", "label": "6-8", "value": 1, "color": "hsl(57, 2%, 50%)" }, { "id": ">8", "label": ">8", "value": 1, "color": "hsl(57, 100%, 50%)" }]);
    const [dataGetAdherencesByPatient, setDataGetAdherencesByPatient] = useState([{ "cognomePaziente": "Meucci", "numeroNotifiche": 6, "numeroNotificheColor": "hsl(37, 100%, 50%)", "numeroConferme": 9, "numeroConfermeColor": "hsl(233, 100%, 50%)" }, { "cognomePaziente": "Boggio", "numeroNotifiche": 25, "numeroNotificheColor": "hsl(37, 100%, 50%)", "numeroConferme": 45, "numeroConfermeColor": "hsl(233, 100%, 50%)" }, { "cognomePaziente": "esposito", "numeroNotifiche": 23, "numeroNotificheColor": "hsl(37, 100%, 50%)", "numeroConferme": 69, "numeroConfermeColor": "hsl(233, 100%, 50%)" }, { "cognomePaziente": "Boggio", "numeroNotifiche": 24, "numeroNotificheColor": "hsl(37, 100%, 50%)", "numeroConferme": 36, "numeroConfermeColor": "hsl(233, 100%, 50%)" }]);
    //ContactInfo
    const [dataGetAllContactInfoByPatient, setDataGetAllContactInfoByPatient] = useState([{ "cognomePaziente": "Meucci", "numeroContatti": 7, "numeroNotificheColor": "hsl(233, 100%, 50%)" }, { "cognomePaziente": "esposito", "numeroContatti": 52, "numeroNotificheColor": "hsl(233, 100%, 50%)" }, { "cognomePaziente": "Boggio", "numeroContatti": 36, "numeroNotificheColor": "hsl(233, 100%, 50%)" }]);
    const [dataGetAllContactInfoByNumber, setDataGetAllContactInfoByNumber] = useState([{ "id": "0-20", "label": "0-20", "value": 12, "color": "hsl(341, 70%, 50%)" }, { "id": "21-40", "label": "21-40", "value": 63, "color": "hsl(284, 70%, 50%)" }, { "id": "41-60", "label": "41-60", "value": 34, "color": "hsl(348, 70%, 50%)" }, { "id": ">60", "label": ">60", "value": 9, "color": "hsl(78, 70%, 50%)" }]);

    function fetchData(evt) {
        evt.preventDefault();
        //Assstiti
        dashboard.getWithParam("GetTotalRegister&Active/", { params: { DataFine: dataFine, DataInizio: dataInizio } })
            .then((response) => {
                if (response.status === 200) {
                    setDataGetTotalRegisterActive(response.data.dati);
                }
            }).catch((error) => {

            });
        dashboard.getWithParam("GetTotalNumberDropOff/", { params: { DataFine: dataFine, DataInizio: dataInizio } })
            .then((response) => {
                if (response.status === 200) {
                    setDataGetTotalNumberDropOff(response.data.dati);
                }
            }).catch((error) => {

            });
        dashboard.getWithParam("GetAllDropOff/", { params: { DataFine: dataFine, DataInizio: dataInizio } })
            .then((response) => {
                if (response.status === 200) {
                    setDataGetAllDropOff(response.data.dati);
                }
            }).catch((error) => {

            });
        dashboard.getWithParam("GetByAge/", { params: { DataFine: dataFine, DataInizio: dataInizio } })
            .then((response) => {
                if (response.status === 200) {
                    setDataGetByAge(response.data.dati);
                }
            }).catch((error) => {

            });
        dashboard.getWithParam("GetBySex/", { params: { DataFine: dataFine, DataInizio: dataInizio } })
            .then((response) => {
                if (response.status === 200) {
                    setDataGetBySex(response.data.dati);
                }
            }).catch((error) => {

            });
        dashboard.getWithParam("GetMonthlyTrend/", { params: { DataFine: dataFine, DataInizio: dataInizio } })
            .then((response) => {
                if (response.status === 200) {
                    setDataGetMonthlyTrend(response.data.dati);
                }
            }).catch((error) => {

            });
        //Terapia
        dashboard.getWithParam("GetAllPatientsByFormulation/", { params: { DataFine: dataFine, DataInizio: dataInizio } })
            .then((response) => {
                if (response.status === 200) {
                    setDataGetAllPatientByFormulation(response.data.dati);
                }
            }).catch((error) => {

            });
        dashboard.getWithParam("GetDayByFormulation/", { params: { DataFine: dataFine, DataInizio: dataInizio } })
            .then((response) => {
                if (response.status === 200) {
                    setDataGetDayByFormulation(response.data.dati);
                }
            }).catch((error) => {

            });
        //Monitoraggio
        dashboard.getWithParam("GetPatientsByEpilecticSeizure/", { params: { DataFine: dataFine, DataInizio: dataInizio } })
            .then((response) => {
                if (response.status === 200) {
                    setDataGetPatientsByEpilecticSeizure(response.data.dati);
                }
            }).catch((error) => {

            });
        dashboard.getWithParam("GetAdherencesByPatient/", { params: { DataFine: dataFine, DataInizio: dataInizio } })
            .then((response) => {
                if (response.status === 200) {
                    setDataGetAdherencesByPatient(response.data.dati);
                }
            }).catch((error) => {

            });
        //ContactInfo
        dashboard.getWithParam("GetAllContactInfoByPatient/", { params: { DataFine: dataFine, DataInizio: dataInizio } })
            .then((response) => {
                if (response.status === 200) {
                    setDataGetAllContactInfoByPatient(response.data.dati);
                }
            }).catch((error) => {

            });
        dashboard.getWithParam("GetAllContactInfoByNumber", { params: { DataFine: dataFine, DataInizio: dataInizio } })
            .then((response) => {
                if (response.status === 200) {
                    setDataGetAllContactInfoByNumber(response.data.dati);
                }
            }).catch((error) => {

            });

    };

    const commonProperties = {
        width: 400,
        height: 300,
        animate: true,
        activeOuterRadiusOffset: 8,
    }

    return (
        <>
            <div className="row mb-4">
                <form onSubmit={fetchData}>
                    <div className="row mb-4">
                        <div className="col-12 col-md-4">
                            <span className="input-group-text" id="label-data">Data inizio</span>
                            <input type="date" className="form-control form-control-sm" id="data" aria-describedby="label-data" name="dataInizio" onChange={e => setDataInizio(moment(e.target.value).format("DD/MM/YYYY"))} />
                        </div>
                        <div className="col-12 col-md-4">
                            <span className="input-group-text" id="label-data">Data fine</span>
                            <input type="date" className="form-control form-control-sm" id="data" aria-describedby="label-data" name="dataFine" onChange={e => setDataFine(moment(e.target.value).format("DD/MM/YYYY"))} />
                        </div>
                        <div className="col-12 col-md-4">
                            <button className="btn btn-primary btn-upload" id type="submit" >Filtra</button>
                        </div>
                    </div>
                    &nbsp;&nbsp;&nbsp;
                </form>
            </div>
            <Tabs
                id="charts-tabs"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="nav secondary-menu mb-4"
            >
                <Tab eventKey="patients" title="Assistiti">
                    <Patients dataGetTotalRegisterActive={dataGetTotalRegisterActive}
                        dataGetTotalNumberDropOff={dataGetTotalNumberDropOff}
                        dataGetAllDropOff={dataGetAllDropOff}
                        dataGetByAge={dataGetByAge}
                        dataGetMonthlyTrend={dataGetMonthlyTrend}
                        dataGetBySex={dataGetBySex}
                        commonProperties={commonProperties} />
                </Tab>
                <Tab eventKey="therapies" title="Terapie" >
                    <Therapies dataGetAllPatientByFormulation={dataGetAllPatientByFormulation}
                        dataGetDayByFormulation={dataGetDayByFormulation}
                        commonProperties={commonProperties} />
                </Tab>
                <Tab eventKey="monitoring" title="Monitoraggio" >
                    <Monitoring dataGetPatientsByEpilecticSeizure={dataGetPatientsByEpilecticSeizure}
                        dataGetAdherencesByPatient={dataGetAdherencesByPatient}
                        commonProperties={commonProperties} />
                </Tab>
                {isCareManger ?
                    <Tab eventKey="contactInfo" title="Contact info" >
                        <ContactInfo dataGetAllContactInfoByPatient={dataGetAllContactInfoByPatient}
                            dataGetAllContactInfoByNumber={dataGetAllContactInfoByNumber}
                            commonProperties={commonProperties} />
                    </Tab> : ""
                }
            </Tabs>
            &nbsp;&nbsp;&nbsp;
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 mb-3 d-flex justify-content-center justify-content-md-start">
                        <Link to={`/Dashboard`}><button className="btn btn-primary me-3" id>Elenco assistiti</button></Link>
                    </div>
                </div>
            </div>
        </>

    );
}

export { DoctorChartsInterface }
