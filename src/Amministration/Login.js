import React, { Component } from 'react';
import { Container, Row, Col, Form, Button ,Toast,ToastContainer} from 'react-bootstrap';
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
          }  ,
          warning :  false,
          success:false,
        }
        this.validator = new SimpleReactValidator();
    }
    
    //FUNZIONI 
    
        closeMessage = () => {
            this.setState({success:false});
            this.setState({warning:false});
        }
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
                this.setState({warning:true});
            })
            .finally(() => {
                this.setState({warning:true});
            });
        } else {
            this.validator.showMessages();
            this.setState({warning:true});
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
                    <Row>
    <Col xs={6}>
      <ToastContainer position="top-end" className="p-3">
            <Toast bg={"warning"}  position={"top-end"} id={"warning"} show={this.state.warning} onClose={() =>this.closeMessage()}  >
            <Toast.Header >
                <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
                />
                <strong className="me-auto">Error</strong>
            
            </Toast.Header>
            <Toast.Body  className='element' >Attenzione controllare tutti i campi</Toast.Body>
            </Toast>
            <Toast bg={"success"}  position={"top-end"} id={"success"} show={this.state.success} onClose={() =>this.closeMessage()} autohide>
            <Toast.Header >
                <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
                />
                <strong className="me-auto">Success</strong>
            
            </Toast.Header>
            <Toast.Body  className='element' >Registrazione avvenuta correttamente</Toast.Body>
            </Toast>
        </ToastContainer>
    </Col>
</Row>
                </Container>
        )
    }
}

export default Login
