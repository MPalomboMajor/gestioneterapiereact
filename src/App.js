import Header from './components/Header';
import Home from './components/Home';
import Footer from './components/Footer';
import SideNav from './components/SideNav';
import './App.css';
import Login from './Amministration/Login';
import Layout from './Amministration/Layout';
import DashboardDoctors from './Doctor/DashboardDoctors'
import NewPatient from './Doctor/NewPatient'
import DoctorProfile from './Doctor/DoctorProfile'
import Register from './Amministration/Register'
import NewTherapy from './Doctor/NewTherapy'
import PatientTabbedInterface from './Doctor/PatientTabbedInterface'
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
function App() {
  return (
    <>
    <Header></Header>
    {/* <Home></Home> */}
    <SideNav></SideNav>
    <Layout></Layout >
    <Footer></Footer>
    
      
      
    
    </>
    
  );
}

export default App;
