import React, { Component } from 'react';
import { Row} from 'react-bootstrap';
import { patient } from '../helpers/api/api';
import SimpleReactValidator from 'simple-react-validator';
import { ControlledPatientTabs } from './PatientTabs';

export class PatientTabbedInterface extends Component {

    userModelProp = () => ({
        id: window.location.pathname.split('/').pop(),
        patientCode: '',
        fiscalCode: '',
        name: '',
        surName: '',
        phoneNumber: '',
        email: '',
        canTravel: '',
        canDrive: '',
        numberStartingSeizures: '',

        itemsAdverseEvents: [],
        itemsEpilepticSeizures: []
    });

    constructor(props) {
        super(props);

        this.validator = new SimpleReactValidator();
        this.state = {
            activeKey: '',
            patientDto: {
                ...this.userModelProp(),
            }
        }
    }


    async componentDidMount() {
        const reloadCount = sessionStorage.getItem('reloadCount');
        if (reloadCount < 2) {
            sessionStorage.setItem('reloadCount', String(reloadCount + 1));
            window.location.reload();
        } else {
            sessionStorage.removeItem('reloadCount');
        }
        const [patientDto, itemsAdverseEvents, itemsEpilepticSeizures] = await Promise.all([
            this.getPatient(),
            this.getAdverseEvents(),
            this.getEpilepticSeizures(),
        ]);
    }

    getPatient() {
        patient.get("Get/", this.state.patientDto.id)
            .then((response) => {
                if (response.status === 200) {
                    this.setState({
                        isLoaded: true,
                        patientDto: response.data.dati,
                        canTravel: response.data.dati.canTravel,
                        canDrive: response.data.dati.canDrive,


                    });
                }
            }).catch((error) => {
                this.setState({ error: 1 })
            });
    }

    getEpilepticSeizures() {
        patient.get("Seizures/", this.state.patientDto.id)
            .then((response) => {
                if (response.status === 200) {
                    this.setState({
                        isLoaded: true,
                        itemsEpilepticSeizures: response.data.dati,
                    });
                }
            }).catch((error) => {
                this.setState({ error: 1 })
            });
    }

    getAdverseEvents() {
        patient.get("Events/", this.state.patientDto.id)
            .then((response) => {
                if (response.status === 200) {
                    this.setState({
                        isLoaded: true,
                        itemsAdverseEvents: response.data.dati,
                    });
                }
            }).catch((error) => {
                this.setState({ error: 1 })
            });
    }



    setCanDrive = (canDrive) => {
        const inputValue = canDrive;
        this.updateState('canDrive', inputValue, 'patientDto');
    }

    setCanTravel = (canTravel) => {
        const inputValue = canTravel;
        this.updateState('canTravel', inputValue, 'patientDto');
    }

    handleChange = (el) => {
        const inputName = el.target.name;
        const inputValue = el.target.value;
        this.updateState(inputName, inputValue, 'patientDto');
    };

    updateState = (inputName, inputValue, objName) => {
        const statusCopy = { ...this.state };
        statusCopy[objName][inputName] = inputValue;
        this.setState(statusCopy);
    };



    render() {

        return (

            <>
                <Row className='col-12 pt-12' >
                    <div className='col-12'>
                        <h1>Medico - Anagrafica paziente {this.state.patientDto.patientCode} </h1>
                    </div>
                </Row>
                <ControlledPatientTabs patient={this.state.patientDto}

                    setCanDrive={this.setCanDrive}
                    setCanTravel={this.setCanTravel}
                    adverseEvents={this.state.itemsAdverseEvents}
                    epilepticSeizures={this.state.itemsEpilepticSeizures}
                    numberStartingSeizures={this.state.patientDto.numeroCrisiPartenza}
                    patientId={this.state.patientDto.id} />

            </>

        )
    }
}

export default PatientTabbedInterface
