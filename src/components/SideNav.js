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
            <a href="/DoctorChartsInterface" className="logo"><img src={logo} alt="EpiOnApp" /></a>
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
                                        <a href="/CareManagerProfile" className={window.location.pathname.split('/').pop() === "CareManagerProfile" ? "nav-link profilo-paziente-nome active" : "nav-link profilo-paziente-nome"} aria-current="page" >
                                            <p>
                                                {userProfile.name} {userProfile.surName}
                                            </p>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="/DoctorChartsInterface" className={window.location.pathname.split('/').pop() === "DoctorChartsInterface" ? "nav-link home active" : "nav-link home"} aria-current="page" >
                                            <p>
                                                Home
                                            </p>
                                        </a>
                                    </li>
                                    <hr />
                                    <li className="nav-item">
                                        <a href="/Dashboard" className={window.location.pathname.split('/').pop() === "Dashboard" ? "nav-link profilo-paziente active" : "nav-link profilo-paziente"} aria-current="page" >
                                            <p>
                                                Elenco assistiti
                                            </p>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="/ListDoctor" className={window.location.pathname.split('/').pop() === "ListDoctor" ? "nav-link anagrafica-medico active" : "nav-link anagrafica-medico"} aria-current="page" >
                                            <p>
                                                Elenco medici
                                            </p>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="/MedicalCenter" className={window.location.pathname.split('/').pop() === "MedicalCenter" ? "nav-link visite-mediche active" : "nav-link visite-mediche"} aria-current="page" >
                                            <p>
                                                Centri Medici
                                            </p>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="/ContactInfo" className={window.location.pathname.split('/').pop() === "ContactInfo" ? "nav-link profilo-paziente active" : "nav-link profilo-paziente"} aria-current="page" >
                                            <p>
                                                Contact  Info
                                            </p>
                                        </a>
                                    </li>
                                    {/* <li className="nav-item">
                                        <a href="/" className="nav-link logout" >
                                            <p>
                                                Logout
                                            </p>
                                        </a>
                                    </li> */}
                                </>
                                :
                                <>
                                    <li className="nav-item">
                                        <a href="/CareManagerProfile" className={window.location.pathname.split('/').pop() === "CareManagerProfile" ? "nav-link profilo-paziente-nome active" : "nav-link profilo-paziente-nome"} aria-current="page" >
                                            <p>
                                                {userProfile.name} {userProfile.surName}
                                            </p>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="/DoctorChartsInterface" className={window.location.pathname.split('/').pop() === "DoctorChartsInterface" ? "nav-link home active" : "nav-link home"} aria-current="page" >
                                            <p>
                                                Home
                                            </p>
                                        </a>
                                    </li>
                                    <hr />
                                    <li className="nav-item">
                                        <a href="/Dashboard" className={window.location.pathname.split('/').pop() === "Dashboard" ? "nav-link profilo-paziente active" : "nav-link profilo-paziente"} aria-current="page" >
                                            <p>
                                                Elenco assistiti
                                            </p>
                                        </a>
                                    </li>
                                    {localStorage.getItem("newPatient") != null ? '' :
                                        <>
                                            <li className="nav-item">
                                                <a href={`/PatientRegistry/${patientId}`} className={window.location.pathname.split('/').at(-2) === "PatientRegistry" ? "nav-link anagrafica-paziente active" : "nav-link anagrafica-paziente"} aria-current="page" >
                                                    <p >
                                                        Anagrafica assistito
                                                    </p>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href={`/PatientProfile/${patientId}`} className={window.location.pathname.split('/').at(-2) === "PatientProfile" ? "nav-link profilo-paziente active" : "nav-link profilo-paziente"} aria-current="page" >
                                                    <p>
                                                        Profilo assistito
                                                    </p>
                                                </a>
                                            </li>
                                        </>
                                    }
                                    <li className="nav-item">
                                        <a href={`/NewTherapy/${patientId}`} className={window.location.pathname.split('/').at(-2) === "NewTherapy" ? "nav-link terapia active" : "nav-link terapia"} aria-current="page" >
                                            <p>
                                                Terapia
                                            </p>
                                        </a>
                                    </li>
                                    {localStorage.getItem("newPatient") != null ? '' :
                                        <>
                                            <li className="nav-item">
                                                <a href={`/AdverseEvents/${patientId}`} className={window.location.pathname.split('/').at(-2) === "AdverseEvents" ? "nav-link eventi-avversi active" : "nav-link eventi-avversi"} aria-current="page" >

                                                    <p>
                                                        Eventi avversi
                                                    </p>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href={`/EpilepticSeizures/${patientId}`} className={window.location.pathname.split('/').at(-2) === "EpilepticSeizures" ? "nav-link crisi-epilettiche active" : "nav-link crisi-epilettiche"} aria-current="page" >
                                                    <p>
                                                        Crisi
                                                    </p>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href={`/DiagnosticTests/${patientId}`} className={window.location.pathname.split('/').at(-2) === "DiagnosticTests" ? "nav-link esami-diagnostici active" : "nav-link esami-diagnostici"} aria-current="page" >
                                                    <p>
                                                        Esami diagnostici
                                                    </p>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href={`/MedicalExaminations/${patientId}`} className={window.location.pathname.split('/').at(-2) === "MedicalExaminations" ? "nav-link esami-diagnostici active" : "nav-link esami-diagnostici"} aria-current="page" >
                                                    <p>
                                                        Visite mediche
                                                    </p>
                                                </a>
                                            </li>

                                            <li className="nav-item">
                                                <a href={`/NutritionalPlans/${patientId}`} className={window.location.pathname.split('/').at(-2) === "NutritionalPlans" ? "nav-link piano-nutrizionale active" : "nav-link piano-nutrizionale"} aria-current="page" >
                                                    <p>
                                                        Piano nutrizionale
                                                    </p>
                                                </a>
                                            </li>

                                            <li className="nav-item">
                                                <a href={`/MoodMonitoring/${patientId}`} className={window.location.pathname.split('/').at(-2) === "MoodMonitoring" ? "nav-link umore active" : "nav-link umore"} aria-current="page" >
                                                    <p>
                                                        Umore
                                                    </p>
                                                </a>
                                            </li>
                                            {/* <li className="nav-item">
                                                <a href="/" className="nav-link logout" >
                                                    <p>
                                                        Logout
                                                    </p>
                                                </a>
                                            </li> */}
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
                                            <a href="/DoctorProfile" className={window.location.pathname.split('/').pop() === "DoctorProfile" ? "nav-link profilo-paziente-nome active" : "nav-link profilo-paziente-nome"} aria-current="page" >
                                                <p>
                                                    {userProfile.name} {userProfile.surName}
                                                </p>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="/DoctorChartsInterface" className={window.location.pathname.split('/').pop() === "DoctorChartsInterface" ? "nav-link home active" : "nav-link home"} aria-current="page" >
                                                <p>
                                                    Home
                                                </p>
                                            </a>
                                        </li>
                                        <hr />
                                        <li className="nav-item">
                                            <a href="/Dashboard" className={window.location.pathname.split('/').pop() === "Dashboard" ? "nav-link elenco-pazienti active" : "nav-link elenco-pazienti"} aria-current="page" >

                                                <p>
                                                    Elenco assistiti
                                                </p>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="/NewPatient" className={window.location.pathname.split('/').pop() === "NewPatient" ? "nav-link nuovo-paziente active" : "nav-link nuovo-paziente"} aria-current="page" >
                                                <p>
                                                    Crea nuovo assistito
                                                </p>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="/RichiediCodice" className={window.location.pathname.split('/').pop() === "RichiediCodice" ? "nav-link no-kit active" : "nav-link no-kit"} aria-current="page" >
                                                <p>
                                                    Richiedi nuovo codice assistito
                                                </p>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="/AssociatePatient" className={window.location.pathname.split('/').pop() === "AssociatePatient" ? "nav-link collega-paziente active" : "nav-link collega-paziente"} aria-current="page" >
                                                <p>
                                                    Collega assistito già assegnato
                                                </p>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="/DoctorProfile" className={window.location.pathname.split('/').pop() === "DoctorProfile" ? "nav-link profilo-paziente active" : "nav-link profilo-paziente"} aria-current="page" >
                                                <p>
                                                    Anagrafica medico
                                                </p>
                                            </a>
                                        </li>



                                        {/* <li className="nav-item">
                                            <a href="/" className="nav-link logout" >
                                                <p>
                                                    Logout
                                                </p>
                                            </a>
                                        </li> */}
                                    </>
                                    : <>
                                        {localStorage.getItem("newPatient") != null ? '' :
                                            <>
                                                <li className="nav-item">
                                                    <a href="/DoctorProfile" className={window.location.pathname.split('/').pop() === "DoctorProfile" ? "nav-link profilo-paziente-nome active" : "nav-link profilo-paziente-nome"} aria-current="page" >
                                                        <p>
                                                            {userProfile.name} {userProfile.surName}
                                                        </p>
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="/DoctorChartsInterface" className={window.location.pathname.split('/').pop() === "DoctorChartsInterface" ? "nav-link home active" : "nav-link home"} aria-current="page" >
                                                        <p>
                                                            Home
                                                        </p>
                                                    </a>
                                                </li>
                                                <hr />
                                                <li className="nav-item">
                                                    <a href="/Dashboard" className={window.location.pathname.split('/').pop() === "Dashboard" ? "nav-link profilo-paziente active" : "nav-link profilo-paziente"} aria-current="page" >
                                                        <p>
                                                            Elenco assistiti
                                                        </p>
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href={`/PatientRegistry/${patientId}`} className={window.location.pathname.split('/').at(-2) === "PatientRegistry" ? "nav-link anagrafica-paziente active" : "nav-link anagrafica-paziente"} aria-current="page" >

                                                        <p >
                                                            Anagrafica assistito
                                                        </p>
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href={`/PatientProfile/${patientId}`} className={window.location.pathname.split('/').at(-2) === "PatientProfile" ? "nav-link profilo-paziente active" : "nav-link profilo-paziente"} aria-current="page" >

                                                        <p>
                                                            Profilo assistito
                                                        </p>
                                                    </a>
                                                </li>
                                            </>
                                        }
                                        <li className="nav-item">
                                            <a href={`/NewTherapy/${patientId}`} className={window.location.pathname.split('/').at(-2) === "NewTherapy" ? "nav-link terapia active" : "nav-link terapia"} aria-current="page" >
                                                <p>
                                                    Terapia
                                                </p>
                                            </a>
                                        </li>
                                        {localStorage.getItem("newPatient") != null ? '' :
                                            <>
                                                <li className="nav-item">
                                                    <a href={`/AdverseEvents/${patientId}`} className={window.location.pathname.split('/').at(-2) === "AdverseEvents" ? "nav-link eventi-avversi active" : "nav-link eventi-avversi"} aria-current="page" >
                                                        <p>
                                                            Eventi avversi
                                                        </p>
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href={`/EpilepticSeizures/${patientId}`} className={window.location.pathname.split('/').at(-2) === "EpilepticSeizures" ? "nav-link crisi-epilettiche active" : "nav-link crisi-epilettiche"} aria-current="page" >
                                                        <p>
                                                            Crisi
                                                        </p>
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href={`/DiagnosticTests/${patientId}`} className={window.location.pathname.split('/').at(-2) === "DiagnosticTests" ? "nav-link esami-diagnostici active" : "nav-link esami-diagnostici"} aria-current="page" >
                                                        <p>
                                                            Esami diagnostici
                                                        </p>
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href={`/MedicalExaminations/${patientId}`} className={window.location.pathname.split('/').at(-2) === "MedicalExaminations" ? "nav-link esami-diagnostici active" : "nav-link esami-diagnostici"} aria-current="page" >
                                                        <p>
                                                            Visite mediche
                                                        </p>
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href={`/NutritionalPlans/${patientId}`} className={window.location.pathname.split('/').at(-2) === "NutritionalPlans" ? "nav-link piano-nutrizionale active" : "nav-link piano-nutrizionale"} aria-current="page" >
                                                        <p>
                                                            Piano nutrizionale
                                                        </p>
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href={`/MoodMonitoring/${patientId}`} className={window.location.pathname.split('/').at(-2) === "MoodMonitoring" ? "nav-link umore active" : "nav-link umore"} aria-current="page" >
                                                        <p>
                                                            Umore
                                                        </p>
                                                    </a>
                                                </li>

                                                {/* <li className="nav-item">
                                                    <a href="/" className="nav-link logout" >
                                                        <p>
                                                            Logout
                                                        </p>
                                                    </a>
                                                </li> */}
                                            </>
                                        }
                                    </>
                                }
                            </>
                            : <>                              
                                <li className="nav-item">
                                    <a href="/DoctorChartsInterface" className={window.location.pathname.split('/').pop() === "DoctorChartsInterface" ? "nav-link home active" : "nav-link home"} aria-current="page" >
                                        <p>
                                            Home
                                        </p>
                                    </a>
                                </li>
                            </>
                }
            </ul>
            <p className="pharmaPrime d-none d-lg-block">
                Progetto <br/>a cura di
            </p>
            <br />
            <p className="angelini d-none d-lg-block">
                Realizzato con il contributo di
            </p>
            <br />
            
            <p className="ae d-none d-lg-block">
                Con il <br/>patrocinio di
            </p>
        </header>


    )
}

export default SideNav
