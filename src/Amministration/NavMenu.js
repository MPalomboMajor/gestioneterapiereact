import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, Nav, NavItem, Navbar} from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';


export class NavMenu extends Component {
    render() {
        return (
            <div>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
                    <Nav.Item>
                        <Nav.Link>
                        <NavLink className="nav-link" to="/">Login</NavLink>
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                    <Nav.Link>
                        <NavLink className="nav-link" to="/back2">Back2</NavLink>
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                    <Nav.Link>
                        <NavLink className="nav-link" to="/list">List</NavLink>
                        </Nav.Link>
                    </Nav.Item>
                </Navbar>
            </div>
        )
    }
}
export default NavMenu
