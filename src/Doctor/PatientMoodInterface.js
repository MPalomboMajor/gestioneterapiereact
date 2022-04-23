import { useState, useEffect } from 'react';
import { Tabs, Tab, Form, Button } from 'react-bootstrap';
import { patient } from '../helpers/api/api';
import { entitiesLabels, message } from '../helpers/Constants';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { PatientWeeklyMood } from './PatientWeeklyMood';
import { PatientDailyMood } from './PatientDailyMood';

function PatientMoodInterface(props) {
    const [key, setKey] = useState('dailyMoodMonitoring');
    const [patientId, setPatientId] = useState(window.location.pathname.split('/').pop());
    const [patientProfile, setPatientProfile] = useState([]);
    const [canTravel, setCanTravel] = useState();
    const [canDrive, setCanDrive] = useState();

    useEffect(() => {
        const fetchPatient = async () => {
            await patient.get("Get/", patientId)
                .then((response) => {
                    if (response.status === 200) {
                        setPatientProfile(response.data.dati);
                        setCanTravel(response.data.dati.canTravel);
                        setCanDrive(response.data.dati.canDrive);
                    }
                }).catch((error) => {

                });
        };
        fetchPatient();
    }, []);

    function editPatient() {  
        patient.post("Save/", patientProfile)
            .then((response) => {
                if (response.status === 200) {
                    NotificationManager.success(message.PATIENT + message.SuccessUpdate, entitiesLabels.SUCCESS, 3000);
                }
            }).catch((error) => {
                NotificationManager.error(message.ErrorServer, entitiesLabels.ERROR, 3000);
            });
    };

    const updateStatesCanTravel = () => {
        setPatientProfile({
            ...patientProfile, canTravel:
                !canTravel
        });
        setCanTravel(!canTravel);
    }

    const updateStatesCanDrive = () => {
        setPatientProfile({
            ...patientProfile, canDrive:
                !canDrive
        });
        setCanDrive(!canDrive);
    }

    const handleChange = (e) => {       
        const inputValue = e.target.value;
        const inputName = e.target.getAttribute('name');
        setPatientProfile({                      
                ...patientProfile, [inputName]:
                        inputValue
        });
};


    return (
        <>
            <Tabs
                id="mood-tabs"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
            >
                <Tab eventKey="dailyMoodMonitoring" title="Monitoraggio umore quotidiano">
                    <PatientDailyMood  />
                </Tab>
                <Tab eventKey="weeklyMoodMonitoring" title="Monitoraggio umore settimanale" >
                    <PatientWeeklyMood />
                </Tab>               
            </Tabs>
            < NotificationContainer />
            </>
        
    );
}


export { PatientMoodInterface }
