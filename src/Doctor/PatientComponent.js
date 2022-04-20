import { Col, Table, Form, Button } from 'react-bootstrap';
import { iconDelete, iconEdit } from './icons';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';
import { patient } from '../helpers/api/api';
import Pagination from '../helpers/pagination';
import { Link } from 'react-router-dom';

function PatientInfo() {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [patientsPerPage] = useState(3);

    useEffect(() => {
        const fetchPatients = async () => {
            setLoading(true);
            await patient.getAll("Get/")
            .then((response) => {
                if (response.status === 200) {
                    setPatients(response.data.dati);
            setLoading(false);
                }
            }).catch((error) => {
                
            });
        };
        fetchPatients();
    }, []);

    // Get current patient
    const indexOfLastPatient = currentPage * patientsPerPage;
    const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
    const currentPatients = patients.slice(indexOfFirstPatient, indexOfLastPatient);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (<>
        <Col>
            <PatientTable patients={currentPatients} loading={loading} />
            <Pagination
                patientsPerPage={patientsPerPage}
                totalPatients={patients.length}
                paginate={paginate}
            />
        </Col>   
    </>
    );
}

const PatientTable= ({ patients, loading }) => {

    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (
        <>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Codice Paziente</th>
                        <th>Codice Fiscale</th>
                        <th>Cognome</th>
                        <th>Nome</th>
                        <th>Telefono</th>
                        <th>Email</th>
                        <th>Stato Paziente</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {
                        patients.map((pa) => <PatientRow key={pa.codicePaziente} patient={pa} />)
                    }
                </tbody>
            </Table>

        </>
    );
}

function PatientRow(props) {
    return <tr><PatientRowData patient={props.patient} /></tr>
}

function PatientRowData(props) {
    return (<>
        <td><Link to={`/PatientRegistry/${props.patient.id}`}>{props.patient.codicePaziente}</Link></td>
        <td>{props.patient.fiscalCode}</td>
        <td>{props.patient.surName}</td>
        <td>{props.patient.name}</td>
        <td>{props.patient.phoneNumber}</td>
        <td>{props.patient.email}</td>
        <td>{props.patient.isActive === 0 ? "Non attivo" : "Attivo"}</td>
    </>
    );
}




export { PatientInfo, PatientRow };