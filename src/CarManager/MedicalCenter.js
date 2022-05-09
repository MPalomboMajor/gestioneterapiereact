import React, { Component } from 'react';
import { Container, Row, Table, Form, Button,Modal } from 'react-bootstrap';
import { user, medico } from '../helpers/api/api';
import { RowCustom } from "../Doctor/PatientComponent";
import Pagination from '../helpers/pagination';

export class MedicalCenter extends Component {
    medicalCenterProps = () => ({
        id:0,
        nomeCentro:'',
        isAbilitato:false,
        openModal:'',
    })
    constructor(props) {
        super(props);
        this.state = {
            listMedicalCenter: [],
            currentPage: 1,
            itemPerPage: 5,
            isOpenModal:false,
            isUpdate:false,
            medicalCenterDto:{ ...this.medicalCenterProps(),}
            
        }
        this.GetListMedicalCenter = this.GetListMedicalCenter.bind(this);
    }
    componentDidMount() {
        this.GetListMedicalCenter();
    }
    GetListMedicalCenter = () => {
        medico.getAll("GetCentriMedici")
            .then(async (response) => {
                if (response.status == 200) {
                    this.setState({ listMedicalCenter: response.data.dati });
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
                    this.GetListMedicalCenter();
                }
            }).catch((error) => {

            })
            .finally(() => {
            });
    }
    openModal = (el) => {
        this.setState({ medicalCenterDto:{ ...this.medicalCenterProps()}, isOpenModal: true , isUpdate: true });
        var element =  this.state.listMedicalCenter.filter((x) => x.id==el);
        this.setState({ medicalCenterDto: element[0] });
    }
    openModalNew = () => {
        this.setState({ medicalCenterDto:{ ...this.medicalCenterProps()}, isOpenModal: true , isUpdate: false });
    }
    handleClose = () => {
        this.GetListMedicalCenter();
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
    setPrevPage = (n) => {
        this.setState({ currentPage: n-1 });
    }
    setNexPage = (n) => {
        this.setState({ currentPage: n +1 });
    }
    render() {
        const indexOfLastPatient = this.state.currentPage * this.state.itemPerPage;
        const indexOfFirstPatient = indexOfLastPatient - this.state.itemPerPage;
        const currentItem = this.state.listMedicalCenter.slice(indexOfFirstPatient, indexOfLastPatient);
        const element = {};
        currentItem.map((pa) => { pa.openModal = 'openModal'; });
        return (
            <Container className="">
                <Row className='col-12 pt-4' >
                    <div className='col-12'>
                        <h2>Lista Centri Medici</h2>
                    </div>
                </Row>
                <Row className='col-12 pt-4' >
                    <Row className='col-12 pt-4' >
                        <div className='col-12'>
                            <Button onClick={() => this.openModalNew()}>Aggiungi Centro Medico</Button>
                        </div>
                    </Row>
                    <Row className='col-12 pt-4' >
                    </Row>
                    <div className="table-wrapper">
                        <Table className="table custom">
                        <thead>
                            <tr>
                                <th>Centro Medico</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                currentItem.map((pa) => <RowCustom colums={["nomeCentro", "openModal"]} elementUpdate={"openModal"} reference={'id'} update={(el) => this.openModal(el)} item={pa} />)
                            }
                        </tbody>
                    </Table>
                    </div>
                    <Pagination
                                patientsPerPage={5}
                                totalPatients={this.state.listMedicalCenter.length}
                                paginate={(pageNumber) => this.setCurrentPage(pageNumber)}
                                currentPage={this.state.currentPage}
                                prevPage={(pageNumber) => this.setPrevPage(pageNumber)}
                            nextPage={(pageNumber) => this.setNexPage(pageNumber)}
                            />
                           
                </Row>
                <Modal
                    show={this.state.isOpenModal}
                    onHide={() => this.handleClose()}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.isUpdate ?'Modifica Centro Medico' : 'Aggiungi Centro Medico'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Form.Group className="col-12 mb-3" controlId="formBasicEmail">
                                <Form.Label className="text-">Nome Centro</Form.Label>
                                {this.state.isUpdate ?
                                                <Form.Check
                                                    type="switch"
                                                    defaultChecked={this.state.medicalCenterDto.isAbilitato}
                                                    id="custom-switch"
                                                    onClick={() => this.activeCenter()}
                                                    label={!this.state.medicalCenterDto.isAbilitato ? 'Attiva': 'Disattiva'}
                                                /> : ''
                                            }
                                <Form.Control id="nomeCentro" alt="medicalCenterDto" onChange={this.handleChange} value={this.state.medicalCenterDto.nomeCentro ?this.state.medicalCenterDto.nomeCentro : '' }  name="nomeCentro" placeholder="Inserisci centro" />
                            </Form.Group>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.handleClose()}>
                            Chiudi
                        </Button>
                        <Button variant="primary" onClick={() => this.sedMedicalCenter()}>{this.state.isUpdate ?'Modifica' : 'Aggiungi'}</Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        )
    }
}

export default MedicalCenter
