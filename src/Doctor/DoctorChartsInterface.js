import { PieChartGetAllDropOff } from "../Dashboard/PieChartGetAllDropOff";
import HealtMapChart from "../Dashboard/HealtMapChartComponents";
import { BarChartGetBySex } from "../Dashboard/BarChartGetBySex";
import { LineChartGetMonthlyTrend } from "../Dashboard/LineChartGetMonthlyTrend";
import { dashboard } from '../helpers/api/api'
import { useState, useEffect } from 'react';
import moment from 'moment';


function DoctorChartsInterface() {
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
            <h1 className="h1">Chart</h1>
            &nbsp;&nbsp;
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
            <div className="row h-100 justify-content-center align-items-center" style={{ "width": "100%" }}>
                <div className="col-12">
                    <div className="box">
                        <div className="row">
                            <div className="col-12 col-md-6 mb-2">
                                <div className="container-fluid g-0">
                                    <div className="row gx-3 mb-2">
                                        <div style={{ "height": "300px" }}>
                                            <h2>GetAllDropOff</h2>
                                            <PieChartGetAllDropOff data={dataGetAllDropOff} commonProperties={commonProperties} />
                                        </div>
                                        &nbsp;&nbsp;
                                        <div style={{ "height": "300px" }}>
                                            <h2>GetMonthlyTrend</h2>
                                            <LineChartGetMonthlyTrend data={dataGetMonthlyTrend} commonProperties={commonProperties}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6">
                                <div className="container-fluid g-0">
                                    <div className="row gx-3 mb-2">
                                        <div style={{ "height": "300px" }}>
                                            <h2>GetBySex</h2>
                                            <BarChartGetBySex data={dataGetBySex} commonProperties={commonProperties} />
                                        </div>
                                        &nbsp;&nbsp;
                                        <div style={{ "height": "300px" }}>
                                            <h2>Andamento mood giornaliero</h2>
                                            <HealtMapChart />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>



        </>

    );
}


export { DoctorChartsInterface }
