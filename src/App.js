
import './App.css';
import Login from './Amministration/Login';
import Layout from './Amministration/Layout';
import DashboardDoctors from './Doctor/DashboardDoctors'
import Register from './Amministration/Register'
import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes , Link , useNavigate  } from 'react-router-dom';
function App() {
  return (
    <Layout>
        <Router>
      <div>
      

        <Routes>
          <Route path="/" element={<Login  />}></Route>
          <Route path="/Dashboard" element={<DashboardDoctors />}></Route>
          <Route path="/Register" element={<Register />}></Route>
        </Routes>
      </div>
    </Router>
      </Layout>
  );
}

export default App;
