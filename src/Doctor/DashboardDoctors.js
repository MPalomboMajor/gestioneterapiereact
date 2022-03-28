import React, { Component } from 'react';
import '../css/style.css';
import { Row, Table, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";
export class DashboardDoctors extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <Container className='content'>
                <Row className='col-12 pt-4' >
                    <div className='col-6'>
                        <Link to="/NewPatient" className='btn  btn-primary'>Nuovo Paziente</Link>
                    </div>
                    <div className='col-6'>
                        <Link  to="/Register" className='btn btn-primary'>Collega Paziente già assegnato ad altro medico</Link>
                    </div>
                </Row>
                <Row className='col-12 pt-4' >
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>Codice Paziente</th>
                        <th>Codice Fiscale</th>
                        <th>Cognome</th>
                        <th>Nome</th>
                        <th>Telefono</th>
                        <th>Stato Paziente</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        </tr>
                        <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                        </tr>
                        <tr>
                        <td>3</td>
                        <td colSpan={2}>Larry the Bird</td>
                        <td>@twitter</td>
                        </tr>
                    </tbody>
                    </Table>
                </Row>
                
            </Container>
        )
    }
}

export default DashboardDoctors
