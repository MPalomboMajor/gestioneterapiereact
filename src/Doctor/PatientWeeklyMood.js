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
            <Row>
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
                </Row>
        </>

    );
}


export { PatientWeeklyMood }
