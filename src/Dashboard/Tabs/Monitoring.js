import { PieChartGetPatientsByEpilecticSeizure } from "../PieChartGetPatientsByEpilecticSeizure";
import { BarChartGetAdherencesByPatient } from "../BarChartGetAdherencesByPatient";
import { HeatMapGetTrackingMoodByPatient } from "../HeatMapGetTrackingMoodByPatient";
import { PieChartGetAdverseEventsByEvent } from "../PieChartGetAdverseEventsByEvent";
import { PieChartGetCumulativeSurveysByMood } from "../PieChartGetCumulativeSurveysByMood";
import { PieChartGetTherapyAdherence } from "../PieChartGetTherapyAdherence";
import { role } from "../../helpers/Constants";


function Monitoring(props) {
    const user = JSON.parse(localStorage.getItem("role"));
    const isCareManger = user.idRole === role.CAREMANAGER ? true : false
    const isAngelini = user.idRole === role.ADMIN ? true : false
    const isDoctor = user.idRole === role.DOCTOR ? true : false

    return (
        <>
            <div className="row h-100 justify-content-center align-items-center" style={{ "width": "100%" }}>
                <div className="col-12">
                    <div className="box">
                        <div className="row">
                            <div className="col-12 col-md-6 mb-2">
                                <div className="container-fluid g-0">
                                    {isDoctor ?
                                        <div >
                                            <h2>N. pazienti / N. crisi epilettiche</h2>
                                            <PieChartGetPatientsByEpilecticSeizure data={props.dataGetPatientsByEpilecticSeizure} commonProperties={props.commonProperties} />
                                        </div> : ""
                                    }
                                    {isAngelini || isCareManger ?
                                        <div>
                                            <h2>Aderenza terapia anticrisi</h2>
                                            <PieChartGetTherapyAdherence data={props.dataGetTherapyAdherence} commonProperties={props.commonProperties} />
                                        </div> : ""
                                    }
                                </div>
                            </div>
                            <div className="col-12 col-md-6 mb-2">
                                <div className="container-fluid g-0">
                                    <div >
                                        <h2>Eventi avversi</h2>
                                        <PieChartGetAdverseEventsByEvent data={props.dataGetAdverseEventsByEvent} commonProperties={props.commonProperties} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col-12 col-md-6 mb-2" >
                                <div className="container-fluid g-0">
                                    <div >
                                        <h2>Andamento mood giornaliero<br />ultime 2 settimane</h2>
                                        <HeatMapGetTrackingMoodByPatient data={props.dataGetTrackingMoodByPatient} commonProperties={props.commonProperties} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 mb-2">
                                <div className="container-fluid g-0">
                                    {isAngelini ?
                                        <div style={{ "height": "300px" }}>
                                            <h2>Numero cumulato rilevazioni per mood</h2>
                                            <PieChartGetCumulativeSurveysByMood data={props.dataGetCumulativeSurveysByMood} commonProperties={props.commonProperties} />
                                        </div> : ""
                                    }
                                </div>
                            </div>
                                    
                            <div className="col-12 mb-2">
                                {isDoctor || isCareManger ?
                                    <div id="chartContainer" style={{ "height": "300px" }}>
                                        <h2>Aderenza terapia</h2>
                                        <BarChartGetAdherencesByPatient data={props.dataGetAdherencesByPatient} commonProperties={props.commonProperties} />
                                    </div> : ""
                                }
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}


export { Monitoring }
