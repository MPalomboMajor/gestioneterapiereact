import React, { Component } from 'react';
import { Container, Row, Table, Form, Button,Modal } from 'react-bootstrap';
import { user, medico } from '../helpers/api/api';
import { RowCustom } from "../Doctor/PatientComponent";
import Pagination from '../helpers/pagination';
export class MedicalCenter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listMedicalCenter: [],
            currentPage: 1,
            itemPerPage: 5,
            isOpenModal:false,
            medicalCenterDto:{
                id:0,
                nomeCentro:'',
                isAbilitato:false,
                openModal:'',
            }
            
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
    openModal = (el) => {

        var element =  this.state.listMedicalCenter.filter((x) => x.id==el);
        this.setState({ medicalCenterDto: element[0] });
        this.setState({ isOpenModal: true });
    }
    openModalNew = () => {
        this.setState({ isOpenModal: true });
    }
    handleClose = () => {
        this.setState({ isOpenModal: false });
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
                    <Table striped bordered hover size="sm">
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
                </Row>
                <Modal
                    show={this.state.isOpenModal}
                    onHide={() => this.handleClose()}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Aggiungi Centro Medico</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Form.Group className="col-12 mb-3" controlId="formBasicEmail">
                                <Form.Label className="text-">Nome Centro</Form.Label>
                                <Form.Control id="nomeFarmaco" alt="allergiesDTO" value={this.state.medicalCenterDto.nomeCentro ?this.state.medicalCenterDto.nomeCentro : '' }  name="nomeFarmaco" placeholder="Inserisci farmaco" />
                            </Form.Group>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.handleClose()}>
                            Chiudi
                        </Button>
                        <Button variant="primary" onClick={() => this.AddAllergies()}>Aggiungi</Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        )
    }
}

export default MedicalCenter
