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
    const isAngelini = user.idRole === role.ANGELINI ? true : false
    const isDoctor = user.idRole === role.DOCTOR ? true : false
    const [key, setKey] = useState('patients');
    const date = new Date();
    const [dataInizio, setDataInizio] = useState(moment(date).subtract(6, 'days').format("DD/MM/YYYY"));
    const [dataFine, setDataFine] = useState(moment(date).format("DD/MM/YYYY"));
    //Assistiti
    const [dataGetTotalRegisterActive, setDataGetTotalRegisterActive] = useState("");
    const [dataGetTotalNumberDropOff, setDataGetTotalNumberDropOff] = useState("");
    const [dataGetAllDropOff, setDataGetAllDropOff] = useState([]);
    const [dataGetBySex, setDataGetBySex] = useState([]);
    const [dataGetMonthlyTrend, setDataGetMonthlyTrend] = useState([]);
    const [dataGetByAge, setDataGetByAge] = useState([]);
    //Terapia
    const [dataGetAllPatientByFormulation, setDataGetAllPatientByFormulation] = useState([]);
    const [dataGetDayByFormulation, setDataGetDayByFormulation] = useState([]);
    const [dataGetPatientsByPhase, setDataGetPatientsByPhase] = useState([]);
    //Monitoraggio
    const [dataGetPatientsByEpilecticSeizure, setDataGetPatientsByEpilecticSeizure] = useState([]);
    const [dataGetAdherencesByPatient, setDataGetAdherencesByPatient] = useState([]);
    const [dataGetTrackingMoodByPatient, setDataGetTrackingMoodByPatient] = useState([]);
    const [dataGetAdverseEventsByEvent, setDataGetAdverseEventsByEvent] = useState([]);
    const [dataGetCumulativeSurveysByMood, setDataGetCumulativeSurveysByMood] = useState([]);
    //ContactInfo
    const [dataGetAllContactInfoByPatient, setDataGetAllContactInfoByPatient] = useState([]);
    const [dataGetAllContactInfoByNumber, setDataGetAllContactInfoByNumber] = useState([]);
    const [dataGetSatisfactionLevelQuestionOne, setDataGetSatisfactionLevelQuestionOne] = useState([]);
    const [dataGetSatisfactionLevelQuestionTwo, setDataGetSatisfactionLevelQuestionTwo] = useState([]);
    const [dataGetSatisfactionLevelQuestionThree, setDataGetSatisfactionLevelQuestionThree] = useState([]);

    useEffect(() => {
        const fetchInitalData = async () => {
            callsFetchData();
        };
        fetchInitalData();
    }, []);

    function fetchData(evt) {
        evt.preventDefault();
        callsFetchData();
    };

    function callsFetchData() {
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
        dashboard.getWithParam("GetPatientsByPhase/", { params: { DataFine: dataFine, DataInizio: dataInizio } })
            .then((response) => {
                if (response.status === 200) {
                    setDataGetPatientsByPhase(response.data.dati);
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
                setDataGetPatientsByEpilecticSeizure([]);
            });
        dashboard.getWithParam("GetAdherencesByPatient/", { params: { DataFine: dataFine, DataInizio: dataInizio } })
            .then((response) => {
                if (response.status === 200) {
                    setDataGetAdherencesByPatient(response.data.dati);
                }
            }).catch((error) => {
                setDataGetAdherencesByPatient([]);
            });
        dashboard.getWithParam("GetTrackingMoodByPatient/", { params: { DataFine: dataFine, DataInizio: dataInizio } })
            .then((response) => {
                if (response.status === 200) {
                    setDataGetTrackingMoodByPatient(response.data.dati);
                }
            }).catch((error) => {
                setDataGetTrackingMoodByPatient([]);
            });
        dashboard.getWithParam("GetAdverseEventsByEvent/", { params: { DataFine: dataFine, DataInizio: dataInizio } })
            .then((response) => {
                if (response.status === 200) {
                    setDataGetAdverseEventsByEvent(response.data.dati);
                }
            }).catch((error) => {
                setDataGetAdverseEventsByEvent([]);
            });
        if (isAngelini) {
            dashboard.getWithParam("GetCumulativeSurveysByMood/", { params: { DataFine: dataFine, DataInizio: dataInizio } })
                .then((response) => {
                    if (response.status === 200) {
                        setDataGetCumulativeSurveysByMood(response.data.dati);
                    }
                }).catch((error) => {

                });
        }
        //ContactInfo
        if (isAngelini || isCareManger) {
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
            dashboard.getWithParam("GetSatisfactionLevelQuestionOne", { params: { DataFine: dataFine, DataInizio: dataInizio } })
                .then((response) => {
                    if (response.status === 200) {
                        setDataGetSatisfactionLevelQuestionOne(response.data.dati);
                    }
                }).catch((error) => {

                });
            dashboard.getWithParam("GetSatisfactionLevelQuestionTwo", { params: { DataFine: dataFine, DataInizio: dataInizio } })
                .then((response) => {
                    if (response.status === 200) {
                        setDataGetSatisfactionLevelQuestionTwo(response.data.dati);
                    }
                }).catch((error) => {

                });
            dashboard.getWithParam("GetSatisfactionLevelQuestionThree", { params: { DataFine: dataFine, DataInizio: dataInizio } })
                .then((response) => {
                    if (response.status === 200) {
                        setDataGetSatisfactionLevelQuestionThree(response.data.dati);
                    }
                }).catch((error) => {

                });
        }
    };

    const commonProperties = {
        width: 400,
        height: 300,
        animate: false,
        activeOuterRadiusOffset: 8,
    }

    return (
        <>
            <div className="row mb-4">
                <form onSubmit={fetchData}>
                    <div className="row align-items-center g-0 g-md-3">

                        <div className="col-12 col-md-4">
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="label-inizio">Data inizio</span>
                                <input type="date" className="form-control form-control-sm" id="dataI" defaultValue={moment(date).subtract(6, 'days').format("YYYY-MM-DD")} aria-describedby="label-data" name="dataInizio" onChange={e => setDataInizio(moment(e.target.value).format("DD/MM/YYYY"))} />
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="label-inizio">Data fine</span>
                                <input type="date" className="form-control form-control-sm" id="dataF" aria-describedby="label-data" defaultValue={moment(date).format("YYYY-MM-DD")} name="dataFine" onChange={e => setDataFine(moment(e.target.value).format("DD/MM/YYYY"))} />
                            </div>
                        </div>
                        <div className="col-12 col-md-3">
                            <button className="btn btn-primary btn-upload form-control form-control-sm" id type="submit" >Filtra</button>
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
                        dataGetPatientsByPhase={dataGetPatientsByPhase}
                        commonProperties={commonProperties} />
                </Tab>
                <Tab eventKey="monitoring" title="Monitoraggio" >
                    <Monitoring dataGetPatientsByEpilecticSeizure={dataGetPatientsByEpilecticSeizure}
                        dataGetAdherencesByPatient={dataGetAdherencesByPatient}
                        dataGetTrackingMoodByPatient={dataGetTrackingMoodByPatient}
                        dataGetAdverseEventsByEvent={dataGetAdverseEventsByEvent}
                        dataGetCumulativeSurveysByMood={dataGetCumulativeSurveysByMood}
                        commonProperties={commonProperties} />
                </Tab>
                {isCareManger || isAngelini ?
                    <Tab eventKey="contactInfo" title="Contact info" >
                        <ContactInfo dataGetAllContactInfoByPatient={dataGetAllContactInfoByPatient}
                            dataGetAllContactInfoByNumber={dataGetAllContactInfoByNumber}
                            dataGetSatisfactionLevelQuestionOne={dataGetSatisfactionLevelQuestionOne}
                            dataGetSatisfactionLevelQuestionTwo={dataGetSatisfactionLevelQuestionTwo}
                            dataGetSatisfactionLevelQuestionThree={dataGetSatisfactionLevelQuestionThree}
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
