import './Login.css';
import React, { Component } from 'react'
import { Navbar, Container, Nav, NavDropdown, Button, Offcanvas,  Form, FormControl  } from 'react-bootstrap';
export default class Layout extends Component {

    render() {
        return (
            <div>
                <Navbar className='navbar-margin' bg="" expand="lg">
                        <Navbar.Brand href="#home">GestioneTerapie</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#Login">Login</Nav.Link>
                            <Nav.Link href="#Register">Register</Nav.Link>
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        </Navbar.Collapse>
                </Navbar>
                <Navbar className='button-lateral-navbar ' bg="light" expand={false}>
 
    <Navbar.Toggle aria-controls="offcanvasNavbar" id="offcanvasNavbarTitle"  />
    <div className='offcanvas-backdrop-custom'>
    <Navbar.Offcanvas
      id="offcanvasNavbar"
      aria-labelledby="offcanvasNavbarLabel"
      placement="start"
      className='navbar-height offcanvas-backdrop-custom'
      bsPrefix="offcanvas-backdrop-custom"
    >
      <Offcanvas.Body>
        <Nav className="justify-content flex-grow-2 pe-3">
          <Nav.Link href="#action1">Home</Nav.Link>
          <Nav.Link href="#action2">Link</Nav.Link>
        </Nav>
      </Offcanvas.Body>
    </Navbar.Offcanvas>
    </div>
    
</Navbar>
                <Container>
                    {this.props.children}
                </Container>
            </div>
        )
    }
}
