import { useState, useEffect } from 'react';
import { Tabs, Tab, Form, Button, Row, Col } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as moment from "moment";
import "moment/locale/it";
import { patient } from '../helpers/api/api';
import { entitiesLabels, message } from '../helpers/Constants';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { PatientMoodDailyInfo } from './PatientMoodComponent';
import PatientMoodSlider from './PatientMoodSlider';


function PatientDailyMood(props) {
    var date = new Date();
    date.setDate(date.getDate() - 4);
    const [startDate, setStartDate] = useState(date);
    // const [endDate, setEndDate] = useState();
    const [dateRange, setDateRange] = useState();

    const handleChange = (e) => {
        const inputValue = e.target.value;
        var sdate = new Date(inputValue);
        var edate = new Date();
        edate.setDate(sdate.getDate() + 4);
        setStartDate(sdate);
        //setEndDate(edate);
    };

    return (
        <>

            <div className="row w-100 align-items-center g-0 g-md-3">
                <div className="col-12 col-md-3">
                    <button className="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#edit">Modifica</button>
                </div>
                <div className="col-12 col-md-5">
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="label-inizio">Inizio</span>
                        <input type="date" name="startD" placeholder="Inizio" onChange={handleChange} className="form-control form-control-sm" id="captiontest" aria-describedby="label-inizio" />
                    </div>
                </div>
                <div className="col-12 col-md-4">
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="label-settimane">settimane</span>
                        <select className="form-select form-select-sm" id="captiontest" aria-describedby="label-settimane" aria-label="dateRange" name="dateRange" onChange={(event) => {
                            // setNewEpilepticSeizures(prevEpilepticSeizure => ({
                            //     ...prevEpilepticSeizure,
                            //     elencoContestualita: [{ ...prevEpilepticSeizure.elencoContestualita[0], contesto: parseInt(event.target.value) }]
                            // }));
                        }} >
                            <option value={1}>1</option>
                            <option value={2} selected>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="row w-100 mt-5 justify-content-center align-items-center g-0 g-md-3">
                <div className="col-2 d-none d-md-block">
                    <div className="label label-primary w-100 mt-2 mb-4">Umore</div>
                    <div className="label label-primary w-100 mt-2 mb-4">Emozione</div>
                </div>

                <div className="col-12 col-md-10">
                    <PatientMoodSlider patientDailyMoods={props.patientDailyMoods}/>
                </div>
            </div>

            <div>
                <div className="row w-100 mt-5 justify-content-center align-items-start g-0 g-md-3">
                    <div className="col-12">
                        <div className="small info">Kumar A, Wang M, Riehm A, Yu E, Smith T, Kaplin A | An Automated Mobile Mood Tracking Technology (Mood 24/7): Validation Study | JMIR Ment Health 2020;7(5):e16237 | https://mental.jmir.org/2020/5/e16237 | doi: 10.2196/16237 | PMID: 32432558</div>
                    </div>
                </div>
            </div>

            
        </>

    );
}


export { PatientDailyMood }
