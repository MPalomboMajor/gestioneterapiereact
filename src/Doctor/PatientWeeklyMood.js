import { useState, useEffect } from 'react';
import { Tabs, Tab, Form, Button, Row, Col } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as moment from "moment";
import { patient } from '../helpers/api/api';
import { entitiesLabels, message } from '../helpers/Constants';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { PatientMoodDailyInfo } from './PatientMoodComponent';
import PatientMoodWeeklySlider from './PatientMoodWeeklySlider';


function PatientWeeklyMood(props) {
    const date = new Date();
    const [startDate, setStartDate] = useState(date);
    const [dateRange, setDateRange] = useState("7");
    const [selectedPatientWeeklyMoods, setSelectedPatientWeeklyMoods] = useState(props.patientWeeklyMoods);
    const [calendarDates, setCalendarDates] = useState([]);
    const [list, setList] = useState([]);

    // useEffect(() => {
    //     const fetchWeeklyMoodList = async () => {
    //         var initDate = moment().startOf('isoWeek');
    //         var endDate = moment().endOf('isoWeek');
    //         var range = moment(startDate).isBetween(initDate, endDate, null, '()');

    //         const listInitDates = [initDate];
    //         const listEndDates = [endDate];
    //         for (var i = 0; i < 4; i++) {
    //             listInitDates.push(moment(initDate).subtract(7, 'days'));
    //             listEndDates.push(moment(endDate).subtract(7, 'days'))
    //             initDate = listInitDates[i + 1];
    //             endDate = listEndDates[i + 1];
    //         }
    //         console.log(listInitDates);
    //         console.log(listEndDates);

    //         const listApp = [];

    //         for (var i = 0; i < listInitDates.length; i++){
    //             selectedPatientWeeklyMoods.map(x => {
    //                 if (moment(x.dataOraRisposta).isBetween(listInitDates[i], moment(listInitDates[i]).add(7, 'days'), null, '()')) {
    //                     listApp.push(x)
    //                 } else {
    //                     listApp.push({
    //                         id: 0,
    //                         paesaggio: "#",
    //                         immaginePersonale: "#",
    //                         colore: "#4FAEEE",                          
    //                         commento: "",
    //                         startDate: listInitDates[i],
    //                         endDate: moment(listInitDates[i]).add(7, 'days'),
    //                         idPatientProfile: window.location.pathname.split('/').pop()
    //                     })

    //                 }
    //                 // const value = selectedPatientWeeklyMoods.filter(y => y.dataOraRisposta === x);
    //                 // if (value.length === 0) {
    //                 //     listApp.push({
    //                 //         id: 0,
    //                 //         idUmore: 0,
    //                 //         umore: "#",
    //                 //         idEmozione: 0,
    //                 //         emozione: "#",
    //                 //         commento: "",
    //                 //         dataOraRisposta: x,
    //                 //         idPatientProfile: window.location.pathname.split('/').pop()
    //                 //     })
    //                 // } else {
    //                 //     listApp.push(value[0])
    //                 // }
    //             })
    //         }
    //         console.log(listApp);
    //         setList(state => [listApp, ...state]);




    //         // console.log('Start Date:' + initDate.format('MM/DD/YYYY'));
    //         // console.log('End Date:' + endDate.format('MM/DD/YYYY'));



    //         // let new_date = moment(new Date(startDate)).format();
    //         // let endDate = moment(new_date).add(dateRange, 'd').format();
    //         // getDates(startDate, endDate);
    //     };
    //     fetchWeeklyMoodList();
    // }, [dateRange]);




    const handleChangeDate = (e) => {
        const inputValue = e.target.value;
        var dateObj = new Date(inputValue);
        var momentObj = moment(dateObj);
        //var momentString = momentObj.format('YYYY-MM-DD'); 
        var initDate = momentObj.startOf('isoWeek');
        var endDate = momentObj.endOf('isoWeek');


        const listInitDates = [initDate];
        const listEndDates = [endDate];

        for (var i = 0; i < 4; i++) {
            listInitDates.push(moment(initDate).add(7, 'days'));
            listEndDates.push(moment(endDate).add(7, 'days'))
            initDate = listInitDates[i + 1];
            endDate = listEndDates[i + 1];
        }
        console.log(listInitDates);
        console.log(listEndDates);
        getListWeeks(listInitDates);

    };


    //const compareDate = moment("15/02/2013", "DD/MM/YYYY");  
    // const startDate = moment("12/01/2013", "DD/MM/YYYY");  
    // const endDate = moment("15/01/2013", "DD/MM/YYYY");  
    // const isBetween = compareDate.isBetween(startDate, endDate)  

    function getListWeeks(listInitDates) {
        setList([]);
        
        const listApp = [];
        listInitDates?.map(y => {
            let dateA = moment(y);
            let dateB = moment(y).add(7, 'days');
            let obj = props.patientWeeklyMoods?.filter(x => moment(x.dataOraRisposta, 'DD-MM-YYYY').toDate() >= dateA.toDate() && moment(x.dataOraRisposta, 'DD-MM-YYYY').toDate() <= dateB.toDate())
            if (obj.length != 0) {
                obj[0].startDate = dateA;
                obj[0].endDate = dateB;
                listApp.push(obj[0])
            } else {
                listApp.push({
                    id: 0,
                    paesaggio: "#",
                    immaginePersonale: "#",
                    colore: "#4FAEEE",
                    commento: "",
                    startDate: y,
                    endDate: moment(y).add(7, 'days'),
                    idPatientProfile: window.location.pathname.split('/').pop()
                })
            }

        })
        console.log(listApp);
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

    // const handleChangeRange = (e) => {
    //     const inputValue = e.target.value;
    //     setDateRange(inputValue);

    //     // let new_date = moment(new Date(startDate)).format();
    //     // let endDate = moment(new_date).add(dateRange, 'd').format();
    //     // getDates(startDate, endDate);
    // };


    return (
        <>
            <div>
                <div className="row align-items-center g-0 g-md-3">
                    <div className="col-12 col-md-3">
                        {/* <button className="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#edit">Modifica</button> */}
                    </div>
                    <div className="col-12 col-md-5">
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="label-inizio">Inizio</span>
                            <input type="date" className="form-control form-control-sm" id="captiontest" aria-describedby="label-inizio" onChange={handleChangeDate} />
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="label-settimane">settimane</span>
                            <select className="form-select form-select-sm" id="captiontest" aria-describedby="label-settimane">
                                <option value={5}>5</option>
                                <option value={10} selected>10</option>
                                <option value={15}>15</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="row w-100 mt-5 justify-content-center align-items-center g-0 g-md-3">
                    <div className="col-2 d-none d-md-block">
                        <div className="label label-primary w-100 mt-4 mb-5">Immagine</div>
                        <div className="label label-primary w-100 mt-3">Colore</div>
                    </div>


                    <div className="col-12 col-md-10">
                        <PatientMoodWeeklySlider patientWeeklyMoods={list[0]} />
                    </div>
                    <div className="row w-100 mt-5 justify-content-center align-items-start g-0 g-md-3">
                        <div className="col-12">
                            <div className="small info">Kumar A, Wang M, Riehm A, Yu E, Smith T, Kaplin A | An Automated Mobile Mood Tracking Technology (Mood 24/7): Validation Study | JMIR Ment Health 2020;7(5):e16237 | https://mental.jmir.org/2020/5/e16237 | doi: 10.2196/16237 | PMID: 32432558</div>
                        </div>
                    </div>
                </div>
            </div>


        </>

    );
}


export { PatientWeeklyMood }
