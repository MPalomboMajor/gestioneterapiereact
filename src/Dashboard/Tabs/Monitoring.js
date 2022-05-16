import { PieChartGetPatientsByEpilecticSeizure } from "../PieChartGetPatientsByEpilecticSeizure";
import { BarChartGetAdherencesByPatient } from "../BarChartGetAdherencesByPatient";
import { HeatMapGetTrackingMoodByPatient } from "../HeatMapGetTrackingMoodByPatient";
import { PieChartGetAdverseEventsByEvent } from "../PieChartGetAdverseEventsByEvent";
import { role } from "../../helpers/Constants";


function Monitoring(props) {
    const user = JSON.parse(localStorage.getItem("role"));
    const isCareManger = user.idRole === role.CAREMANAGER ? true : false
    const isAngelini = user.idRole === role.ANGELINI ? true : false
    const isDoctor = user.idRole === role.DOCTOR ? true : false

    return (
        <>
            <div className="row h-100 justify-content-center align-items-center" style={{ "width": "100%" }}>
                <div className="col-12">
                    <div className="box">
                        <div className="row">
                            <div className="col-12 col-md-6 mb-2">
                                <div className="container-fluid g-0">
                                    <div className="row gx-3 mb-2">
                                        <div style={{ "height": "300px", "marginTop": "40px" }}>
                                            <h2>N. pazienti / N. crisi epilettiche</h2>
                                            <PieChartGetPatientsByEpilecticSeizure data={props.dataGetPatientsByEpilecticSeizure} commonProperties={props.commonProperties} />
                                        </div>
                                        &nbsp;
                                        <div style={{ "height": "300px", "marginTop": "40px" }}>
                                            <h2>Eventi avversi</h2>
                                            <PieChartGetAdverseEventsByEvent data={props.dataGetAdverseEventsByEvent} commonProperties={props.commonProperties} />
                                        </div>
                                        &nbsp;
                                        {/* {isAngelini ?
                                            <div style={{ "height": "300px" }}>
                                                <h2></h2>
                                                <LineChartGetMonthlyTrend data={props.dataGetMonthlyTrend} commonProperties={props.commonProperties} />
                                            </div> : ""

                                        } */}

                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6">
                                <div className="container-fluid g-0">
                                    <div className="row gx-3 mb-2">
                                        <div style={{ "height": "300px", "marginTop": "40px" }}>
                                            <h2>Aderenza alla terapia</h2>
                                            <BarChartGetAdherencesByPatient data={props.dataGetAdherencesByPatient} commonProperties={props.commonProperties} />
                                        </div>
                                        &nbsp;
                                        <div style={{ "height": "300px", "marginTop": "40px" }}>
                                            <h2>Andamento mood giornaliero</h2>
                                            <HeatMapGetTrackingMoodByPatient data={props.dataGetTrackingMoodByPatient} commonProperties={props.commonProperties} />
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


export { Monitoring }
