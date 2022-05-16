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
    const date = new Date();
    const [startDate, setStartDate] = useState(moment(date).subtract(6, 'days'));
    const [dateRange, setDateRange] = useState("7");
    const [selectedPatientDailyMoods, setSelectedPatientDailyMoods] = useState(props.patientDailyMoods);
    const [calendarDates, setCalendarDates] = useState([]);
    const [list, setList] = useState([]);

    useEffect(() => {
        const fetchMoodList = async () => {
            let new_date = moment(new Date(startDate)).format();
            let endDate = moment(new_date).add(dateRange, 'd').format();
            getDates(startDate, endDate);
        };
        fetchMoodList();
    }, [dateRange]);


    const handleChangeDate = (e) => {
        const inputValue = e.target.value;
        var sdate = moment(new Date(inputValue)).format();
        setStartDate(sdate);

        let new_date = moment(new Date(sdate)).format();
        let endDate = moment(new_date).add(dateRange, 'd').format();
        console.log(endDate);
        console.log(sdate);


        getDates(sdate, endDate);
        //addEmptySlides();
    };

    function getDates(sdate, endDate) {
        setList([]);
        var dateArray = [];
        var currentDate = moment(sdate);
        var stopDate = moment(endDate);
        while (currentDate <= stopDate - 1) {
            dateArray.push(moment(currentDate).format('DD/MM/YYYY'))
            currentDate = moment(currentDate).add(1, 'days');
        }
        //setCalendarDates(state => [dateArray, ...state]);
        const listApp = [];
        dateArray.map(x => {
            const value = selectedPatientDailyMoods.filter(y => y.dataOraRisposta === x);
            if (value.length === 0) {
                listApp.push({
                    id: 0,
                    idUmore: 0,
                    umore: "#",
                    idEmozione: 0,
                    emozione: "#",
                    commento: "",
                    dataOraRisposta: x,
                    idPatientProfile: window.location.pathname.split('/').pop()
                })
            } else {
                listApp.push(value[0])
            }
        })
        setList(state => [listApp, ...state]);
    }

    // function addEmptySlides() {
    //     for (var i = 0; i < calendarDates.length; i++) {
    //       for (var i = 0; i < selectedPatientDailyMoods.length; i++) {
    //         if (days[i] === selectedPatientDailyMoods.dataOraRisposta[i]) {
    //             setSelectedPatientDailyMoods(oldSelectedPatientDailyMoods => [...oldSelectedPatientDailyMoods, {
    //             umore: "http://localhost:3000/img/mood/OA_icon-umore-1.svg",
    //             emozione: "http://localhost:3000/img/mood/OA_icon-emozione-8.svg",
    //             dataOraRisposta: days[i].value
    //           }])
    //         }
    //       }
    //     }
    //   };

    const handleChangeRange = (e) => {
        const inputValue = e.target.value;
        setDateRange(inputValue);
        
        // let new_date = moment(new Date(startDate)).format();
        // let endDate = moment(new_date).add(dateRange, 'd').format();
        // getDates(startDate, endDate);
    };

    return (
        <>

            <div className="row w-100 align-items-center g-0 g-md-3">
                <div className="col-12 col-md-3">
                    {/* <button className="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#edit">Modifica</button> */}
                </div>
                <div className="col-12 col-md-5">
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="label-inizio">Inizio</span>
                        <input type="date" name="startD" placeholder="Inizio" onChange={handleChangeDate} defaultValue={moment(date).subtract(6, 'days').format("YYYY-MM-DD")} className="form-control form-control-sm" id="captiontest" aria-describedby="label-inizio" />
                    </div>
                </div>
                <div className="col-12 col-md-4">
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="label-settimane">settimane</span>
                        <select className="form-select form-select-sm" id="captiontest" aria-describedby="label-settimane" aria-label="dateRange" name="dateRange" onChange={handleChangeRange} >
                            <option value="7">1</option>
                            <option value="14">2</option>
                            <option value="21">3</option>
                            <option value="28">4</option>
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
                    <PatientMoodSlider patientDailyMoods={list[0]} startDate={startDate} dateRange={dateRange} />
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
