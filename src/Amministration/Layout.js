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
import { PatientRegistry } from '../Doctor/PatientRegistry';
import { PatientProfile } from '../Doctor/PatientProfile';
import { AdverseEventsInfo } from '../Doctor/AdverseEventsTable';
import { EpilepticSeizuresInfo } from '../Doctor/EpilepticSeizuresComponent';
import { BloodTestsInfo } from '../Doctor/BloodTestsComponent';

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
        {localStorage.getItem("accessToken") != null && this.state.url != "/" && this.state.url != "/Register" ?
          <>
            <a className="nav-link" data-widget="pushmenu" href="#" role="button" style={{ backgroundColor: '#f4f6f9' }}><i className="fas fa-bars" /></a>
            <div className="content-wrapper">
              <div className="content-header">
                <div className="container-fluid">
                  <Router>
                    <SideNav></SideNav>
                    <div>
                      <Routes>
                        <Route path="/" element={<Login />}></Route>
                        <Route path="/Register" element={<Register />}></Route>
                        {localStorage.getItem("accessToken") != null ?
                          <>
                            <Route path="/Dashboard" element={<DashboardDoctors />}></Route>
                            <Route path="/NewPatient" element={<NewPatient />}></Route>
                            <Route path="/NewTherapy/:codicePaziente" element={<NewTherapy />}></Route>
                            <Route path="/DoctorProfile" element={<DoctorProfile />}></Route>
                            <Route path="/PatientTabbedInterface/:codicePaziente" element={<PatientTabbedInterface />}></Route>
                            <Route path="/PatientRegistry/:idPaziente" element={<PatientRegistry />}></Route>
                            <Route path="/PatientProfile/:idPaziente" element={<PatientProfile />}></Route>
                            <Route path="/AdverseEvents/:idPaziente" element={<AdverseEventsInfo />}></Route>
                            <Route path="/EpilepticSeizures/:idPaziente" element={<EpilepticSeizuresInfo />}></Route>
                            <Route path="/BloodTests/:idPaziente" element={<BloodTestsInfo />}></Route>
                          </>
                          : ''}
                      </Routes>
                    </div>
                  </Router>
                </div></div></div>
          </> :
          <Router>
            <div>
              <Routes>
                <Route path="/" element={<Login />}></Route>
                <Route path="/Register" element={<Register />}></Route>
                {localStorage.getItem("accessToken") != null ?
                  <>
                    < Route path="/Dashboard" element={<DashboardDoctors />}></Route>
                    <Route path="/NewPatient" element={<NewPatient />}></Route>
                    <Route path="/NewTherapy/:codicePaziente" element={<NewTherapy />}></Route>
                    <Route path="/DoctorProfile" element={<DoctorProfile />}></Route>
                    <Route path="/PatientTabbedInterface/:codicePaziente" element={<PatientTabbedInterface />}></Route>
                    <Route path="/PatientRegistry/:idPaziente" element={<PatientRegistry />}></Route>
                    <Route path="/PatientProfile/:idPaziente" element={<PatientProfile />}></Route>
                    <Route path="/AdverseEvents/:idPaziente" element={<AdverseEventsInfo />}></Route>
                    <Route path="/BloodTests/:idPaziente" element={<BloodTestsInfo />}></Route>
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
