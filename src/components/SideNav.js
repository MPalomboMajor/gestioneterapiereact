import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { role } from '../helpers/Constants';
const SideNav = () => {
    const [patientId, setPatientId] = useState(window.location.pathname.split('/').pop());
    const [patientProfile, setPatientProfile] = useState([]);
    const user = JSON.parse(localStorage.getItem("role"));
    const isCarManger = user.idRole === role.CARMANAGER ? true : false
    return (
        <div>
            {/* Main Sidebar Container */}
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                {/* Brand Logo */}
                <a href="index3.html" className="brand-link">
                    <img src="dist/img/AdminLTELogo.png" alt="OntozApp" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
                    <span className="brand-text font-weight-light">OntozApp</span>
                </a>
                {/* Sidebar */}
                <div className="sidebar">


                    {/* Sidebar Menu */}
                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            {/* Add icons to the links using the .nav-icon class
       with font-awesome or any other icon font library */}

                            {
                                //MENU LATERALE CARMANGER
                                isCarManger ?

                                    <>
                                        {window.location.pathname === "/Dashboard" || window.location.pathname === "/PatientRegistry" || window.location.pathname === "/ListDoctor" || window.location.pathname === "/MedicalCenter" || window.location.pathname === "/ContactInfo" || window.location.pathname === "/ContactInfoPatient" ?
                                            <>
                                                <li className="nav-item">
                                                    <a href="/Dashboard" className="nav-link">
                                                        <i className="nav-icon fas fa-hospital-user" />
                                                        <p>
                                                            Elenco pazienti
                                                        </p>
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="/ListDoctor" className="nav-link">
                                                        <i className="nav-icon fas fa-hospital-user" />
                                                        <p>
                                                            Elenco medici
                                                        </p>
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="/MedicalCenter" className="nav-link">
                                                        <i className="nav-icon fas fa-hospital-user" />
                                                        <p>
                                                            Centri Medici
                                                        </p>
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="/ContactInfo" className="nav-link">
                                                        <i className="nav-icon fas fa-hospital-user" />
                                                        <p>
                                                            Contact  Info
                                                        </p>
                                                    </a>
                                                </li>
                                            </>
                                            :
                                            <>
                                                
                                                    <li className="nav-item">
                                                        <a href="/Dashboard" className="nav-link">
                                                            <i className="nav-icon fas fa-hospital-user" />
                                                            <p>
                                                                Elenco pazienti
                                                            </p>
                                                        </a>
                                                    </li>
                                                {localStorage.getItem("newPatient") != null ? '' :
                                                    <>

                                                        <li className="nav-item">
                                                            <Link to={`/PatientRegistry/${patientId}`} className="nav-link">
                                                                <i className="nav-icon fas fa-laptop-medical " />
                                                                <p >
                                                                    Anagrafica paziente
                                                                </p>
                                                            </Link>
                                                        </li>
                                                        <li className="nav-item">
                                                            <Link to={`/PatientProfile/${patientId}`} className="nav-link">
                                                                <i className="nav-icon fas fa-head-side-virus" />
                                                                <p>
                                                                    Profilo paziente
                                                                </p>
                                                            </Link>
                                                        </li>
                                                    </>

                                                }


                                                <li className="nav-item">
                                                    <Link to={`/NewTherapy/${patientId}`} className="nav-link">
                                                        <i className="nav-icon fas fa-capsules" />
                                                        <p>
                                                            Terapia
                                                        </p>
                                                    </Link>
                                                </li>
                                                {localStorage.getItem("newPatient") != null ? '' :
                                                    <>
                                                        <li className="nav-item">
                                                            <Link to={`/AdverseEvents/${patientId}`} className="nav-link">
                                                                <i className="nav-icon far fa-frown" />
                                                                <p>
                                                                    Eventi avversi
                                                                </p>
                                                            </Link>
                                                        </li>
                                                        <li className="nav-item">
                                                            <Link to={`/EpilepticSeizures/${patientId}`} className="nav-link">
                                                                <i className="nav-icon fas fa-brain" />
                                                                <p>
                                                                    Crisi epilettiche
                                                                </p>
                                                            </Link>
                                                        </li>
                                                        <li className="nav-item">
                                                            <Link to={`/DiagnosticTests/${patientId}`} className="nav-link">
                                                                <i className="nav-icon fas fa-syringe" />
                                                                <p>
                                                                    Esami diagnostici
                                                                </p>
                                                            </Link>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a href="#" className="nav-link">
                                                                <i className="nav-icon fas fa-diagnoses" />
                                                                <p>
                                                                    Visite mediche
                                                                </p>
                                                            </a>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a href="#" className="nav-link">
                                                                <i className="nav-icon fas fa-cloud-moon-rain" />
                                                                <p>
                                                                    Monitoraggio umore
                                                                </p>
                                                            </a>
                                                        </li>
                                                    </>

                                                }

                                            </>
                                        }
                                    </>
                                    :
                                    ///MENU LATERALE MEDICO
                                    <>
                                        {window.location.pathname === "/Dashboard" || window.location.pathname === "/NewPatient" || window.location.pathname === "/DoctorProfile" || window.location.pathname === "/RichiediCodice" || window.location.pathname === "/AssociatePatient" ? <>
                                            <li className="nav-item">
                                                <a href="/Dashboard" className="nav-link">
                                                    <i className="nav-icon fas fa-hospital-user" />
                                                    <p>
                                                        Elenco pazienti
                                                    </p>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="/DoctorProfile" className="nav-link">
                                                    <i className="nav-icon fas fa-user-md" />
                                                    <p>
                                                        Anagrafica medico
                                                    </p>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="/AssociatePatient" className="nav-link">
                                                    <i className="nav-icon fas fa-user-cog" />
                                                    <p>
                                                        Collega paziente già assistito
                                                    </p>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="/NewPatient" className="nav-link">
                                                    <i className="nav-icon fas fa-user-plus" />
                                                    <p>
                                                        Nuovo paziente
                                                    </p>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="/RichiediCodice" className="nav-link">
                                                    <i className="nav-icon fas fa-hand-holding-medical" />
                                                    <p>
                                                        Richiedi nuovo codice paziente
                                                    </p>
                                                </a>
                                            </li>
                                        </>
                                            : <>
                                            <li className="nav-item">
                                                            <a href="/Dashboard" className="nav-link">
                                                                <i className="nav-icon fas fa-hospital-user" />
                                                                <p>
                                                                    Elenco pazienti
                                                                </p>
                                                            </a>
                                                        </li>
                                                {localStorage.getItem("newPatient") != null ? '' :
                                                    <>
                                                        
                                                        <li className="nav-item">
                                                            <Link to={`/PatientRegistry/${patientId}`} className="nav-link">
                                                                <i className="nav-icon fas fa-laptop-medical " />
                                                                <p >
                                                                    Anagrafica paziente
                                                                </p>
                                                            </Link>
                                                        </li>
                                                        <li className="nav-item">
                                                            <Link to={`/PatientProfile/${patientId}`} className="nav-link">
                                                                <i className="nav-icon fas fa-head-side-virus" />
                                                                <p>
                                                                    Profilo paziente
                                                                </p>
                                                            </Link>
                                                        </li>
                                                    </>

                                                }


                                                <li className="nav-item">
                                                    <Link to={`/NewTherapy/${patientId}`} className="nav-link">
                                                        <i className="nav-icon fas fa-capsules" />
                                                        <p>
                                                            Terapia
                                                        </p>
                                                    </Link>
                                                </li>
                                                {localStorage.getItem("newPatient") != null ? '' :
                                                    <>
                                                        <li className="nav-item">
                                                            <Link to={`/AdverseEvents/${patientId}`} className="nav-link">
                                                                <i className="nav-icon far fa-frown" />
                                                                <p>
                                                                    Eventi avversi
                                                                </p>
                                                            </Link>
                                                        </li>
                                                        <li className="nav-item">
                                                            <Link to={`/EpilepticSeizures/${patientId}`} className="nav-link">
                                                                <i className="nav-icon fas fa-brain" />
                                                                <p>
                                                                    Crisi epilettiche
                                                                </p>
                                                            </Link>
                                                        </li>
                                                        <li className="nav-item">
                                                            <Link to={`/DiagnosticTests/${patientId}`} className="nav-link">
                                                                <i className="nav-icon fas fa-syringe" />
                                                                <p>
                                                                    Esami diagnostici
                                                                </p>
                                                            </Link>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a href="#" className="nav-link">
                                                                <i className="nav-icon fas fa-diagnoses" />
                                                                <p>
                                                                    Visite mediche
                                                                </p>
                                                            </a>
                                                        </li>
                                                        <li className="nav-item">
                                                            <Link to={`/MoodMonitoring/${patientId}`} className="nav-link">
                                                                <i className="nav-icon fas fa-cloud-moon-rain" />
                                                                <p>
                                                                    Monitoraggio umore
                                                                </p>
                                                            </Link>
                                                        </li>
                                                    </>
                                                }
                                            </>
                                        }
                                    </>
                            }
                        </ul>
                    </nav>
                    {/* /.sidebar-menu */}
                </div>
                {/* /.sidebar */}
            </aside>

        </div>
    )
}

export default SideNav
