import { useState, useEffect } from 'react';
import { Tabs, Tab, Form, Button, Col, Row } from 'react-bootstrap';
import { PatientRegistry } from "./PatientRegistry"
import { PatientProfile } from "./PatientProfile"
import { AdverseEventsInfo } from "./AdverseEventsTable"
import { EpilepticSeizuresInfo } from "./EpilepticSeizuresComponent"
import { BloodTestsInfo } from "./BloodTestsComponent"
import NewTherapy from './NewTherapy';
import { patient } from '../helpers/api/api';
import { entitiesLabels, message } from '../helpers/Constants';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { PatientMoodWeeklyInfo } from './PatientMoodComponent';
import "react-datepicker/dist/react-datepicker.css";
import * as moment from "moment";
import "moment/locale/it";

function PatientWeeklyMood(props) {
    var date = new Date();
    date.setDate(date.getDate() - 4);
    const [startDate, setStartDate] = useState(date);
    const [endDate, setEndDate] = useState();

    const handleChange = (e) => {
        const inputValue = e.target.value;
        var sdate = new Date(inputValue);
        var edate = new Date();
        edate.setDate(sdate.getDate() + 4);
        setStartDate(sdate);
        setEndDate(edate);
    };


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
                            <input type="date" className="form-control form-control-sm" id="captiontest" aria-describedby="label-inizio" />
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
                        {/* Slider main container */}
                        <div className="swiper weekly-mood-carousel">
                            {/* Additional required wrapper */}
                            <div className="swiper-wrapper">
                                {/* Slides */}
                                <div className="swiper-slide">
                                    <p className="date">31/01/22 - 06/02/22</p>
                                    <div className="upper-wrapper">
                                        <img src="https://picsum.photos/800/600/" />
                                    </div>
                                    <div className="row-label" data-label="Immagine" />
                                    <div className="lower-wrapper">
                                        <img src="./img/mood/OA_icon-colore-1.svg" />
                                    </div>
                                    <div className="row-label" data-label="Colore" />
                                </div>
                                <div className="swiper-slide">
                                    <p className="date">31/01/22 - 06/02/22</p>
                                    <div className="upper-wrapper">
                                        <img src="https://picsum.photos/800/601/" />
                                    </div>
                                    <div className="row-label" data-label="Immagine" />
                                    <div className="lower-wrapper">
                                        <img src="./img/mood/OA_icon-colore-2.svg" />
                                    </div>
                                    <div className="row-label" data-label="Colore" />
                                </div>
                                <div className="swiper-slide">
                                    <p className="date">31/01/22 - 06/02/22</p>
                                    <div className="upper-wrapper">
                                        <img src="https://picsum.photos/800/602/" />
                                    </div>
                                    <div className="row-label" data-label="Immagine" />
                                    <div className="lower-wrapper">
                                        <img src="./img/mood/OA_icon-colore-3.svg" />
                                    </div>
                                    <div className="row-label" data-label="Colore" />
                                </div>
                                <div className="swiper-slide">
                                    <p className="date">31/01/22 - 06/02/22</p>
                                    <div className="upper-wrapper">
                                        <img src="https://picsum.photos/800/603/" />
                                    </div>
                                    <div className="row-label" data-label="Immagine" />
                                    <div className="lower-wrapper">
                                        <img src="./img/mood/OA_icon-colore-4.svg" />
                                    </div>
                                    <div className="row-label" data-label="Colore" />
                                </div>
                                <div className="swiper-slide">
                                    <p className="date">31/01/22 - 06/02/22</p>
                                    <div className="upper-wrapper">
                                        <img src="https://picsum.photos/800/604/" />
                                    </div>
                                    <div className="row-label" data-label="Immagine" />
                                    <div className="lower-wrapper">
                                        <img src="./img/mood/OA_icon-colore-5.svg" />
                                    </div>
                                    <div className="row-label" data-label="Colore" />
                                </div>
                                <div className="swiper-slide">
                                    <p className="date">31/01/22 - 06/02/22</p>
                                    <div className="upper-wrapper">
                                        <img src="https://picsum.photos/800/605/" />
                                    </div>
                                    <div className="row-label" data-label="Immagine" />
                                    <div className="lower-wrapper">
                                        <img src="./img/mood/OA_icon-colore-6.svg" />
                                    </div>
                                    <div className="row-label" data-label="Colore" />
                                </div>
                                <div className="swiper-slide">
                                    <p className="date">31/01/22 - 06/02/22</p>
                                    <div className="upper-wrapper">
                                        <img src="https://picsum.photos/800/606/" />
                                    </div>
                                    <div className="row-label" data-label="Immagine" />
                                    <div className="lower-wrapper">
                                        <img src="./img/mood/OA_icon-colore-7.svg" />
                                    </div>
                                    <div className="row-label" data-label="Colore" />
                                </div>
                                <div className="swiper-slide">
                                    <p className="date">31/01/22 - 06/02/22</p>
                                    <div className="upper-wrapper">
                                        <img src="https://picsum.photos/800/607/" />
                                    </div>
                                    <div className="row-label" data-label="Immagine" />
                                    <div className="lower-wrapper">
                                        <img src="./img/mood/OA_icon-colore-8.svg" />
                                    </div>
                                    <div className="row-label" data-label="Colore" />
                                </div>
                                <div className="swiper-slide">
                                    <p className="date">31/01/22 - 06/02/22</p>
                                    <div className="upper-wrapper">
                                        <img src="https://picsum.photos/800/608/" />
                                    </div>
                                    <div className="row-label" data-label="Immagine" />
                                    <div className="lower-wrapper">
                                        <img src="./img/mood/OA_icon-colore-9.svg" />
                                    </div>
                                    <div className="row-label" data-label="Colore" />
                                </div>
                                <div className="swiper-slide">
                                    <p className="date">31/01/22 - 06/02/22</p>
                                    <div className="upper-wrapper">
                                        <img src="https://picsum.photos/800/609/" />
                                    </div>
                                    <div className="row-label" data-label="Immagine" />
                                    <div className="lower-wrapper">
                                        <img src="./img/mood/OA_icon-colore-10.svg" />
                                    </div>
                                    <div className="row-label" data-label="Colore" />
                                </div>
                            </div>
                            {/* If we need pagination */}
                            <div className="swiper-pagination" />
                            {/* If we need navigation buttons */}
                            <div className="swiper-button-prev" />
                            <div className="swiper-button-next" />
                        </div>
                    </div>
                </div>
                <div className="row w-100 mt-5 justify-content-center align-items-start g-0 g-md-3">
                    <div className="col-12">
                        <div className="small info">Kumar A, Wang M, Riehm A, Yu E, Smith T, Kaplin A | An Automated Mobile Mood Tracking Technology (Mood 24/7): Validation Study | JMIR Ment Health 2020;7(5):e16237 | https://mental.jmir.org/2020/5/e16237 | doi: 10.2196/16237 | PMID: 32432558</div>
                    </div>
                </div>
            </div>

            {/* <Row>
                <div className="col-md-4">
                    <Form.Group controlId="startDate">
                        <Form.Label>Inizio</Form.Label>
                        <Form.Control type="date" name="startD" placeholder="Inizio" onChange={handleChange} />
                    </Form.Group>
                </div>

                <div className="col-md-4">
                    <Form.Group controlId="endDate">
                        <Form.Label>Fine</Form.Label>
                        <Form.Control type="text" name="endD" placeholder="Fine" value={moment(endDate).format("DD/MM/YYYY")} disabled/>
                    </Form.Group>
                </div>
            </Row>
            <Row className='col-12 pt-4' >
                    <Col>
                        <PatientMoodWeeklyInfo startDate={startDate}  />
                    </Col>
                </Row> */}
        </>

    );
}


export { PatientWeeklyMood }
