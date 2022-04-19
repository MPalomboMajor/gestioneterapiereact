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
       {localStorage.getItem("accessToken") != null ?
       <>
    <SideNav></SideNav>
    
    <div className="content-wrapper">
    <div className="content-header">
            <div className="container-fluid">
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
                </div></div></div>
                </>:
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
  }
      </>
    )
  }
}
