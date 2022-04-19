import '../css/style.css';
import React, { Component } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css';
import "react-datepicker/dist/react-datepicker.css";
import SideNav from '../components/SideNav';
import Footer from '../components/Footer';
import Home from '../components/Home';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import DashboardDoctors from '../Doctor/DashboardDoctors';
import NewPatient from '../Doctor/NewPatient';
import NewTherapy from '../Doctor/NewTherapy';
import DoctorProfile from '../Doctor/DoctorProfile';
import PatientTabbedInterface from '../Doctor/PatientTabbedInterface';

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
      <>
        {/* Content Wrapper. Contains page content */}
        <div className="content-wrapper">
          {/* Content Header (Page header) */}
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1 className="m-0">Dashboard</h1>
                </div>{/* /.col */}
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item active">Dashboard v1</li>
                  </ol>
                </div>{/* /.col */}
              </div>{/* /.row */}
            </div>{/* /.container-fluid */}
            <Router>
                  <div>
                    <Routes>
                      <Route path="/" element={<Login />}></Route>
                      <Route path="/Register" element={<Register />}></Route>
                      {localStorage.getItem("accessToken") != null ?
                        <>
                          < Route path="/Dashboard" element={<DashboardDoctors />}></Route>
                          <Route path="/NewPatient" element={<NewPatient />}></Route>
                          <Route path="/NewTherapy" element={<NewTherapy />}></Route>
                          <Route path="/DoctorProfile" element={<DoctorProfile />}></Route>
                          <Route path="/PatientTabbedInterface/:codicePaziente" element={<PatientTabbedInterface />}></Route>
                        </>
                        : ''}
                    </Routes>
                  </div>
                </Router>
          </div>
          {/* /.content-header */}
          {/* Main content */}
          <section className="content">
            <div className="container-fluid">
              {/* Small boxes (Stat box) */}
              <div className="row">
                
              </div>
              {/* /.row (main row) */}
            </div>{/* /.container-fluid */}
          </section>
          {/* /.content */}
        </div>


        
        <div className={localStorage.getItem("accessToken") != null && this.state.url != "/" && this.state.url != "/Register" ? 'main-header navbar navbar-expand navbar-light' : ''}>
          {localStorage.getItem("accessToken") != null && this.state.url != "/" && this.state.url != "/Register" ?
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



              <div className='contnet-wrapper'>
                {this.props.children}
              </div>
            </div> : <div>
              {this.props.children}
            </div>
          }

        </div>

      </>
    )
  }
}
