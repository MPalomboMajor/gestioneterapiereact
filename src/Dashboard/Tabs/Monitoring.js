import { PieChartGetPatientsByEpilecticSeizure } from "../PieChartGetPatientsByEpilecticSeizure";
import { BarChartGetAdherencesByPatient } from "../BarChartGetAdherencesByPatient";

function Monitoring(props) {
    return (
        <>
            <div className="row h-100 justify-content-center align-items-center" style={{ "width": "100%" }}>
                <div className="col-12">
                    <div className="box">
                        <div className="row">
                            <div className="col-12 col-md-6 mb-2">
                                <div className="container-fluid g-0">
                                    <div className="row gx-3 mb-2">
                                        <div style={{ "height": "300px" }}>
                                            <h2>N. pazienti / N. crisi epilettiche</h2>
                                            <PieChartGetPatientsByEpilecticSeizure data={props.dataGetPatientsByEpilecticSeizure} commonProperties={props.commonProperties} />
                                        </div>
                                        &nbsp;&nbsp;
                                        {/* <div style={{ "height": "300px" }}>
                                            <h2></h2>
                                            <LineChartGetMonthlyTrend data={props.dataGetMonthlyTrend} commonProperties={props.commonProperties} />
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6">
                                <div className="container-fluid g-0">
                                    <div className="row gx-3 mb-2">
                                        <div style={{ "height": "300px" }}>
                                            <h2>Aderenza alla terapia</h2>
                                            <BarChartGetAdherencesByPatient data={props.dataGetAdherencesByPatient} commonProperties={props.commonProperties} />
                                        </div>
                                        &nbsp;&nbsp;
                                        {/* <div style={{ "height": "300px" }}>
                                            <h2></h2>
                                            <HealtMapChart />
                                        </div> */}
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


export { Monitoring }
