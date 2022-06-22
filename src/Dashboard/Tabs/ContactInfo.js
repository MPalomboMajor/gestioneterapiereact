import { PieChartGetAllContactInfoByNumber } from "../PieChartGetAllContactInfoByNumber";
import { BarChartGetAllContactInfoByPatient } from "../BarChartGetAllContactInfoByPatient";
import { PieChartGetSatisfactionLevelQuestionOne } from "../PieChartGetSatisfactionLevelQuestionOne";
import { PieChartGetSatisfactionLevelQuestionTwo } from "../PieChartGetSatisfactionLevelQuestionTwo";
import { PieChartGetSatisfactionLevelQuestionThree } from "../PieChartGetSatisfactionLevelQuestionThree";
import { PieChartGetNumeroMedioContattiPaziente } from "../PieChartGetNumeroMedioContattiPaziente";
import { PieChartGetTempoMedioContatto } from "../PieChartGetTempoMedioContatto";
import { role } from "../../helpers/Constants";

function ContactInfo(props) {
    const user = JSON.parse(localStorage.getItem("role"));
    const isCareManger = user.idRole === role.CAREMANAGER ? true : false
    const isAngelini = user.idRole === role.ANGELINI ? true : false
    const isDoctor = user.idRole === role.DOCTOR ? true : false

    return (
        <>
            <div className="row h-100 justify-content-center align-items-center" style={{ "width": "100%" }}>
                <div className="col-12">
                    <div className="box">
                        <div className="row" style={{ "marginTop": "40px" }}>
                            <div className="col-12 col-md-6 mb-2">
                                <div style={{ "height": "300px" }}>
                                    <h2>Numero medio contatti per paziente</h2>
                                    <PieChartGetNumeroMedioContattiPaziente data={props.dataGetNumeroMedioContattiPaziente} commonProperties={props.commonProperties} />
                                    {/* <BarChartGetAllContactInfoByPatient data={props.dataGetAllContactInfoByPatient} commonProperties={props.commonProperties} /> */}
                                </div>
                            </div>
                            <div className="col-12 col-md-6 mb-2">
                                <div style={{ "height": "300px" }}>
                                    <h2>Tempo medio di contatto</h2>
                                    <PieChartGetTempoMedioContatto data={props.dataGetTempoMedioContatto} commonProperties={props.commonProperties} />
                                </div> 
                            </div>
                        </div>
                        <div className="row" style={{ "marginTop": "40px" }}>
                            <div className="col-12 col-md-4 mb-2">
                                <div style={{ "height": "340px" }}>
                                    <h4>Come valuta il servizio in una scala da 1 a 5?</h4>
                                    <PieChartGetSatisfactionLevelQuestionOne data={props.dataGetSatisfactionLevelQuestionOne} commonProperties={props.commonProperties} />
                                </div>
                            </div>
                            <div className="col-12 col-md-4 mb-2">
                                <div style={{ "height": "340px" }}>
                                    <h4>Consiglierebbe questo servizio?</h4>
                                    <PieChartGetSatisfactionLevelQuestionTwo data={props.dataGetSatisfactionLevelQuestionTwo} commonProperties={props.commonProperties} />
                                </div>
                            </div>
                            <div className="col-12 col-md-4 mb-2">

                                <div style={{ "height": "340px" }}>
                                    <h4>Quali funzionalità aggiuntive vorrebbe fossero presenti?</h4>
                                    <PieChartGetSatisfactionLevelQuestionThree data={props.dataGetSatisfactionLevelQuestionThree} commonProperties={props.commonProperties} />
                                </div>

                            </div>
                        </div>
                        {/* <div className="row">
                            <div className="col-12 col-md-6 mb-2">
                                <div className="container-fluid g-0">
                                    <div className="row gx-3 mb-2">
                                        {isCareManger ?
                                            <div style={{ "height": "300px", "marginTop": "40px" }}>
                                                <h2>Numero contatti</h2>
                                                <PieChartGetAllContactInfoByNumber data={props.dataGetAllContactInfoByNumber} commonProperties={props.commonProperties} />
                                            </div> : ""
                                        }
                                        &nbsp;
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    );
}


export { ContactInfo }
