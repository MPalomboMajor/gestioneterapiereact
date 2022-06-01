import { useState, useEffect } from 'react';
import moment from 'moment';
import { patient } from '../helpers/api/api';
import { entitiesLabels, message } from '../helpers/Constants';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Pagination from '../helpers/pagination';

function SatisfactionInfo() {
    const [patientId, setPatientId] = useState(window.location.pathname.split('/').pop());
    const [satisfactionInfos, setSatisfactionInfos] = useState([]);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [satisfactionInfosPerPage] = useState(3);
    const [patientProfile, setPatientProfile] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const fetchSatisfactionInfo = async () => {
            setLoading(true);
            await patient.get("GetServiceSuggestions/", patientId)
                .then((response) => {
                    if (response.status === 200) {
                        setSatisfactionInfos(response.data.dati);
                        setLoading(false);
                    }
                }).catch((error) => {

                });
            await patient.get("Get/", patientId)
                .then((response) => {
                    if (response.status === 200) {
                        setPatientProfile(response.data.dati);
                    }
                }).catch((error) => {

                });
        };
        fetchSatisfactionInfo();
    }, [show]);

    // Get current
    const indexOfLastSatisfactionInfo = currentPage * satisfactionInfosPerPage;
    const indexOfFirstSatisfactionInfo = indexOfLastSatisfactionInfo - satisfactionInfosPerPage;
    const currentSatisfactionInfos = satisfactionInfos?.slice(indexOfFirstSatisfactionInfo, indexOfLastSatisfactionInfo);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    const nextPage = (pageNumber) => {
        setCurrentPage(pageNumber + 1)
    }
    const prevPage = (pageNumber) => {
        setCurrentPage(pageNumber - 1)
    }

    return (
        <>
            {/* <h1 class="h1">Soddisfazione servizio {patientProfile.name} {patientProfile.surName} - Codice assistito: {patientProfile.codicePaziente}</h1>
            &nbsp;&nbsp;

            <SatisfactionInfosTable satisfactionInfos={currentSatisfactionInfos} handleShow={handleShow} loading={loading} setSatisfactionInfos={setSatisfactionInfos} />
            <div>
                <nav aria-label="Page navigation">
                    <ul className="pagination justify-content-end align-items-center">
                        <button className="btn btn-primary btn-sm me-auto d-none d-sm-block" data-bs-toggle="modal" data-bs-target="#nuova-satisfaction" onClick={handleShow}>Nuovo questionario</button>
                        <Pagination
                            patientsPerPage={satisfactionInfosPerPage}
                            totalPatients={satisfactionInfos?.length}
                            paginate={paginate}
                            currentPage={currentPage}
                            prevPage={prevPage}
                            nextPage={nextPage}
                        />
                    </ul>
                </nav>
                <button className="btn btn-primary mb-4 align-self-center d-block d-sm-none" data-bs-toggle="modal" data-bs-target="#nuova-satisfaction" onClick={handleShow}>Nuovo questionario</button>
            </div>



            <SatisfactionInfosModal show={show} handleClose={handleClose} setSatisfactionInfos={setSatisfactionInfos} /> */}
        </>

    );
}

function SatisfactionInfosTable(props) {

    if (props.loading) {
        return <h2>Loading...</h2>;
    }

    return (
        <>

            <div className="table-wrapper">
                <table className="table custom">
                    <thead>
                        <tr>
                            <th scope="col">Data</th>
                            <th scope="col">Domanda</th>
                            <th scope="col">Risposta</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.satisfactionInfos?.map((ev) => <SatisfactionInfoRow key={ev.id} satisfactionInfo={ev} />)
                        }
                    </tbody>
                </table>
            </div>



        </>
    );
}

function SatisfactionInfoRow(props) {
    return <tr><SatisfactionInfoRowData satisfactionInfo={props.satisfactionInfo} /> </tr>
}

function SatisfactionInfoRowData(props) {
    return (<>
        <td>{props.satisfactionInfo.dateEvent.split(' ')[0]}</td>
        <td>{props.satisfactionInfo.domanda}</td>
        <td>{props.satisfactionInfo.risposta}</td>
    </>
    );
}

function SatisfactionInfosModal(props) {
    const [newSatisfactionInfo, setNewSatisfactionInfo] = useState({
        idPatient: window.location.pathname.split('/').pop(),
        idCareManager: JSON.parse(localStorage.getItem("role")).id,
        dataInserimento: "",
        valutazione: "",
        consiglio: "",
        funzionalita: "",
    });

    const handleChange = (e) => {
        const inputValue = e.target.value;
        const inputName = e.target.getAttribute('name');
        setNewSatisfactionInfo({
            ...newSatisfactionInfo, [inputName]:
                inputValue
        });
    };

    const clearState = () => {
        setNewSatisfactionInfo({
            idPatient: window.location.pathname.split('/').pop(),
            idCareManager: JSON.parse(localStorage.getItem("role")).id,
            dataInserimento: "",
            valutazione: "",
            consiglio: "",
            funzionalita: "",
        })
    }

    function saveSatisfactionInfo() {
        newSatisfactionInfo.idPatient = parseInt(newSatisfactionInfo.idPatient);
        newSatisfactionInfo.idCareManager = parseInt(newSatisfactionInfo.idCareManager);
        newSatisfactionInfo.valutazione = parseInt(newSatisfactionInfo.valutazione);
        moment(newSatisfactionInfo.dataInserimento).format("DD/MM/YYYY")
        patient.post("InsertServiceSuggestion/", newSatisfactionInfo)
            .then((response) => {
                if (response.status === 200) {
                    NotificationManager.success(message.PATIENT + message.SuccessUpdate, entitiesLabels.SUCCESS, 3000);
                    props.setSatisfactionInfos(response.data.dati);
                }
            }).catch((error) => {
                NotificationManager.error(message.ErrorServer, entitiesLabels.ERROR, 3000);
            });
        clearState();
        props.handleClose();
    };


    return (
        <>
            <div className="modal fade" id="nuova-satisfaction" tabIndex={-1} aria-labelledby="Nuovo questionario di soddisfazione" aria-hidden="true" >
                <div className="modal-dialog modal-dialog-centered" show={props.show} onHide={props.handleClose}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="h3">Nuovo questionario di soddisfazione</h3>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <form action>
                            <div className="modal-body align-items-end">
                                <div className="input-group mb-3 w-sm-50">
                                    <span className="input-group-text" id="data">Data</span>
                                    <input type="date" className="form-control form-control-sm" id="dataInserimento" aria-describedby="basic-addon3" name="dataInserimento" onChange={handleChange} max={moment().format("YYYY-MM-DD")} required />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="descrizione">Come valuta il servizio da 1 a 5?</span>
                                    <select className="form-select form-select-sm mb-3" type="text" name="valutazione" placeholder=".form-control-sm" aria-label="valutazione" onChange={handleChange}>
                                        <option value="0"></option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="descrizione">Consiglierebbe questo servizio?</span>
                                    <select className="form-select form-select-sm mb-3" type="text" name="consiglio" placeholder=".form-control-sm" aria-label="valutazione" onChange={handleChange}>
                                        <option value="0"></option>
                                        <option value="Si">Sì</option>
                                        <option value="No">No</option>
                                        <option value="Non so">Non so</option>
                                    </select>
                                </div>
                                <div className="input-group mb-3">
                                <span className="input-group-text" id="descrizione">Quali funzionalità aggiuntive vorrebbe fossero presenti?</span> 
                                    <div className="input-group position-relative mb-3">
                                        <textarea className="form-control form-control-sm mb-3" id="funzionalita" rows={5} onChange={handleChange} />
                                    </div>

                                </div>

                            </div>
                            <div className="modal-footer d-flex justify-content-center justify-content-md-end">
                                <button className="btn btn-primary" id onClick={saveSatisfactionInfo}>Salva</button>
                            </div>
                        </form>
                        < NotificationContainer />
                    </div>
                </div>
            </div>
        </>
    );
}

export { SatisfactionInfo };