import { Col, Table, Form, Button, Modal, Row } from 'react-bootstrap';
import { iconDelete, iconEdit } from './icons';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { patient } from '../helpers/api/api';
import { path } from '../helpers/Constants';
import { Link } from 'react-router-dom';
import { entitiesLabels, message } from '../helpers/Constants';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Pagination from '../helpers/pagination';

function DifferentFilesInfo(props) {
    const [patientId, setPatientId] = useState(window.location.pathname.split('/').pop());
    const [medicalExaminations, setMedicalExaminations] = useState([]);
    const [patientProfile, setPatientProfile] = useState([]);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [medicalExaminationsPerPage] = useState(8);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const fetchPatient = async () => {
            await patient.get("Get/", patientId)
                .then((response) => {
                    if (response.status === 200) {
                        setPatientProfile(response.data.dati);
                    }
                }).catch((error) => {

                });
        };
        fetchPatient();
    }, []);

    useEffect(() => {
        const fetchMedicalExaminations = async () => {
            setLoading(true);
            await patient.get("MedicalExams/", patientId)
                .then((response) => {
                    if (response.status === 200) {
                        setMedicalExaminations(response.data.dati);
                        setLoading(false);
                    }
                }).catch((error) => {

                });
        };
        fetchMedicalExaminations();
    }, [show]);

    // Get current
    const indexOfLastmedicalExamination = currentPage * medicalExaminationsPerPage;
    const indexOfFirstmedicalExamination = indexOfLastmedicalExamination - medicalExaminationsPerPage;
    const currentmedicalExaminations = medicalExaminations?.slice(indexOfFirstmedicalExamination, indexOfLastmedicalExamination);

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
            <h4 className="h4">Altri file inviati</h4>
            <DifferentFilesExtTable noImgsNames={props.noImgsNames} />
        </>
    );
}

function DifferentFilesExtTable(props) {

    return (
        <>
            <div className="table-wrapper custom-scrollbar">
                <table className="table custom">
                    <thead>
                        <tr>
                            <th scope="col">Nome file</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.noImgsNames?.map((ev) => <DifferentFileExtRow key={ev.id} noImgsName={ev} />)
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
}

function DifferentFileExtRow(props) {
    return <tr><DifferentFileExtRowData noImgsName={props.noImgsName} /> 
    {/* <RowControl medicalExaminationId={props.medicalExamination.id} deleteMedicalExamination={props.deleteMedicalExamination} /> */}
    </tr>
}

function DifferentFileExtRowData(props) {

    return (<>
        <td>{props.noImgsName.split('/').pop()}</td>
        
        <td><a href={props.noImgsName} target='_blank' >Visualizza</a></td>
    </>
    );
}

function RowControl(props) {
    //return <td> <span onClick={() => props.deleteMedicalExamination(props.medicalExaminationId)}><button className="btn btn-secondary me-3" id>Elimina</button></span></td>;
}

export { DifferentFilesInfo };