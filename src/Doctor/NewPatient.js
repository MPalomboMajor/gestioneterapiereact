import React, { Component } from 'react';
import '../css/style.css';
import { Row, Table, Container , Form, FormGroup} from 'react-bootstrap';
import { Link } from "react-router-dom";
export class NewPatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <Container className='content'>
               <Row className='col-12 pt-4' >
                    <Form.Group className="mb-3">
                        <Form.Label>Codice Paziente </Form.Label>
                        <Form.Control type="patientCode" placeholder="Inserisci  Codice Paziente"/>
                    </Form.Group>
                </Row>
                <Row className='col-12 pt-4' >
                <Row className='col-12 pt-4' >
                    <div className='col-3'>
                        <Link to="/" className='btn  btn-primary'>Avanti</Link>
                    </div>
                    <div className='col-3'>
                        <Link  to="/" className='btn btn-primary'>Salva</Link>
                    </div>
                </Row>
                </Row>
            </Container>
        )
    }
}

export default NewPatient
