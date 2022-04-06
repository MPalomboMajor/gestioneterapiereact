import '../css/style.css';
import React, { Component } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css';
import "react-datepicker/dist/react-datepicker.css";

import { Navbar, Container, Nav, NavDropdown, Button, Offcanvas, Form, FormControl } from 'react-bootstrap';
export default class Layout extends Component {
  userLogUser = () => ({
    token: sessionStorage.getItem('token')

  });
  constructor(props) {

    super(props);
    this.state = {
      userDto: {
        ...this.userLogUser(),
      },
      url: window.location.pathname,
    }
  }

  render() {

    return (
      <div className={this.state.userDto.token != null && this.state.url != "/" && this.state.url != "/Register"   ?'main-header navbar navbar-expand navbar-light':''}>
        {this.state.userDto.token != null && this.state.url != "/" && this.state.url != "/Register" ?
          <div className='layout-margin'>
            <Navbar className='navbar-margin' bg="" expand="lg">
              <Navbar.Brand href="#home">GestioneTerapie</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link to='/Login' href="/Dashboard">Dashboard</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
            <Offcanvas
              show={true}
              aria-labelledby="offcanvasNavbarLabel"
              aria-expanded="true"
              placement="start"
              className='show navbar-height offcanvas-backdrop-custom'
              bsPrefix="main-sidebar"
              tabIndex={false.toString()}
            >
              <Offcanvas.Body className='menu-body'>
                <Nav className="justify-content flex-grow-2 pe-3">
                  <Nav.Link className='link-menu' href="/Dashboard">Pazienti</Nav.Link>
                  <Nav.Link className='link-menu' href="/DoctorProfile">Anagrafica medico</Nav.Link>
                  <Nav.Link className='link-menu' href="#action3">Richiedi codici paziente</Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Offcanvas>
            <div className='contnet-wrapper'>
              {this.props.children}
            </div>
          </div> : <div>
            {this.props.children}
          </div>
        }

      </div>
    )
  }
}
