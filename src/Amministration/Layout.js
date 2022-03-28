import '../css/style.css';
import React, { Component } from 'react'
import { Navbar, Container, Nav, NavDropdown, Button, Offcanvas,  Form, FormControl  } from 'react-bootstrap';
export default class Layout extends Component {
  userLogUser = () => ({
    token: sessionStorage.getItem('token')
    
});
constructor(props) {
    
    super(props);
    this.state = {
      userDto:{
        ...this.userLogUser(),
      }  
    }
}
    render() {
        return (
          <div>
          {this.state.userDto.token != null ? 
            <div className='layout-margin'>
              
                <Navbar className='navbar-margin' bg="" expand="lg">
                        <Navbar.Brand href="#home">GestioneTerapie</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link to='/Login' href="/Dashboard">Dashboard</Nav.Link>
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
                              <Offcanvas
                               show={true}
                                aria-labelledby="offcanvasNavbarLabel"
                                aria-expanded="true"
                                placement="start"
                                className='show navbar-height offcanvas-backdrop-custom'
                                bsPrefix="offcanvas-backdrop-custom"
                              >

                                    <Offcanvas.Body className='menu-body'>
                                      <Nav className="justify-content flex-grow-2 pe-3">
                                        <Nav.Link className='link-menu' href="#action1">Pazienti</Nav.Link>
                                        <Nav.Link className='link-menu' href="#action2">Anagrafica medico</Nav.Link>
                                        <Nav.Link className='link-menu' href="#action3">Richiedi codici paziente</Nav.Link>
                                      </Nav>
                                    </Offcanvas.Body>
                              </Offcanvas>
                <Container>
                    {this.props.children}
                </Container>
                </div> :  <Container>
                    {this.props.children}
                </Container>
                }
                
            </div>
        )
    }
}
