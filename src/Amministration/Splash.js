import React, { Component } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { api, user } from '../helpers/api/api';
import { Link } from "react-router-dom";
import SimpleReactValidator from 'simple-react-validator';
import { entitiesLabels, message } from '../helpers/Constants';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import moment from 'moment';
export class Splash extends Component {
    //STATO
    userModelProp = () => ({

    });
    constructor(props) {
        super(props);
        this.state = {

        }
        this.reset = this.reset.bind(this);
    }
    componentDidMount() {
        this.reset();
        document.body.className = "splash";
    }

    //FUNZIONI 
    reset = () => {
        window.localStorage.clear();
    };


    //VIEW 
    render() {


        return (
            
            <>
                <div style={{ "textAlign": "center" }}><h1 className="h1 mb-5">Making the future, <span className="text-secondary">caring for life</span></h1></div>
                <div style={{ "textAlign": "center" }}>
                <a href="/Register" className="btn btn-primary btn-arrow mx-2">Registrati medico</a>
                <a href="/Login" className="btn btn-secondary btn-arrow mx-2">Accedi</a>
                </div>
            </>


        )
    }
}

export default Splash
