import React, { Component, useState, useEffect } from 'react';
import '../css/style.css';
import { Tabs, Tab, Container , Form,Row , InputGroup , Button, FormControl, Table} from 'react-bootstrap';
import { Link } from "react-router-dom";
import { PatientInfo } from "./PatientComponent"
import { api } from '../helpers/api/api';
import DatePicker from "react-datepicker";
import moment from 'moment';
export class NewTherapy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            dateNow:''
        };
       
    }

    componentDidMount() {
        api.getAll("/GetPatients")
            .then((response) => {
                if (response.status === 200) {
                    this.setState({
                        isLoaded: true,
                        items: response.data
                    });
                }
            }).catch((error) => {
            this.setState({error: 1})    
            });
            this.initialState();
    }

    initialState = () => {
        var value = moment(new Date()).format("DD/MM/YYYY");
        this.setState({dateNow:value});
        
    }
      handleChange = (value, formattedValue) => {
        this.setState({
            dateNow:  moment(value).format("DD/MM/YYYY"), 
          formattedValue: formattedValue 
        });
      }
    render() {
        return (
            <Container className='content'>

                <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="terapia" title="Terapia">
                    <Container >
                        <Form className="">
                            <Row>
                                <Form.Group className="col-4 mb-3" >
                                    <Form.Label className="text">Numero crisi  di partenza </Form.Label>
                                    <Form.Control  name="startingCrisisNumber" placeholder="Inserisci  il  numero  di crisi  di partenza" />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group className="col-4 mb-3" >
                                    <Form.Label className="text">Data inizio terapia</Form.Label>
                                    <InputGroup className="mb-3">
                                        <Button variant="outline-secondary" className='bi bi-calendar-date-fill' id="button-addon1" />
                                        <div className='col-lg-6'>
                                        <DatePicker id='startTherapy' name={'startTherapy'} aria-label="Example text with button addon"
                                        aria-describedby="basic-addon1"  className=' form-control bi bi-calendar-date-fill'  value={this.state.dateNow} onChange={this.handleChange}  />
                                        </div>
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group className="col-4 mb-3" >
                                    <Form.Label className="text">Data fine terapia</Form.Label>
                                    <InputGroup className="mb-3">
                                        <Button variant="outline-secondary" className='bi bi-calendar-date-fill' id="button-addon1" />
                                        <div className='col-lg-6'>
                                        <DatePicker id='endTherapy' name={'endTherapy'}  aria-label="Example text with button addon"
                                        aria-describedby="basic-addon1"  className=' form-control bi bi-calendar-date-fill'  value={this.state.dateNow} onChange={this.handleChange}  />
                                        </div>
                                    </InputGroup>
                                </Form.Group>
                            </Row>
                            <Row>
                            <div className='col-lg-8'>
                            <InputGroup className="mb-3">
                                <InputGroup.Text>Motivo fine terapia </InputGroup.Text>
                                <FormControl as="textarea" aria-label="With textarea" />
                            </InputGroup>
                            </div>
                            </Row>
                            <Row>
                                <Form.Group className="col-4 mb-3" controlId="formBasicPassword">
                                    <Button variant="btn btn-info bi bi-arrow-left">
                                        
                                    </Button>
                                </Form.Group>
                                <Form.Group className="col-4 mb-3" controlId="formBasicPassword">
                                    <Button variant="btn btn-info  bi bi-arrow-right">
                                        
                                    </Button>
                                </Form.Group>
                                <Form.Group className="col-4 mb-3" controlId="formBasicPassword">
                                    <Button variant="btn btn-success bi-cloud-check" >
                                        
                                    </Button>
                                </Form.Group>
                            </Row>
                        </Form>
                </Container>
                </Tab>
                <Tab eventKey="ontozry" title="Ontozry">
                <Row>
                                
                 </Row>
                <Row>
                                <Form.Group className="col-4 mb-3" controlId="formBasicPassword">
                                    <Button variant="btn btn-info bi bi-arrow-left">
                                        
                                    </Button>
                                </Form.Group>
                                <Form.Group className="col-4 mb-3" controlId="formBasicPassword">
                                    <Button variant="btn btn-info  bi bi-arrow-right">
                                        
                                    </Button>
                                </Form.Group>
                                <Form.Group className="col-4 mb-3" controlId="formBasicPassword">
                                    <Button variant="btn btn-success bi-cloud-check" >
                                        
                                    </Button>
                                </Form.Group>
                            </Row>
                </Tab>
                <Tab eventKey="altriFarmaci" title="Altri Farmaci" >
                <Row>
                                <Form.Group className="col-4 mb-3" controlId="formBasicPassword">
                                    <Button variant="btn btn-info bi bi-plus-square">
                                        
                                    </Button>
                                </Form.Group></Row>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Farmaco</th>
                            <th>Dosaggio</th>
                            <th>Data Inizio</th>
                            <th>Data Fine</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </Table>
                <Row>
                                <Form.Group className="col-4 mb-3" controlId="formBasicPassword">
                                    <Button variant="btn btn-info bi bi-arrow-left">
                                        
                                    </Button>
                                </Form.Group>
                                <Form.Group className="col-4 mb-3" controlId="formBasicPassword">
                                    <Button variant="btn btn-info  bi bi-arrow-right">
                                        
                                    </Button>
                                </Form.Group>
                                <Form.Group className="col-4 mb-3" controlId="formBasicPassword">
                                    <Button variant="btn btn-success bi-cloud-check" >
                                        
                                    </Button>
                                </Form.Group>
                            </Row>
                </Tab>
                <Tab eventKey="allergieFarmaci" title="Allergie a farmaci" >
                <Row>
                                <Form.Group className="col-4 mb-3" controlId="formBasicPassword">
                                    <Button variant="btn btn-info bi bi-plus-square">
                                        
                                    </Button>
                                </Form.Group></Row>
                                <Table striped bordered hover size="sm">
                                    <thead>
                                        <tr>
                                            <th>Farmaco a cui è allergico il paziente</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </Table>
                                <Row>
                                <Form.Group className="col-4 mb-3" controlId="formBasicPassword">
                                    <Button variant="btn btn-info bi bi-arrow-left">
                                        
                                    </Button>
                                </Form.Group>
                                <Form.Group className="col-4 mb-3" controlId="formBasicPassword">
                                    <Button variant="btn btn-primary bi-cloud-check" >
                                        Termina creazione paziente
                                    </Button>
                                </Form.Group>
                            </Row>
                </Tab>
                </Tabs>

            </Container>
        );
        // }
    }
}

export default NewTherapy;
