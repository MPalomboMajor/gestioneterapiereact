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
    const [dataGetAllDropOff, setDataGetAllDropOff] = useState([]);
    const [dataGetBySex, setDataGetBySex] = useState([]);
    const [dataGetMonthlyTrend, setDataGetMonthlyTrend] = useState([]);

    function fetchData(evt) {
        evt.preventDefault();
        dashboard.getWithParam("GetAllDropOff/", { params: { DataFine: dataFine, DataInizio: dataInizio } })
            .then((response) => {
                if (response.status === 200) {
                    setDataGetAllDropOff(response.data.dati);
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
        width: 300,
        height: 200,
        animate: true,
        activeOuterRadiusOffset: 8,
    }

    return (
        <>

            

            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 mb-3 d-flex justify-content-center justify-content-md-start">
                        <Link to={`/Dashboard`}><button className="btn btn-primary me-3" id>Elenco assistiti</button></Link>
                    </div>
                </div>
            </div>
            &nbsp;&nbsp;&nbsp;
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
                    <Patients dataGetAllDropOff={dataGetAllDropOff}
                        dataGetMonthlyTrend={dataGetMonthlyTrend}
                        dataGetBySex={dataGetBySex}
                        commonProperties={commonProperties} />
                </Tab>
                <Tab eventKey="therapies" title="Terapie" >
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
                </Tab>
            </Tabs>

        </>

    );
}


export { DoctorChartsInterface }
