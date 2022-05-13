import { dashboard } from '../helpers/api/api'
import { useState, useEffect } from 'react';
import moment from 'moment';
import { Link } from "react-router-dom";
import { Tabs, Tab } from 'react-bootstrap';
import { Patients } from '../Dashboard/Tabs/Patients';
import { Therapies } from '../Dashboard/Tabs/Therapies';
import { Monitoring } from '../Dashboard/Tabs/Monitoring';
import { ContactInfo } from '../Dashboard/Tabs/ContactInfo';

function DoctorChartsInterface() {
    const [key, setKey] = useState('patients');
    const date = new Date();
    const [dataInizio, setDataInizio] = useState(moment(date));
    const [dataFine, setDataFine] = useState(moment(date).subtract(13, 'days'));
    const [dataGetTotalRegisterActive, setDataGetTotalRegisterActive] = useState("36");
    const [dataGetTotalNumberDropOff, setDataGetTotalNumberDropOff] = useState("35");
    const [dataGetAllDropOff, setDataGetAllDropOff] = useState([{ "id": "Causa 5", "label": "Causa 5", "value": 67, "color": "hsl(57, 100%, 50%)" }, { "id": "Causa 3", "label": "Causa 3", "value": 33, "color": "hsl(57, 2%, 50%)" }]);
    const [dataGetBySex, setDataGetBySex] = useState([{ "sesso": "Maschi", "registrazioni": 9, "registrazioniColor": "hsl(233, 100%, 50%)", "attivazioni": 6, "attivazioniColor": "hsl(37, 100 %, 50 %)" }, { "sesso": "Femmine", "registrazioni": 2, "registrazioniColor": "hsl(233, 100%, 50%)", "attivazioni": 9, "attivazioniColor": "hsl(37, 100 %, 50 %)" }, { "sesso": "Altro", "registrazioni": 6, "registrazioniColor": "hsl(233, 100%, 50%)", "attivazioni": 4, "attivazioniColor": "hsl(37, 100 %, 50 %)" }]);
    const [dataGetMonthlyTrend, setDataGetMonthlyTrend] = useState([{ "id": "Registrati", "color": "hsl(233, 100%, 50%)", "data": [{ "x": "06/2022", "y": 0 }, { "x": "05/2022", "y": 4 }, { "x": "04/2022", "y": 0 }, { "x": "03/2022", "y": 0 }] }, { "id": "Attivi", "color": "hsl(37, 100%, 50%)", "data": [{ "x": "06/2022", "y": 0 }, { "x": "05/2022", "y": 1 }, { "x": "04/2022", "y": 0 }, { "x": "03/2022", "y": 0 }] }]);
    const [dataGetByAge, setDataGetByAge] = useState([{"fasciaDiEta":"0-18","registrazioni":4,"registrazioniColor":"hsl(233, 100%, 50%)","attivazioni":5,"attivazioniColor":"hsl(37, 100%, 50%)"},{"fasciaDiEta":"18-35","registrazioni":8,"registrazioniColor":"hsl(233, 100%, 50%)","attivazioni":9,"attivazioniColor":"hsl(37, 100%, 50%)"},{"fasciaDiEta":"35-50","registrazioni":3,"registrazioniColor":"hsl(233, 100%, 50%)","attivazioni":2,"attivazioniColor":"hsl(37, 100%, 50%)"},{"fasciaDiEta":">50","registrazioni":7,"registrazioniColor":"hsl(233, 100%, 50%)","attivazioni":4,"attivazioniColor":"hsl(37, 100%, 50%)"}])
    
    function fetchData(evt) {
        evt.preventDefault();

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
                {/* <Tab eventKey="therapies" title="Terapie" >
                    <Therapies dataGetAllDropOff={dataGetAllDropOff}
                        dataGetMonthlyTrend={dataGetMonthlyTrend}
                        dataGetBySex={dataGetBySex}
                        commonProperties={commonProperties} />
                </Tab>
                <Tab eventKey="monitoring" title="Monitoraggio" >
                    <Monitoring dataGetAllDropOff={dataGetAllDropOff}
                        dataGetMonthlyTrend={dataGetMonthlyTrend}
                        dataGetBySex={dataGetBySex}
                        commonProperties={commonProperties} />
                </Tab>
                <Tab eventKey="contactInfo" title="Contact info" >
                    <ContactInfo dataGetAllDropOff={dataGetAllDropOff}
                        dataGetMonthlyTrend={dataGetMonthlyTrend}
                        dataGetBySex={dataGetBySex}
                        commonProperties={commonProperties} />
                </Tab> */}
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
