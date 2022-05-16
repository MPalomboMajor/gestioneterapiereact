import { PieChartGetAllContactInfoByNumber } from "../PieChartGetAllContactInfoByNumber";
import { BarChartGetAllContactInfoByPatient } from "../BarChartGetAllContactInfoByPatient";
import { PieChartGetSatisfactionLevelQuestionOne } from "../PieChartGetSatisfactionLevelQuestionOne";
import { PieChartGetSatisfactionLevelQuestionTwo } from "../PieChartGetSatisfactionLevelQuestionTwo";
import { PieChartGetSatisfactionLevelQuestionThree } from "../PieChartGetSatisfactionLevelQuestionThree";

function ContactInfo(props) {
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
                                            <h2>Numero contatti per paziente</h2>
                                            <BarChartGetAllContactInfoByPatient data={props.dataGetAllContactInfoByPatient} commonProperties={props.commonProperties} />
                                        </div>
                                        &nbsp;
                                        <div style={{ "height": "300px", "marginTop": "40px" }}>
                                            <h2>Livello soddisfazione domanda 1</h2>
                                            <PieChartGetSatisfactionLevelQuestionOne data={props.dataGetSatisfactionLevelQuestionOne} commonProperties={props.commonProperties} />
                                        </div>
                                        &nbsp;
                                        <div style={{ "height": "300px", "marginTop": "40px" }}>
                                            <h2>Livello soddisfazione domanda 3</h2>
                                            <PieChartGetSatisfactionLevelQuestionThree data={props.dataGetSatisfactionLevelQuestionThree} commonProperties={props.commonProperties} />
                                        </div>
                                        &nbsp;
                                        {/* <div style={{ "height": "300px" }}>
                                            <h2>GetMonthlyTrend</h2>
                                            <LineChartGetMonthlyTrend data={props.dataGetMonthlyTrend} commonProperties={props.commonProperties} />
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6">
                                <div className="container-fluid g-0">
                                    <div className="row gx-3 mb-2">
                                        <div style={{ "height": "300px", "marginTop": "40px" }}>
                                            <h2>Numero contatti</h2>
                                            <PieChartGetAllContactInfoByNumber data={props.dataGetAllContactInfoByNumber} commonProperties={props.commonProperties} />
                                        </div>
                                        &nbsp;
                                        <div style={{ "height": "300px", "marginTop": "40px" }}>
                                            <h2>Livello soddisfazione domanda 2</h2>
                                            <PieChartGetSatisfactionLevelQuestionTwo data={props.dataGetSatisfactionLevelQuestionTwo} commonProperties={props.commonProperties} />
                                        </div>
                                        &nbsp;
                                        {/* <div style={{ "height": "300px" }}>
                                            <h2>Andamento mood giornaliero</h2>
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


export { ContactInfo }
