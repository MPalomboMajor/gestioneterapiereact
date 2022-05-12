import { PieChartGetAllDropOff } from "../PieChartGetAllDropOff";
import { LineChartGetMonthlyTrend } from "../LineChartGetMonthlyTrend";
import { BarChartGetBySex } from "../BarChartGetBySex";
import HealtMapChart from "../BarChartGetBySex";

function Therapies(props) {

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
                                            <h2>GetAllDropOff</h2>
                                            <PieChartGetAllDropOff data={props.dataGetAllDropOff} commonProperties={props.commonProperties} />
                                        </div>
                                        &nbsp;&nbsp;
                                        <div style={{ "height": "300px" }}>
                                            <h2>GetMonthlyTrend</h2>
                                            <LineChartGetMonthlyTrend data={props.dataGetMonthlyTrend} commonProperties={props.commonProperties} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6">
                                <div className="container-fluid g-0">
                                    <div className="row gx-3 mb-2">
                                        <div style={{ "height": "300px" }}>
                                            <h2>GetBySex</h2>
                                            <BarChartGetBySex data={props.dataGetBySex} commonProperties={props.commonProperties} />
                                        </div>
                                        &nbsp;&nbsp;
                                        <div style={{ "height": "300px" }}>
                                            <h2>Andamento mood giornaliero</h2>
                                            {/* <HealtMapChart /> */}
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
