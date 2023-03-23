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
                        <div className="row mb-4">
                            <div className="col-12" style={{ "display" : "flex " }}>
                                    <h2 className="h2">Totale registrati: {props.dataGetTotalRegisterActive.registrati} &nbsp; |</h2> 
                                    <h2 className="h2">&nbsp; Totale attivati: {props.dataGetTotalRegisterActive.attivi}</h2> 
                            </div>
                        </div>

                        <div className="row mb-4">
                            <div className="col-6">
                                <h2>Sesso</h2>
                                <BarChartGetBySex data={props.dataGetBySex} commonProperties={props.commonProperties} />
                            </div>

                            <div className="col-6" id="ageChart">
                                <h2>Fasce di età</h2>
                                <BarChartGetByAge data={props.dataGetByAge} commonProperties={props.commonProperties} />
                            </div>
                        </div>

                        <div className="row mb-4">
                            <div className="col-12">
                                <h2>Andamento mensile</h2>
                                <LineChartGetMonthlyTrend data={props.dataGetMonthlyTrend} commonProperties={props.commonProperties} />
                            </div>
                        </div>

                        <div className="row mb-4">
                            <div className="col-6">
                                <h2>Drop-off</h2>
                                <PieChartGetAllDropOff data={props.dataGetAllDropOff} commonProperties={props.commonProperties} />
                            </div>
                            <div className="col-6" >
                                <div className="container-fluid g-0">
                                    <h2 class="h2">Totale drop-off: {props.dataGetTotalNumberDropOff}</h2>
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
