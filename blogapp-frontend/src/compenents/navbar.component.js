import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
    NavbarBrand,
    Navbar,
    NavItem,
    Collapse,
    Nav,
    NavbarToggler,
} from "reactstrap";
import { setGlobalCssModule } from "reactstrap/lib/utils";
export default class NavbarComponent extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.logout = this.logout.bind(this);
        this.state = {
            isOpen: false,
            navCollapsed: true,
            showNavbar: false,
            isLoggedIn: true,
            user: null,
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }
    componentDidMount() {
        console.log(this.props);

        axios
            .get("/users/current")
            .then((res) => this.setState({ user: res.data.user }))
            .catch((err) => console.log(err));
        // console.log(this.props);
    }
    logout() {
        axios
            .get("/users/logout")
            .then((res) => {
                console.log(res.data);
                this.props.updateUser(null);
                this.setState({
                    user: null,
                });
            })
            .catch((err) => console.log(err));
    }
    render() {
        return (
            <Navbar color='dark' dark expand='lg'>
                <NavbarBrand>
                    <Link to='/' className='navbar-brand'>
                        BlogApp
                    </Link>
                </NavbarBrand>
                <NavbarToggler onClick={this.toggle} />{" "}
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className='ml-auto' navbar>
                        <NavItem className='navbar-item'>
                            {this.state.user ? (
                                <a className='nav-link' onClick={this.logout}>
                                    Logout
                                </a>
                            ) : (
                                <Link className='nav-link' to='/login'>
                                    Login
                                </Link>
                            )}
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }
}
// export default NavbarComponent;
