import { PieChartGetAllDropOff } from "../PieChartGetAllDropOff";
import { LineChartGetMonthlyTrend } from "../LineChartGetMonthlyTrend";
import { BarChartGetBySex } from "../BarChartGetBySex";
import { BarChartGetByAge } from "../BarChartGetByAge";

function Patients(props) {

    return (
        <>
            <div className="row h-100 justify-content-center align-items-center" style={{ "width": "100%" }}>
                <div className="col-12">
                    <div className="box">
                        <div className="row">

                            <div className="col-12 col-md-2 mb-2">
                                <div className="container-fluid g-0">
                                    <h2 class="h2">Totale registrati attivati: {props.dataGetTotalRegisterActive.registrati}/{props.dataGetTotalRegisterActive.attivi}</h2>
                                </div>
                            </div>
                            <div className="col-12 col-md-5 mb-2" style={{ "height": "300px" }}>
                                <h2>Sesso</h2>
                                <BarChartGetBySex data={props.dataGetBySex} commonProperties={props.commonProperties} />
                            </div>

                            <div className="col-12 col-md-5 mb-2" id="ageChart">
                                <h2>Fasce di età</h2>
                                <BarChartGetByAge data={props.dataGetByAge} commonProperties={props.commonProperties} />
                            </div>
                        </div>
                        &nbsp;
                        <div className="row" style={{ "marginTop": "40px" }}>
                            <div className="col-12 col-md-2 mb-2">
                                <div className="container-fluid g-0">

                                </div>
                            </div>
                            <div className="col-12 col-md-8 mb-2">
                                <div className="container-fluid g-0">
                                    <div className="row gx-3 mb-2">

                                        <div style={{ "height": "300px", "marginTop": "40px", "width": "100%" }}>
                                            <h2>Andamento mensile</h2>
                                            <LineChartGetMonthlyTrend data={props.dataGetMonthlyTrend} commonProperties={props.commonProperties} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="row" style={{ "marginTop": "40px" }}>
                            <div className="col-12 col-md-2 mb-2">
                            </div>
                            <div className="col-12 col-md-5 mb-2" >
                                <div className="container-fluid g-0">
                                    <h2 class="h2">Totale drop-off: {props.dataGetTotalNumberDropOff}</h2>
                                </div>
                            </div>
                            <div className="col-12 col-md-5">
                                <div className="container-fluid g-0">
                                    <div className="row gx-3 mb-2">
                                        <div style={{ "height": "340px" }}>
                                            <h2>Drop-off</h2>
                                            <PieChartGetAllDropOff data={props.dataGetAllDropOff} commonProperties={props.commonProperties} />
                                        </div>
                                        &nbsp;&nbsp;

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


export { Patients }
