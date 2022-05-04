import { Col, Table, Form, Button } from 'react-bootstrap';
import { iconDelete, iconEdit } from './icons';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';
import { patient } from '../helpers/api/api';
import Pagination from '../helpers/pagination';
import { Link } from 'react-router-dom';
import { role } from '../helpers/Constants';
import { PatchMinus } from 'react-bootstrap-icons';

function PatientInfo() {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [patientsPerPage] = useState(3);

    useEffect(() => {
        const fetchPatients = async () => {
            setLoading(true);
            if (JSON.parse(localStorage.getItem("role")).idRole == role.CAREMANAGER) {
                await patient.getAll("GetAll")
                    .then((response) => {
                        if (response.status === 200) {
                            setPatients(response.data.dati);
                            setLoading(false);
                        }
                    }).catch((error) => {

                    });
            } else {
                await patient.get("GetByDoctor/", JSON.parse(localStorage.getItem("role")).id)
                    .then((response) => {
                        if (response.status === 200) {
                            setPatients(response.data.dati);
                            setLoading(false);
                        }
                    }).catch((error) => {

                    });
            }

        };
        fetchPatients();
    }, []);


    // Get current patient
    const indexOfLastPatient = currentPage * patientsPerPage;
    const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
    const currentPatients = patients?.slice(indexOfFirstPatient, indexOfLastPatient);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (<>
        
            <PatientTable patients={currentPatients} loading={loading} />
            <Pagination
                patientsPerPage={patientsPerPage}
                totalPatients={patients?.length}
                paginate={paginate}
            />
       
    </>
    );
}

const PatientTable = ({ patients, loading }) => {

    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (
        <>
            <div class="table-wrapper">
                <table class="table custom">
                    <thead>
                        <tr>
                            <th scope="col">Codice Paziente</th>
                            <th scope="col">Codice Fiscale</th>
                            <th scope="col">Cognome</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Telefono</th>
                            <th scope="col">Email</th>
                            <th scope="col">Stato Paziente</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            patients?.map((pa) => <PatientRow key={pa.codicePaziente} patient={pa} />)
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
}

function PatientRow(props) {
    return <tr><PatientRowData patient={props.patient} /></tr>
}

function PatientRowData(props) {
    return (<>
        <td><Link to={`/PatientRegistry/${props.patient.id}`} class="btn btn-primary btn-sm">{props.patient.codicePaziente}</Link></td>
        <td>{props.patient.fiscalCode}</td>
        <td>{props.patient.surName}</td>
        <td>{props.patient.name}</td>
        <td>{props.patient.phoneNumber}</td>
        <td>{props.patient.email}</td>
        <td>{props.patient.isActive === 0 ? "Non attivo" : "Attivo"}</td>
    </>
    );
}

function PatientAllergyRow(props) {
    return <tr><PatientAllergyRowData allergy={props.allergy} deleteF={props} /></tr>
}

function PatientAllergyRowData(props) {

    return (<>

        <td>{props.allergy}</td>
        <td ><Button onClick={() => props.deleteF.delete(props.deleteF.id)} className='btn btn-danger bi bi-trash'></Button></td>
    </>
    );
}



function RowCustom(props) {
    const listValue = [];
    {
        props.colums.map((item) => {

            //CREA ELEMENTO PER LINK
            if (props.link === item) {
                var element = {};
                element.id = props.item[String(props.reference)];
                element.value = props.item[item];
                element.controller = props.controller;
                element.isLink = true;
                element.isUpdate = false;
                element.isDelete = false;
                listValue.push({ element });
            }
            //RICHIAMA FUNZIONE PADRE (UPDATE)
            else if (props.elementUpdate === item) {
                var element = {};
                element.id = props.item[String(props.reference)];
                element.value = props.item[item];
                element.controller = props.controller;
                element.isLink = false;
                element.isUpdate = true;
                element.isDelete = false;
                listValue.push({ element });
            }
            //RICHIAMA FUNZIONE PADRE (DELETE)
            else if (props.elementDelete === item) {
                var element = {};
                element.id = props.item[String(props.reference)];
                element.value = props.item[item];
                element.controller = props.controller;
                element.isLink = false;
                element.isUpdate = false;
                element.isDelete = true;
                listValue.push({ element });
            }
            //MOSTRA IL VALORE
            else {
                var object = item.split('.');
                var element = {};
                element.id = props.item[String(props.reference)];
                element.controller = props.controller;
                if (object.length == 1) {
                    element.value = props.item[item];
                }
                if (object.length == 2) {
                    element.value = props.item[object[0]][object[1]];
                }
                if (object.length == 3) {
                    element.value = props.item[object[0]][object[1]][object[2]];
                }

                element.isLink = false;
                element.isUpdate = false;
                element.isDelete = false;
                listValue.push({ element });
            }
        })
    }
    return (<tr>
        {listValue.map((el) =>

            el.element.isLink ?
                <td><Link to={`/${el.element.controller}/${el.element.id}`}>{el.element.value != null ? String(el.element.value) : ''}</Link></td>
                :
                el.element.isUpdate ?
                    <td ><Button onClick={() => props.update(el.element.id)} className='btn btn-primary bi bi-pencil-square'></Button></td>
                    :
                    el.element.isDelete ?
                        <td ><Button onClick={() => props.delete(el.element.id)} className='btn btn-danger bi bi-trash'></Button></td>
                        :
                        <td>{el.element.value != null ? String(el.element.value) : ''}</td>


        )}
    </tr>);
}
export { PatientInfo, PatientRow, PatientAllergyRow, RowCustom };