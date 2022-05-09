import { useState, useEffect } from 'react';
import { Tabs, Tab, Form, Button } from 'react-bootstrap';
import { PatientRegistry } from "./PatientRegistry"
import { PatientProfile } from "./PatientProfile"
import { AdverseEventsInfo } from "./AdverseEventsTable"
import { EpilepticSeizuresInfo } from "./EpilepticSeizuresComponent"
import { BloodTestsInfo } from "./BloodTestsComponent"
import NewTherapy from './NewTherapy';
import { patient } from '../helpers/api/api';
import { entitiesLabels, message } from '../helpers/Constants';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

function ControlledPatientTabs(props) {
    const [key, setKey] = useState('anagraficaPaziente');

    function editPatient() {
        patient.post("Save/", props.patient)
            .then((response) => {
                if (response.status === 200) {
                    setKey('profilo');
                    NotificationManager.success(message.PATIENT + message.SuccessUpdate, entitiesLabels.SUCCESS, 3000);
                }
            }).catch((error) => {
                NotificationManager.error(message.ErrorServer, entitiesLabels.ERROR, 3000);
            });
    };
    // useEffect(() => {
    //     const editPatient = async () => {           
    //         await patient.post("Save/", props.patient)
    //         .then((response) => {
    //             if (response.status === 200) {
    //                 console.log("ciao");
    //                 setKey('profilo');
    //             }
    //         }).catch((error) => {    
    //         });
    //     };
    //     editPatient();
    // }, [key]);

    // editPatient = (eventKey) => {       
    //     console.log(eventKey);      
    //     patient.post("Save/", this.state.patientDto)
    //     .then((response) => {  
    //         if (response.status === 200) {

    //             this.setState({
    //                 patientDto: response.data.dati,
    //                 activeKey: eventKey, 
    //             });
    //         }
    //     }).catch((error) => {
    //         this.setState({ error: 1 })
    //     });

    // }


    return (
        <>
            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
            >
                <Tab eventKey="anagraficaPaziente" title="Anagrafica assistito">
                    <PatientRegistry patient={props.patient} />
                </Tab>
                <Tab eventKey="profilo" title="Profilo" >
                    <PatientProfile patient={props.patient} setCanDrive={props.setCanDrive} setCanTravel={props.setCanTravel} editPatient={editPatient} />
                </Tab>
                <Tab eventKey="terapia" title="Terapia" >
                    <NewTherapy />
                </Tab>
                <Tab eventKey="eventiAvversi" title="Eventi avversi" >
                    <AdverseEventsInfo adverseEvents={props.adverseEvents} />
                </Tab>
                <Tab eventKey="crisiEpilettiche" title="Crisi epilettiche" >
                    <EpilepticSeizuresInfo epilepticSeizures={props.epilepticSeizures} numberStartingSeizures={props.patient.numeroCrisiPartenza} />
                </Tab>
                <Tab eventKey="analisiDelSangue" title="Analisi del sangue" >
                    <BloodTestsInfo patientId={props.patient.id} />
                </Tab>
                <Tab eventKey="visiteMediche" title="Visite mediche" >

                </Tab>
                <Tab eventKey="mood" title="Mood" >

                </Tab>
            </Tabs>
            < NotificationContainer />
            </>
        
    );
}


export { ControlledPatientTabs }
