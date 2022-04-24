import React, { Component } from 'react';
import { Container, Row, Table, Form, Button, } from 'react-bootstrap';
import { user, medico } from '../helpers/api/api';
import { RowCustom } from "../Doctor/PatientComponent";
import Pagination from '../helpers/pagination';
export class ListDoctor extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            listDoctos: [],
            currentPage: 1,
            itemPerPage: 5,
        }
        this.GetListDoctor = this.GetListDoctor.bind(this);
    }
    componentDidMount() {
        this.GetListDoctor();
    }
    GetListDoctor = () => {
        medico.getAll("Medici")
            .then((response) => {
                if (response.status === 200) {
                    this.setState({
                        listDoctos: response.data.dati,
                    });
                }
            }).catch((error) => {
                this.setState({ error: 1 })
            });


    }
    render() {
        const indexOfLastPatient = this.state.currentPage * this.state.itemPerPage;
        const indexOfFirstPatient = indexOfLastPatient - this.state.itemPerPage;
        const currentItem = this.state.listDoctos.slice(indexOfFirstPatient, indexOfLastPatient);
        return (
            <Container className="">
                <Row className='col-12 pt-4' >
                    <div className='col-12'>
                        <h2>Lista Medici </h2>
                    </div>
                </Row>
                <Row className='col-12 pt-4' >
                <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th>Codice Fiscale</th>
                                        <th>Cognome</th>
                                        <th>Nome</th>
                                        <th>Email</th>
                                        <th>Centro Medico</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        currentItem.map((pa) => <RowCustom colums={["fiscalCode", "surName", "name","email","Centro Medico"]} link={'fiscalCode'} reference={'id'} controller={'DoctorProfile'}  item={pa} /> )
                                    }
                                </tbody>
                            </Table>
                </Row>
            </Container>
        )
    }
}

export default ListDoctor
