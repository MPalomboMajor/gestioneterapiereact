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
    }

    //FUNZIONI 



    //VIEW 
    render() {


        return (

            <div class="splash">
                <div class="wrapper bg-primary">
                    <h1 class="h1 mb-5">Making the future, <span class="text-secondary">caring for life</span></h1>
                    <div><a href="/Register" class="btn btn-primary btn-arrow mx-2">Registrati</a><a href="/Login"  class="btn btn-secondary btn-arrow mx-2">Accedi</a></div>
                </div>

            </div>
        )
    }
}

export default Splash
