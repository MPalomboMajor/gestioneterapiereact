import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { role } from '../helpers/Constants';
import logo from '../logo/OA_logo.svg';


const SideNav = () => {
    const [patientId, setPatientId] = useState(window.location.pathname.split('/').pop());
    const [patientProfile, setPatientProfile] = useState([]);
    const user = JSON.parse(localStorage.getItem("role"));
    const isCarManger = user.idRole === role.CARMANAGER ? true : false
    return (
        <header className="col">
            <a href className="logo"><img src={logo} alt="OntozApp" /></a>
            <button className="menu-toggle d-block d-lg-none">
                <span />
                <span />
                <span />
            </button>
            <ul className="nav flex-column main-menu">
                {
                    //MENU LATERALE CARMANGER
                    isCarManger ?

                        <>
                            {window.location.pathname === "/Dashboard" || window.location.pathname === "/PatientRegistry" || window.location.pathname === "/ListDoctor" || window.location.pathname === "/MedicalCenter" || window.location.pathname === "/ContactInfo" || window.location.pathname === "/ContactInfoPatient" ?
                                <>
                                    <li className="nav-item">
                                        <a href="/Dashboard" className="nav-link elenco-pazienti" aria-current="page" >
                                            <p>
                                                Elenco assistiti
                                            </p>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="/ListDoctor" className="nav-link">
                                            <p>
                                                Elenco medici
                                            </p>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="/MedicalCenter" className="nav-link">
                                            <p>
                                                Centri Medici
                                            </p>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="/ContactInfo" className="nav-link">
                                            <p>
                                                Contact  Info
                                            </p>
                                        </a>
                                    </li>
                                </>
                                :
                                <>

                                    <li className="nav-item">
                                        <a href="/Dashboard" className="nav-link elenco-pazienti" aria-current="page" >
                                            <p>
                                                Elenco assistiti
                                            </p>
                                        </a>
                                    </li>
                                    {localStorage.getItem("newPatient") != null ? '' :
                                        <>
                                            <li className="nav-item">
                                                <Link to={`/PatientRegistry/${patientId}`} className="nav-link anagrafica-paziente">
                                                    <p >
                                                        Anagrafica paziente
                                                    </p>
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link to={`/PatientProfile/${patientId}`} className="nav-link profilo-paziente">
                                                    <p>
                                                        Profilo paziente
                                                    </p>
                                                </Link>
                                            </li>
                                        </>
                                    }


                                    <li className="nav-item">
                                        <Link to={`/NewTherapy/${patientId}`} className="nav-link terapia">
                                            <p>
                                                Terapia
                                            </p>
                                        </Link>
                                    </li>
                                    {localStorage.getItem("newPatient") != null ? '' :
                                        <>
                                            <li className="nav-item">
                                                <Link to={`/AdverseEvents/${patientId}`} className="nav-link eventi-avversi">
                                                    <i className="nav-icon far fa-frown" />
                                                    <p>
                                                        Eventi avversi
                                                    </p>
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link to={`/EpilepticSeizures/${patientId}`} className="nav-link eventi-avversi">
                                                    <i className="nav-icon fas fa-brain" />
                                                    <p>
                                                        Crisi epilettiche
                                                    </p>
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link to={`/DiagnosticTests/${patientId}`} className="nav-link anagrafica-medico">
                                                    <p>
                                                        Esami diagnostici
                                                    </p>
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link to={`/MedicalExaminations/${patientId}`} className="nav-link visite-mediche">
                                                    <p>
                                                        Visite mediche
                                                    </p>
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link piano-nutrizionale" href="#">Piano nutrizionale</a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="#" className="nav-link umore">
                                                    <p>
                                                        Umore
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
                            {window.location.pathname === "/Dashboard" ||
                                window.location.pathname === "/NewPatient" ||
                                window.location.pathname === "/DoctorProfile" ||
                                window.location.pathname === "/RichiediCodice" ||
                                window.location.pathname === "/AssociatePatient" ||
                                window.location.pathname === "/ListDoctor" ||
                                window.location.pathname === "/MedicalCenter" ||
                                window.location.pathname === "/ContactInfo"
                                ? <>





                                    <li className="nav-item">
                                        <a href="/Dashboard" className="nav-link elenco-pazienti" aria-current="page" >
                                            <p>
                                                Elenco assistiti
                                            </p>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={`/DoctorProfile`} className="nav-link visite-mediche">
                                            <p>
                                                Anagrafica medico
                                            </p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <a href="/AssociatePatient" className="nav-link">
                                            <p>
                                                Collega paziente già assistito
                                            </p>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="/NewPatient" className="nav-link">
                                            <p>
                                                Nuovo paziente
                                            </p>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="/RichiediCodice" className="nav-link">
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
                                                Elenco assistiti
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
                                                <Link to={`/MedicalExaminations/${patientId}`} className="nav-link">
                                                    <i className="nav-icon fas fa-diagnoses" />
                                                    <p>
                                                        Visite mediche
                                                    </p>
                                                </Link>

                                            </li>
                                            <li className="nav-item">
                                                <Link to={`/MoodMonitoring/${patientId}`} className="nav-link">
                                                    <i className="nav-icon fas fa-cloud-moon-rain" />
                                                    <p>
                                                        Umore
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
            <p className="angelini d-none d-lg-block">
                Realizzato con il contributo di
            </p>
        </header>


    )
}

export default SideNav
