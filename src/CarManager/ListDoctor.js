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
            itemPerPage: 30,
            search: '',
            filteredPatient:[],
            isFilter:false,
        }
        this.GetListDoctor = this.GetListDoctor.bind(this);
    }
    componentDidMount() {
        this.GetListDoctor();
    }
    GetListDoctor = () => {
        medico.getAll("GetAll")
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
    handleChange = (el) => {
        const inputValue = el.target.value;
        this.setState({search:
            inputValue });
        if (inputValue) {
            if (this.state.search && this.state.search?.length >= 1) {
                this.setState({ isFilter: true });
                let filteredData = this.state.listDoctos.filter(x => String(x.name).includes(inputValue)
                    || String(x.surName).includes(inputValue)
                    || String(x.phoneNumber).includes(inputValue)
                    || String(x.fiscalCode).includes(inputValue)
                    || String(x.email).includes(inputValue));
                if (filteredData.length > 0) {
                    this.setState({
                        filteredPatient: filteredData,
                    });

                } else {
                    this.setState({
                        filteredPatient: filteredData,
                    });
                }
                this.setState({ currentPage: 1});
            } else {
                this.setState({
                    filteredPatient: this.state.listDoctos,
                });
            }
        } else {
            this.setState({
                filteredPatient: this.state.listDoctos,
            });
        }
    };
    setCurrentPage = (n) => {
        this.setState({ currentPage: n });
    }
    setPrevPage = (n) => {
        this.setState({ currentPage: n - 1 });
    }
    setNexPage = (n) => {
        this.setState({ currentPage: n + 1 });
    }
    render() {

        const indexOfLastPatient = this.state.currentPage * this.state.itemPerPage;
        const indexOfFirstPatient = indexOfLastPatient - this.state.itemPerPage;
        const currentItem = this.state.isFilter ? this.state.filteredPatient?.slice(indexOfFirstPatient, indexOfLastPatient) : this.state.listDoctos.slice(indexOfFirstPatient, indexOfLastPatient);
        return (
            <Container className="">
                <Row className='col-12 pt-4' >
                    <div className='col-12'>
                        <h2>Lista Medici </h2>
                    </div>
                </Row>
                <Row>
                    <Form.Group className="col-6 mb-2" >
                        <Form.Control onChange={this.handleChange}  name="search" alt="medicoDTO" placeholder="Ricerca Assistito" value={this.state.search} />
                    </Form.Group>
                </Row>
                <Row className='col-12 pt-4' >
                    <div className="table-wrapper">
                        <Table className="table custom">
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
                                    currentItem.map((pa) => <RowCustom colums={["fiscalCode", "surName", "name", "email", "centroMedico"]} link={'fiscalCode'} reference={'id'} controller={'DoctorProfile'} item={pa} />)
                                }
                            </tbody>
                        </Table>
                    </div>
                    <Pagination
                        patientsPerPage={30}
                        totalPatients={this.state.isFilter ?this.state.filteredPatient?.length  :this.state.listDoctos.length}
                        paginate={(pageNumber) => this.setCurrentPage(pageNumber)}
                        currentPage={this.state.currentPage}
                        prevPage={(pageNumber) => this.setPrevPage(pageNumber)}
                        nextPage={(pageNumber) => this.setNexPage(pageNumber)}
                    />
                </Row>
            </Container>
        )
    }
}

export default ListDoctor
