import { Col, Table, Form, Button } from 'react-bootstrap';
import { iconDelete, iconEdit } from './icons';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';
import { patient } from '../helpers/api/api';
import Pagination from '../helpers/pagination';
import { Link } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import * as moment from "moment";
import "moment/locale/it";

// INIZIO MOOD SETTIMANALE

function PatientMoodWeeklyInfo(props) {
    const [loading, setLoading] = useState(false);
    const [moods, setMoods] = useState([]);

    // useEffect(() => {
    //     const fetchPatients = async () => {
    //         setLoading(true);           
    //         await patient.get("GetByDoctor/", JSON.parse(localStorage.getItem("role")).id)
    //         .then((response) => {
    //             if (response.status === 200) {
    //                 setMoods(response.data.dati);
    //         setLoading(false);
    //             }
    //         }).catch((error) => {

    //         });
    //     };
    //     fetchPatients();
    // }, []);



    return (
        <Col>
            {/* moods={moods} */}
            <PatientMoodsWeeklyTable startDate={props.startDate} loading={loading} />
        </Col>
    );
}

const PatientMoodsWeeklyTable = ({ loading, startDate }) => {
    const firstDate = new Date();
    const secondDate = new Date();
    const thirdDate = new Date();
    const fourthDate = new Date();
    firstDate.setDate(startDate.getDate() + 1);
    secondDate.setDate(startDate.getDate() + 2);
    thirdDate.setDate(startDate.getDate() + 3);
    fourthDate.setDate(startDate.getDate() + 4);


    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (
        <>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th></th>
                        <th>{moment(startDate).format("DD/MM/YYYY")}</th>
                        <th>{moment(firstDate).format("DD/MM/YYYY")}</th>
                        <th>{moment(secondDate).format("DD/MM/YYYY")}</th>
                        <th>{moment(thirdDate).format("DD/MM/YYYY")}</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        // moods?.map((m) => <PatientMoodRow key={m.id} mood={m} />)
                        <PatientWeeklyMoodRows />
                    }
                </tbody>
            </Table>

        </>
    );
}

function PatientWeeklyMoodRows(props) {
    // <PatientMoodRowData mood={props.mood} />
    return (<>
        <tr><RowImmagine /></tr>
        <tr><RowColore /></tr>
        <tr><RowCommentoSettimanale /></tr>

    </>);
}

function RowImmagine() {
    return (<>
        <td><strong>Immagine</strong></td>
        <td><img src="http://localhost:3000/dist/img/photo1.png" style={{ width: 150, height: 150}} /></td>
        <td><img src="http://localhost:3000/dist/img/photo2.png" style={{ width: 150, height: 150}} /></td>
        <td><img src="http://localhost:3000/dist/img/photo3.jpg" style={{ width: 150, height: 150}} /></td>
        <td><img src="http://localhost:3000/dist/img/photo4.jpg" style={{ width: 150, height: 150}} /></td>
    </>
    );
}

function RowColore() {
    return (<>
        <td><strong>Colore</strong></td>
        <td><i class="fas fa-laugh-wink"></i></td>
        <td><i class="fas fa-kiss-beam"></i></td>
        <td><i class="far fa-grin-hearts"></i></td>
        <td><i class="fas fa-smile-beam"></i></td>
    </>
    );
}

function RowCommentoSettimanale() {
    return (<>
        <td><strong>Commento</strong></td>
        <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </td>
        <td>Fusce vel lobortis massa, faucibus convallis ligula. </td>
        <td>Fusce nec leo est. In vitae enim ullamcorper sapien tempus luctus eu tempus nulla. </td>
        <td>Donec sodales vitae odio convallis ullamcorper. Vestibulum a tempus mi. </td>
    </>
    );
}


// INIZIO MOOD GIORNALIERO

function PatientMoodDailyInfo(props) {
    const [loading, setLoading] = useState(false);
    const [moods, setMoods] = useState([]);

    // useEffect(() => {
    //     const fetchPatients = async () => {
    //         setLoading(true);           
    //         await patient.get("GetByDoctor/", JSON.parse(localStorage.getItem("role")).id)
    //         .then((response) => {
    //             if (response.status === 200) {
    //                 setMoods(response.data.dati);
    //         setLoading(false);
    //             }
    //         }).catch((error) => {

    //         });
    //     };
    //     fetchPatients();
    // }, []);



    return (
        <Col>
            {/* moods={moods} */}
            <PatientMoodsDailyTable startDate={props.startDate} loading={loading} />
        </Col>
    );
}

// , moods 
const PatientMoodsDailyTable = ({ loading, startDate }) => {
    const firstDate = new Date();
    const secondDate = new Date();
    const thirdDate = new Date();
    const fourthDate = new Date();
    firstDate.setDate(startDate.getDate() + 1);
    secondDate.setDate(startDate.getDate() + 2);
    thirdDate.setDate(startDate.getDate() + 3);
    fourthDate.setDate(startDate.getDate() + 4);


    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (
        <>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th></th>
                        <th>{moment(startDate).format("DD/MM/YYYY")}</th>
                        <th>{moment(firstDate).format("DD/MM/YYYY")}</th>
                        <th>{moment(secondDate).format("DD/MM/YYYY")}</th>
                        <th>{moment(thirdDate).format("DD/MM/YYYY")}</th>
                        <th>{moment(fourthDate).format("DD/MM/YYYY")}</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        // moods?.map((m) => <PatientMoodRow key={m.id} mood={m} />)
                        <PatientMoodRows />
                    }
                </tbody>
            </Table>

        </>
    );
}

function PatientMoodRows(props) {
    // <PatientMoodRowData mood={props.mood} />
    return (<>
        <tr><RowUmore /></tr>
        <tr><RowEmozione /></tr>
        <tr><RowCommento /></tr>

    </>);
}

function RowUmore() {
    return (<>
        <td><strong>Umore</strong></td>
        <td><i class="fas fa-poo"></i></td>
        <td><i class="far fa-grin-squint-tears"></i></td>
        <td><i class="fas fa-poop"></i></td>
        <td><i class="fas fa-laugh-beam"></i></td>
        <td><i class="fas fa-grin-alt"></i></td>
    </>
    );
}

function RowEmozione() {
    return (<>
        <td><strong>Emozione</strong></td>
        <td><i class="fas fa-laugh-wink"></i></td>
        <td><i class="fas fa-kiss-beam"></i></td>
        <td><i class="far fa-grin-hearts"></i></td>
        <td><i class="fas fa-smile-beam"></i></td>
        <td><i class="fas fa-grin-beam-sweat"></i></td>
    </>
    );
}

function RowCommento() {
    return (<>
        <td><strong>Commento</strong></td>
        <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </td>
        <td>Fusce vel lobortis massa, faucibus convallis ligula. </td>
        <td>Fusce nec leo est. In vitae enim ullamcorper sapien tempus luctus eu tempus nulla. </td>
        <td>Donec sodales vitae odio convallis ullamcorper. Vestibulum a tempus mi. </td>
        <td>Ut a tristique nulla, sed vulputate massa. Pellentesque consequat nunc lorem, ut viverra augue feugiat ac.</td>
    </>
    );
}


export { PatientMoodDailyInfo, PatientMoodWeeklyInfo };