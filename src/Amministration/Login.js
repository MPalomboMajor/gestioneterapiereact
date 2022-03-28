import React, { Component } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { api } from '../helpers/api/api';
import '../css/style.css';
import { Link } from "react-router-dom";
import SimpleReactValidator from 'simple-react-validator';

export class Login extends Component {
    //STATO
    userModelProp = () => ({
        email:'',
        password: ''
        
    });
    constructor(props) {
        
        super(props);
        this.state = {
          isTrue:false,
          userDto:{
            ...this.userModelProp(),
          }  
        }
        this.validator = new SimpleReactValidator();
    }
    
    //FUNZIONI 
    
        
        changeBool = () => {
            this.setState({ isTrue: true});
        }
        handleChange = (el) => {
            const inputName = el.target.name;
        
            const inputValue = el.target.value;
        
            this.updateState(inputName, inputValue, 'userDto');
        };

        updateState = (inputName, inputValue, objName) => {
            const statusCopy = { ...this.state };
            statusCopy[objName][inputName] = inputValue;
        
            this.setState(statusCopy);
        };

        postLogin = () => {
            if (this.validator.allValid()) {
            api.post("/Login",this.state.userDto)
            .then(async (response) => {
            if (response.status == 200) {
                sessionStorage.setItem('token', 'ok');
                window.location.href = "/Dashboard";
            }}).catch((error) => {
            
            })
            .finally(() => {
                this.setState(
                {
                    isTrue: false,
                },
                () => {
                    // this.getSelectedEntityRoles();
                }
                );
            });
        } else {
            this.validator.showMessages();
            //showNotification.warning(`${entitiesLabels.WARNING}`,`${entitiesLabels.USER} required fields are missing  `);
            this.forceUpdate();
          }
        };

    //VIEW 
    render() {
        
        const validations = {
            email: this.validator.message(
              'Email',
              this.state.userDto.email,
              'required'
            ),
              password: this.validator.message(
                'Password',
                this.state.userDto.password,
                'required'
              ),
          };
        return (
            <Container className=" text-center">
                    <h1 className="text-color-title mt-2 p-2"> Login</h1>
                    <Row className="mt-4">
                        <Col lg={4} md={5} sm={12} className="form box-color p-5 m-auto" >
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label className="text-light">Email address</Form.Label>
                                    <Form.Control isInvalid={validations.email != null} onChange={this.handleChange} type="email" name="email"  placeholder="Enter email" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label className="text-light">Password</Form.Label>
                                    <Form.Control isInvalid={validations.password != null}  onChange={this.handleChange} name="password" type="password" placeholder="Password" />
                                </Form.Group>
                                <Button className='position-button' variant="light btn-block" onClick={ () =>this.postLogin()} >
                                    Login
                                </Button>
                                <Link className='btn  btn-light position-button' variant="light btn-block" to="/Register">Signin</Link>
                            </Form>
                        </Col>
                        <h6 className="mt-4 p-3 text-center text-secondary">Copyright <i className="fa fa-copyright"></i> </h6>

                    </Row>
                </Container>
        )
    }
}

export default Login
