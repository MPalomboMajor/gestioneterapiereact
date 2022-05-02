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
            <Row>
                <div className="col-md-4">
                    <Form.Group controlId="startDate">
                        <Form.Label>Inizio</Form.Label>
                        <Form.Control type="date" name="startD" placeholder="Inizio" onChange={handleChange} />
                    </Form.Group>
                </div>
                <Form.Group className="mb-3" controlId="dateRange">
                            <Form.Label>Contesto</Form.Label>
                            <Form.Select aria-label="dateRange" name="dateRange" onChange={(event) => {
                                // setNewEpilepticSeizures(prevEpilepticSeizure => ({
                                //     ...prevEpilepticSeizure,
                                //     elencoContestualita: [{ ...prevEpilepticSeizure.elencoContestualita[0], contesto: parseInt(event.target.value) }]
                                // }));
                            }} >
                                <option></option>
                                <option value="1">1 settimana</option>
                                <option value="2">2 settimane</option>
                                <option value="3">3 settimane</option>
                                <option value="4">4 settimane</option>
                            </Form.Select>
                            {/* <Form.Control type="text" name="contesto" placeholder="Contesto" onChange={(event) => {
                                setNewEpilepticSeizures(prevEpilepticSeizure => ({
                                    ...prevEpilepticSeizure,
                                    elencoContestualita: [{ ...prevEpilepticSeizure.elencoContestualita[0], contesto: parseInt(event.target.value) }]
                                }));
                            }} /> */}
                        </Form.Group>
                {/* <div className="col-md-4">
                    <Form.Group controlId="endDate">
                        <Form.Label>Fine</Form.Label>
                        <Form.Control type="text" name="endD" placeholder="Fine" value={moment(endDate).format("DD/MM/YYYY")} disabled/>
                    </Form.Group>
                </div> */}
            </Row>
            <Row className='col-12 pt-4' >
                    <Col>
                        <PatientMoodDailyInfo startDate={startDate}  />
                    </Col>
                </Row>
        </>

    );
}


export { PatientDailyMood }
