import moment from 'moment';
import { patient, dashboard } from '../helpers/api/api'
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
    const isAngelini = user.idRole === role.ADMIN ? true : false
    const isDoctor = user.idRole === role.DOCTOR ? true : false
    const date = new Date();
    const [loading, setLoading] = useState(false);
    const [key, setKey] = useState('patients');
    const [dataInizio, setDataInizio] = useState();
    const [dataFine, setDataFine] = useState(moment(date).format("YYYY-MM-DD"));
    const [creationDatesPatients, setCreationDatesPatients] = useState([]);
    const [minDate, setMinDate] = useState();
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
    const [dataGetTherapyAdherence, setDataGetTherapyAdherence] = useState([]);
    const [dataGetTrackingMoodByPatient, setDataGetTrackingMoodByPatient] = useState([]);
    const [dataGetAdverseEventsByEvent, setDataGetAdverseEventsByEvent] = useState([]);
    const [dataGetCumulativeSurveysByMood, setDataGetCumulativeSurveysByMood] = useState([]);
    //ContactInfo
    //const [dataGetAllContactInfoByPatient, setDataGetAllContactInfoByPatient] = useState([]);
    const [dataGetNumeroMedioContattiPaziente, setDataGetNumeroMedioContattiPaziente] = useState([]);
    const [dataGetAllContactInfoByNumber, setDataGetAllContactInfoByNumber] = useState([]);
    const [dataGetSatisfactionLevelQuestionOne, setDataGetSatisfactionLevelQuestionOne] = useState([]);
    const [dataGetSatisfactionLevelQuestionTwo, setDataGetSatisfactionLevelQuestionTwo] = useState([]);
    const [dataGetSatisfactionLevelQuestionThree, setDataGetSatisfactionLevelQuestionThree] = useState([]);
    const [dataGetTempoMedioContatto, setDataGetTempoMedioContatto] = useState([]);

    useEffect(() => {
        let request = null;
        if (JSON.parse(localStorage.getItem("role")).idRole == role.CAREMANAGER || JSON.parse(localStorage.getItem("role")).idRole == role.ADMIN) {
            request = patient.getAll("GetAll");
        } else {
            request = patient.get("GetByDoctor/", JSON.parse(localStorage.getItem("role")).id);
        }
        request
            .then((response) => {
                if (response.status !== 200) {
                    return;
                }
                const arr = (response.data.dati
                    ?.map(function (item) { return moment.min(item["creationDate"]); })
                    .filter(item => item));
                setCreationDatesPatients(arr);

                setLoading(false);
            }).catch((error) => {

            });
    }, []);

    useEffect(() => {
        if (!creationDatesPatients?.length) {
            return;
        }
        console.log(creationDatesPatients)
        fillMinDate();
    }, [creationDatesPatients]);

    useEffect(() => {
        if (!minDate) {
            return;
        }
        callsFetchData();
    }, [minDate]);

    function fetchData(evt) {
        evt.preventDefault();
        callsFetchData();
    };

    function fillMinDate() {
        const sorted = creationDatesPatients.sort((a, b) => {
            const newA = a.split('/').reverse().join('-');
            const newB = b.split('/').reverse().join('-');
            return +new Date(newA) - +new Date(newB)
        })
        console.log(sorted);
        setMinDate(sorted[0]);
        const dateMomentObject = moment(sorted[0], "DD-MM-YYYY");
        const dateObject = dateMomentObject.toDate();
        setDataInizio(moment(dateObject).format("YYYY-MM-DD"));
    }

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
                    var res = response.data.dati.map(function (x) {
                        x.attivazioni = parseInt(x.attivazioni);
                        x.registrazioni = parseInt(x.registrazioni);
                        return x;
                    });
                    setDataGetByAge(res);
                }
            }).catch((error) => {

            });
        dashboard.getWithParam("GetBySex/", { params: { DataFine: dataFine, DataInizio: dataInizio } })
            .then((response) => {
                if (response.status === 200) {
                    var res = response.data.dati.map(function (x) {
                        x.attivazioni = parseInt(x.attivazioni);
                        x.registrazioni = parseInt(x.registrazioni);
                        return x;
                    });
                    setDataGetBySex(res);
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
                    var res = response.data.dati.map(function (x) {
                        x.formula = parseInt(x.formula);
                        return x;
                    });
                    setDataGetAllPatientByFormulation(res);
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
        if (isDoctor || isCareManger) {
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
        }
        if (isAngelini || isCareManger) {
            dashboard.getWithParam("GetTherapyAdherence/", { params: { DataFine: dataFine, DataInizio: dataInizio } })
                .then((response) => {
                    if (response.status === 200) {
                        setDataGetTherapyAdherence(response.data.dati);
                    }
                }).catch((error) => {
                    setDataGetTherapyAdherence([]);
                });
        }
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
            // dashboard.getWithParam("GetAllContactInfoByPatient/", { params: { DataFine: dataFine, DataInizio: dataInizio } })
            //     .then((response) => {
            //         if (response.status === 200) {
            //             setDataGetAllContactInfoByPatient(response.data.dati);
            //         }
            //     }).catch((error) => {

            //     });
            dashboard.getWithParam("GetNumeroMedioContattiPaziente/", { params: { DataFine: dataFine, DataInizio: dataInizio } })
                .then((response) => {
                    if (response.status === 200) {
                        setDataGetNumeroMedioContattiPaziente(response.data.dati);
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
            dashboard.getWithParam("GetValutazioniServizio", { params: { DataFine: dataFine, DataInizio: dataInizio } })
                .then((response) => {
                    if (response.status === 200) {
                        setDataGetSatisfactionLevelQuestionOne(response.data.dati);
                    }
                }).catch((error) => {

                });
            dashboard.getWithParam("GetServiceSuggestions", { params: { DataFine: dataFine, DataInizio: dataInizio } })
                .then((response) => {
                    if (response.status === 200) {
                        setDataGetSatisfactionLevelQuestionTwo(response.data.dati);
                    }
                }).catch((error) => {

                });
            dashboard.getWithParam("GetAdditionalServiceFeatures", { params: { DataFine: dataFine, DataInizio: dataInizio } })
                .then((response) => {
                    if (response.status === 200) {
                        setDataGetSatisfactionLevelQuestionThree(response.data.dati);
                    }
                }).catch((error) => {

                });
            dashboard.getWithParam("GetTempoMedioContatto", { params: { DataFine: dataFine, DataInizio: dataInizio } })
                .then((response) => {
                    if (response.status === 200) {
                        setDataGetTempoMedioContatto(response.data.dati);
                    }
                }).catch((error) => {

                });
        }
    };

    const commonProperties = {
        width: 400,
        height: 330,
        animate: false,
        activeOuterRadiusOffset: 8,
    }



    return (
        <>
            <div className="row mb-4">
                <form onSubmit={fetchData}>
                    <div className="row align-items-center g-0 g-md-3">
                        {dataInizio &&
                            <div className="col-12 col-md-4">
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="label-inizio">Dal</span>
                                    <input type="date" className="form-control form-control-sm" id="dataI" value={dataInizio} aria-describedby="label-data" name="dataInizio" onChange={e => { setDataInizio(e.target.value); }} min={dataInizio} max={moment().format("YYYY-MM-DD")} />
                                </div>
                            </div>
                        }

                        <div className="col-12 col-md-4">
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="label-inizio">al</span>
                                <input type="date" className="form-control form-control-sm" id="dataF" aria-describedby="label-data" value={dataFine} name="dataFine" onChange={e => setDataFine(e.target.value)} min={dataInizio} max={moment().format("YYYY-MM-DD")} />
                            </div>
                        </div>
                        <div className="col-12 col-md-3">
                            <button className="btn btn-primary btn-upload form-control form-control-sm" id type="submit" >Seleziona</button>
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
                <Tab eventKey="therapies" title="Terapia Ontozry" >
                    <Therapies dataGetAllPatientByFormulation={dataGetAllPatientByFormulation}
                        dataGetDayByFormulation={dataGetDayByFormulation}
                        dataGetPatientsByPhase={dataGetPatientsByPhase}
                        commonProperties={commonProperties} />
                </Tab>
                <Tab eventKey="monitoring" title="Monitoraggio" >
                    <Monitoring dataGetPatientsByEpilecticSeizure={dataGetPatientsByEpilecticSeizure}
                        dataGetAdherencesByPatient={dataGetAdherencesByPatient}
                        dataGetTherapyAdherence={dataGetTherapyAdherence}
                        dataGetTrackingMoodByPatient={dataGetTrackingMoodByPatient}
                        dataGetAdverseEventsByEvent={dataGetAdverseEventsByEvent}
                        dataGetCumulativeSurveysByMood={dataGetCumulativeSurveysByMood}
                        commonProperties={commonProperties} />
                </Tab>
                {isCareManger || isAngelini ?
                    <Tab eventKey="contactInfo" title="Contact info" >
                        <ContactInfo dataGetNumeroMedioContattiPaziente={dataGetNumeroMedioContattiPaziente}
                            //dataGetAllContactInfoByPatient={dataGetAllContactInfoByPatient}
                            dataGetAllContactInfoByNumber={dataGetAllContactInfoByNumber}
                            dataGetSatisfactionLevelQuestionOne={dataGetSatisfactionLevelQuestionOne}
                            dataGetSatisfactionLevelQuestionTwo={dataGetSatisfactionLevelQuestionTwo}
                            dataGetSatisfactionLevelQuestionThree={dataGetSatisfactionLevelQuestionThree}
                            dataGetTempoMedioContatto={dataGetTempoMedioContatto}
                            commonProperties={commonProperties} />
                    </Tab> : ""
                }
            </Tabs>
            &nbsp;&nbsp;&nbsp;
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 mb-3 d-flex justify-content-center justify-content-md-start">
                        {JSON.parse(localStorage.getItem("role")).idRole == role.CAREMANAGER || JSON.parse(localStorage.getItem("role")).idRole == role.DOCTOR ?
                            <Link to={`/Dashboard`}><button className="btn btn-primary me-3" id>Elenco assistiti</button> </Link> : ""}
                    </div>
                </div>
            </div>
        </>

    );
}

export { DoctorChartsInterface }
