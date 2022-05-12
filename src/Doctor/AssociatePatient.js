import React, { Component } from 'react';
import { Container, Row, Modal, Form, Button, } from 'react-bootstrap';
import { patient, medico, patientcode } from '../helpers/api/api';
import { RowCustom } from "../Doctor/PatientComponent";
import Pagination from '../helpers/pagination';
export class AssociatePatient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            code: 0,
            isSuccess: false,
            patient: {
                patientCode: 0,
                idDoctor: JSON.parse(localStorage.getItem("role")).id
            }
        }


    }
    componentDidMount() {
    }
    handleChange = (el) => {
        let objName = el.target.alt;
        const inputName = el.target.name;
        const inputValue = el.target.value;
        this.updateState(inputName, inputValue, objName);
    };
    updateState = (inputName, inputValue, objName) => {
        let statusCopy = Object.assign({}, this.state);
        statusCopy[objName][inputName] = parseInt(inputValue);
        this.setState(statusCopy);
    };
    handleClose = (el) => {
        window.location.href = "/Dashboard";
    };
    associate = () => {
        patient.post("CollegaPaziente", this.state.patient)
            .then((response) => {
                if (response.data.dati) {
                    // window.location.href = "/Dashboard";
                    this.setState({ isSuccess: true });

                } else {

                }
            }).catch((error) => {
                this.setState({ warning: true });
            });

    }
    render() {
        return (<>
            <Container className="">
                <Row className='col-12 pt-4' >
                    <div className='col-12'>
                        <h2>Associa assistito già esistente</h2>
                    </div>
                </Row>
                <Row className='col-6 pt-4' >
                    <Form.Group className="mb-3">
                        <Form.Label>Codice assistito</Form.Label>
                        <Form.Control id="patientCode" onChange={this.handleChange} alt="patient" type="number" name="patientCode" placeholder="Inserisci fornito dall'assistito" />
                    </Form.Group>
                </Row>
                <Row className='col-4 pt-4' >
                    <Button onClick={() => this.associate()}>Associa assistito </Button>
                </Row>
            </Container>

            <Modal
                show={this.state.isSuccess}
                onHide={() => this.handleClose()}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{'Associazione avvenuta'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {'Complimenti il paziente è stato correttamente associato'}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => this.handleClose()}>
                        Chiudi
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
        )
    }
}

export default AssociatePatient
