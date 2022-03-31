import { Container, Row, Col, Form, Button, Toast, } from 'react-bootstrap';
import React, { Component } from 'react';
export class showNotification extends Component {

  render() {
    return(
      <Toast  show={this.state.notification} delay={3000} autohide>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt="jm"
            />
            <strong className="me-auto">Bootstrap</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
        </Toast>
    )
  }

}