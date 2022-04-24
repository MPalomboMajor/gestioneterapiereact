import React, { Component } from 'react';
import { Container, Row, Table, Form, Button,Modal } from 'react-bootstrap';
import { user, medico, patient } from '../helpers/api/api';
import { RowCustom } from "../Doctor/PatientComponent";
import Pagination from '../helpers/pagination';

export class ContactInfo extends Component {
    medicalCenterProps = () => ({
        id:0,
        nomeCentro:'',
        isAbilitato:false,
        openModal:'',
    })
    constructor(props) {
        super(props);
        this.state = {
            listPatient: [],
            currentPage: 1,
            itemPerPage: 5,
            isOpenModal:false,
            isUpdate:false,
            medicalCenterDto:{ ...this.medicalCenterProps(),}
            
        }
        this.GetListPatient = this.GetListPatient.bind(this);
    }
    componentDidMount() {
        this.GetListPatient();
    }
    GetListPatient = () => {
        patient.getAll("Get")
            .then(async (response) => {
                if (response.status == 200) {
                    this.setState({ listPatient: response.data.dati });
                }
            }).catch((error) => {

            })
            .finally(() => {
            });
    }
    sedMedicalCenter = () => {
        medico.post("CentroMedico", this.state.medicalCenterDto)
            .then(async (response) => {
                if (response.status == 200) {
                    
                    this.setState({ medicalCenterDto:{ ...this.medicalCenterProps()}, isOpenModal: false , isUpdate: false });
                    this.GetListPatient();
                }
            }).catch((error) => {

            })
            .finally(() => {
            });
    }
    openModal = (el) => {
        this.setState({ medicalCenterDto:{ ...this.medicalCenterProps()}, isOpenModal: true , isUpdate: true });
        var element =  this.state.listPatient.filter((x) => x.id==el);
        this.setState({ medicalCenterDto: element[0] });
    }
    openModalNew = () => {
        this.setState({ medicalCenterDto:{ ...this.medicalCenterProps()}, isOpenModal: true , isUpdate: false });
    }
    handleClose = () => {
        this.GetListPatient();
        this.setState({ medicalCenterDto:{ ...this.medicalCenterProps()}, isOpenModal: false , isUpdate: false });
    }
    activeCenter = () => {
        const inputValue = this.state.medicalCenterDto.isAbilitato ? false : true;
        this.updateState('isAbilitato', inputValue, 'medicalCenterDto');
    }
    handleChange = (el) => {
        let objName = el.target.alt;
        const inputName = el.target.name;
        const inputValue = el.target.value;
        this.updateState(inputName, inputValue, objName);
    };

    updateState = (inputName, inputValue, objName) => {
        const statusCopy = { ...this.state };
        statusCopy[objName][inputName] = inputValue;

        this.setState(statusCopy);
    };
    setCurrentPage = (n) => {
        this.setState({ currentPage: n });
    }
    render() {
        const indexOfLastPatient = this.state.currentPage * this.state.itemPerPage;
        const indexOfFirstPatient = indexOfLastPatient - this.state.itemPerPage;
        const currentItem = this.state.listPatient.slice(indexOfFirstPatient, indexOfLastPatient);
        const element = {};
        currentItem.map((pa) => { pa.openModal = 'openModal'; });
        return (
            <Container className="">
                <Row className='col-12 pt-4' >
                    <Row className='col-12 pt-4' >
                    </Row>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>Codice Paziente </th>
                                <th>Codice Fiscale</th>
                                <th>Cognome</th>
                                <th>Nome</th>
                                <th>Medico</th>
                                <th>Telefono</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                currentItem.map((pa) => <RowCustom colums={["codicePaziente", "fiscalCode", "surName", "name" , "Medico", "phoneNumber","email"]} link={'codicePaziente'} reference={'codicePaziente'} controller={'ContactInfoPatient'}   item={pa} />)
                            }
                        </tbody>
                    </Table>
                    <Pagination
                                patientsPerPage={3}
                                totalPatients={this.state.listPatient.length}
                                paginate={(pageNumber) => this.setCurrentPage(pageNumber)}
                            />
                </Row>
            </Container>
        )
    }
}

export default ContactInfo
