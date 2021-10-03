import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
    Navbar,
    NavItem,
    Collapse,
    Nav,
    NavbarToggler,
    ButtonDropdown,
    Button,
    DropdownItem,
    DropdownToggle,
    DropdownMenu,
} from "reactstrap";
import logo from "../blog.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
export default class NavbarComponent extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.logout = this.logout.bind(this);
        this.dropdownToggle = this.dropdownToggle.bind(this);

        this.state = {
            isOpen: false,
            navCollapsed: true,
            showNavbar: false,
            user: null,
            isDropdownOpen: false,
        };
    }
    dropdownToggle() {
        this.setState({
            isDropdownOpen: !this.state.isDropdownOpen,
        });
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }
    componentDidMount() {
        console.log(this.props);

        axios
            .get("/api/users/current")
            .then((res) => this.setState({ user: res.data.user }))
            .catch((err) => console.log(err.response));
    }
    logout() {
        axios
            .get("/api/users/logout")
            .then((res) => {
                console.log(res.data);
                this.props.updateUser(null);
                this.setState({
                    user: null,
                });
            })
            .catch((err) => console.log(err.response));
        window.location = "/login";
    }

    render() {
        return (
            <Navbar color='dark' dark expand='lg'>
                <Link
                    to='/'
                    className='navbar-brand'
                    style={{ fontFamily: "Monoton", fontWeight: "100" }}>
                    <img
                        src={logo}
                        style={{ maxWidth: "40px" }}
                        className='mx-2'
                    />
                    BlogApp
                </Link>
                <NavbarToggler onClick={this.toggle} />{" "}
                <Collapse isOpen={this.state.isOpen} navbar>
                    {this.state.user ? (
                        <Nav className='ml-auto mr-2' navbar>
                            <NavItem className='navbar-item'>
                                <ButtonDropdown
                                    isOpen={this.state.isDropdownOpen}
                                    toggle={this.dropdownToggle}>
                                    <Button id='caret' color='primary'>
                                        <FontAwesomeIcon
                                            icon={faUser}
                                            className='mr-2'
                                        />
                                        {this.state.user.username}
                                    </Button>
                                    <DropdownToggle caret color='primary' />
                                    <DropdownMenu right>
                                        <Link
                                            to='/myblogs/'
                                            className='dropdown-item'>
                                            My Blogs
                                        </Link>

                                        <DropdownItem divider />
                                        <DropdownItem onClick={this.logout}>
                                            logout
                                            <FontAwesomeIcon
                                                icon={faSignOutAlt}
                                                className='ml-3'
                                            />
                                        </DropdownItem>
                                    </DropdownMenu>
                                </ButtonDropdown>
                            </NavItem>
                        </Nav>
                    ) : (
                        <Nav className='ml-auto' navbar>
                            <NavItem className='navbar-item'>
                                <Link className='nav-link' to='/login'>
                                    Login
                                </Link>
                            </NavItem>
                        </Nav>
                    )}
                </Collapse>
            </Navbar>
        );
    }
}
