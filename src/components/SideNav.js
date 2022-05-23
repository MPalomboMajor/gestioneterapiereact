import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { role } from '../helpers/Constants';
import logo from '../logo/OA_logo.svg';
import logOut from '../icons';
import { iconLogout } from '../icons';
import { caremanager, medico } from '../helpers/api/api';

const SideNav = () => {
    const [patientId, setPatientId] = useState(window.location.pathname.split('/').pop());
    const [patientProfile, setPatientProfile] = useState([]);
    const [userProfile, setUserProfile] = useState([]);
    const user = JSON.parse(localStorage.getItem("role"));
    const [loading, setLoading] = useState(false);
    const isCarManger = user.idRole === role.CAREMANAGER ? true : false
    const isAngelini = user.idRole === role.ANGELINI ? true : false
    const isDoctor = user.idRole === role.DOCTOR ? true : false

    useEffect(() => {
        const fetchUserProfile = async () => {
            setLoading(true);
            if (isDoctor) {
                await medico.get("Get/", parseInt(user.id))
                    .then((response) => {
                        if (response.status === 200) {
                            setUserProfile(response.data.dati);
                            setLoading(false);
                        }
                    }).catch((error) => {

                    });
            } else if (isCarManger) {
                await caremanager.get("", parseInt(user.id))
                    .then((response) => {
                        if (response.status === 200) {
                            setUserProfile(response.data.dati);
                            setLoading(false);
                        }
                    }).catch((error) => {

                    });
            }

        };
        fetchUserProfile();
    }, []);

    return (
        <header className="col">
            <a href="/DoctorChartsInterface" className="logo"><img src={logo} alt="OntozApp" /></a>
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
                            {window.location.pathname === "/Dashboard" || window.location.pathname === "/PatientRegistry" || window.location.pathname === "/ListDoctor" || window.location.pathname === "/MedicalCenter" || window.location.pathname === "/ContactInfo" || window.location.pathname === "/ContactInfoPatient" || window.location.pathname === "/DoctorChartsInterface" ?
                                <>
                                    <li className="nav-item">
                                        <Link to={`/CareManagerProfile`} className="nav-link profilo-paziente">
                                            <p>
                                                {userProfile.name} {userProfile.surName}
                                            </p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <a href="/DoctorChartsInterface" className="nav-link home" aria-current="page" >
                                            <p>
                                                Home
                                            </p>
                                        </a>
                                    </li>
                                    <hr />
                                    <li className="nav-item">
                                        <a href="/Dashboard" className="nav-link elenco-pazienti" aria-current="page" >
                                            <p>
                                                Elenco assistiti
                                            </p>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="/ListDoctor" className="nav-link anagrafica-medico">
                                            <p>
                                                Elenco medici
                                            </p>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="/MedicalCenter" className="nav-link visite-mediche">
                                            <p>
                                                Centri Medici
                                            </p>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="/ContactInfo" className="nav-link profilo-paziente">
                                            <p>
                                                Contact  Info
                                            </p>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="/" className="nav-link logout" >
                                            <p>
                                                Logout
                                            </p>
                                        </a>
                                    </li>
                                </>
                                :
                                <>
                                    <li className="nav-item">
                                        <Link to={`/CareManagerProfile`} className="nav-link profilo-paziente">
                                            <p>
                                                {userProfile.name} {userProfile.surName}
                                            </p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <a href="/DoctorChartsInterface" className="nav-link home" aria-current="page" >
                                            <p>
                                                Home
                                            </p>
                                        </a>
                                    </li>
                                    <hr />
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
                                                        Anagrafica assistito
                                                    </p>
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link to={`/PatientProfile/${patientId}`} className="nav-link profilo-paziente">
                                                    <p>
                                                        Profilo assistito
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
                                                    <p>
                                                        Eventi avversi
                                                    </p>
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link to={`/EpilepticSeizures/${patientId}`} className="nav-link crisi-epilettiche">
                                                    <p>
                                                        Crisi
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
                                                <Link to={`/NutritionalPlans/${patientId}`} className="nav-link piano-nutrizionale">
                                                    <p>
                                                        Piano nutrizionale
                                                    </p>
                                                </Link>
                                            </li>

                                            <li className="nav-item">
                                                <Link to={`/MoodMonitoring/${patientId}`} className="nav-link umore">
                                                    <p>
                                                        Umore
                                                    </p>
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <a href="/" className="nav-link logout" >
                                                    <p>
                                                        Logout
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
                        isDoctor ?
                            <>
                                {window.location.pathname === "/Dashboard" ||
                                    window.location.pathname === "/NewPatient" ||
                                    window.location.pathname === "/DoctorProfile" ||
                                    window.location.pathname === "/RichiediCodice" ||
                                    window.location.pathname === "/AssociatePatient" ||
                                    window.location.pathname === "/ListDoctor" ||
                                    window.location.pathname === "/MedicalCenter" ||
                                    window.location.pathname === "/ContactInfo" ||
                                    window.location.pathname === "/DoctorChartsInterface"
                                    ? <>
                                        <li className="nav-item">
                                            <Link to={`/DoctorProfile`} className="nav-link profilo-paziente">
                                                <p>
                                                    {userProfile.name} {userProfile.surName}
                                                </p>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <a href="/DoctorChartsInterface" className="nav-link home" aria-current="page" >
                                                <p>
                                                    Home
                                                </p>
                                            </a>
                                        </li>
                                        <hr />
                                        <li className="nav-item">
                                            <a href="/Dashboard" className="nav-link elenco-pazienti" aria-current="page" >
                                                <p>
                                                    Elenco assistiti
                                                </p>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <Link to={`/DoctorProfile`} className="nav-link anagrafica-medico">
                                                <p>
                                                    Anagrafica medico
                                                </p>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <a href="/AssociatePatient" className="nav-link collega-paziente">
                                                <p>
                                                    Collega assistito già assegnato
                                                </p>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="/NewPatient" className="nav-link nuovo-paziente">
                                                <p>
                                                    Nuovo assistito
                                                </p>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="/RichiediCodice" className="nav-link no-kit">
                                                <p>
                                                    Richiedi nuovo codice assistito
                                                </p>
                                            </a>
                                        </li>

                                        <li className="nav-item">
                                            <a href="/" className="nav-link logout" >
                                                <p>
                                                    Logout
                                                </p>
                                            </a>
                                        </li>
                                    </>
                                    : <>
                                        <li className="nav-item">
                                            <Link to={`/DoctorProfile`} className="nav-link profilo-paziente">
                                                <p>
                                                    {userProfile.name} {userProfile.surName}
                                                </p>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <a href="/DoctorChartsInterface" className="nav-link home" aria-current="page" >
                                                <p>
                                                    Home
                                                </p>
                                            </a>
                                        </li>
                                        <hr />
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
                                                            Anagrafica assistito
                                                        </p>
                                                    </Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link to={`/PatientProfile/${patientId}`} className="nav-link profilo-paziente">
                                                        <p>
                                                            Profilo assistito
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
                                                        <p>
                                                            Eventi avversi
                                                        </p>
                                                    </Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link to={`/EpilepticSeizures/${patientId}`} className="nav-link crisi-epilettiche">
                                                        <p>
                                                            Crisi
                                                        </p>
                                                    </Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link to={`/DiagnosticTests/${patientId}`} className="nav-link esami-diagnostici">
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
                                                    <Link to={`/NutritionalPlans/${patientId}`} className="nav-link piano-nutrizionale">
                                                        <p>
                                                            Piano nutrizionale
                                                        </p>
                                                    </Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link to={`/MoodMonitoring/${patientId}`} className="nav-link umore">
                                                        <p>
                                                            Umore
                                                        </p>
                                                    </Link>
                                                </li>

                                                <li className="nav-item">
                                                    <a href="/" className="nav-link logout" >
                                                        <p>
                                                            Logout
                                                        </p>
                                                    </a>
                                                </li>
                                            </>
                                        }
                                    </>
                                }
                            </>
                            : <>
                                <li className="nav-item">
                                    <div className="nav-link" aria-current="page" >
                                        <p>
                                            {userProfile.name} {userProfile.surName}
                                        </p>
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <a href="/DoctorChartsInterface" className="nav-link home" aria-current="page" >
                                        <p>
                                            Home
                                        </p>
                                    </a>
                                </li>
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
