import React, { Component } from 'react';
import { Container, Row, Modal, Form, Button, } from 'react-bootstrap';
import { user, medico, patientcode } from '../helpers/api/api';
import { RowCustom } from "../Doctor/PatientComponent";
import Pagination from '../helpers/pagination';
export class NewCode extends Component {

    constructor(props) {
        super(props);
        this.state = {
            code: 0,
            isOpenModal:false
        }
    }
    componentDidMount() {
        localStorage.removeItem('newPatient');
     }

    getCode = () => {
        patientcode.getAll("GetNuovoCodicePaziente")
            .then(async (response) => {
                if (response.status == 200) {
                    this.setState({ code: response.data.dati ,isOpenModal:true });
                }
            }).catch((error) => {

            })
            .finally(() => {
            });
    }
    handleClose = () => {
        this.setState({ isOpenModal: false });
    }
    handleShow= () => {
        this.setState({ isOpenModal: true });
    }
    render() {
        return (
            <Container className="">
                <Row className='col-12 pt-4' >
                    <div className='col-12'>
                        <h2>Richiedi nuovo codice assistito</h2>
                    </div>
                </Row>
                <Row className='col-4 pt-4' >
                    <Button onClick={() => this.getCode()}>Invia una richiesta per un nuovo codice assistito</Button>
                </Row>
                <Modal
                    show={this.state.isOpenModal}
                    onHide={() => this.handleClose()}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Complimenti hai creato un nuovo codice assistito</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Form.Group className="col-12 mb-3" controlId="formBasicEmail">
                                <Form.Label className="text-">Codice assistito</Form.Label>

                                <Form.Control disabled id="patientCode" alt="patientCode" value={this.state.code ? this.state.code : ''} name="patientCode" placeholder="Codice Paziente" />
                            </Form.Group>
                        </Row>
                    </Modal.Body>
                    {/* <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.handleClose()}>
                            Chiudi
                        </Button>
                    </Modal.Footer> */}
                </Modal>
            </Container>
        )
    }
}

export default NewCode
