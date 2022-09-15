import { BarChartGetAllPatientByFormulation } from "../BarChartGetAllPatientByFormulation";
import { PieChartGetDayByFormulation } from "../PieChartGetDayByFormulation";
import { PieChartGetPatientsByPhase } from "../PieChartGetPatientsByPhase";

function Therapies(props) {

    return (
        <>
            <div className="row h-100 justify-content-center align-items-center" style={{ "width": "100%" }}>
                <div className="col-12">
                    <div className="box">
                        <div className="row" style={{ "marginTop": "40px" }}>
                            <div className="col-12 col-md-6 mb-2">
                                <div className="container-fluid g-0">
                                    <div className="row gx-3 mb-2">
                                        <div >
                                            <h2>Numero assistiti per dosaggio</h2>
                                            <BarChartGetAllPatientByFormulation data={props.dataGetAllPatientByFormulation} commonProperties={props.commonProperties} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 mb-2">
                                <div className="container-fluid g-0">
                                    <div className="row gx-3 mb-2">
                                    <div style={{ "height": "300px" }}>
                                            <h2>Numero assistiti per fase di trattamento</h2>
                                            <PieChartGetPatientsByPhase data={props.dataGetPatientsByPhase} commonProperties={props.commonProperties} />
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-md-6">
                                <div className="container-fluid g-0">
                                    <div className="row gx-3 mb-2" style={{ "marginTop": "40px" }}>
                                        <div style={{ "height": "390px", "marginTop": "40px" }}>
                                            <h2>Media giorni per formulazione</h2>
                                            <PieChartGetDayByFormulation data={props.dataGetDayByFormulation} commonProperties={props.commonProperties} />
                                            <p style={{"text-align": "center", "font-size": "13px", "color": "darkgrey", "marginTop": "40px"}}>dosaggio (mg)</p>
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


export { Therapies }
