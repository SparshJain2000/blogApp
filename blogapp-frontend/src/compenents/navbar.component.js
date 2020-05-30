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
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooter,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
} from "reactstrap";
import { setGlobalCssModule } from "reactstrap/lib/utils";
export default class NavbarComponent extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.logout = this.logout.bind(this);
        this.addPost = this.addPost.bind(this);
        this.state = {
            isOpen: false,
            navCollapsed: true,
            showNavbar: false,
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
        window.location = "/";
    }

    addPost(event) {
        // const blog = {
        //     title: this.title.value,
        //     image: this.imageURL.value,
        //     body: this.body.value,
        // };
        // console.log(blog);
        // alert(blog.title);
        // // axios.post("/blogs");
        // axios
        //     .post("/blogs", blog)
        //     .then((blog) => {
        //         console.log(blog);
        //         window.location = "/blogs";
        //     })
        //     .catch((err) => console.log(err));
        // event.preventDefault();
        // this.toggleModal();
    }
    render() {
        return (
            <Navbar color='dark' dark expand='lg'>
                <NavbarBrand>
                    <Link
                        to='/'
                        className='navbar-brand'
                        style={{ fontFamily: "Monoton", fontWeight: "100" }}>
                        BlogApp
                    </Link>
                </NavbarBrand>
                <NavbarToggler onClick={this.toggle} />{" "}
                <Collapse isOpen={this.state.isOpen} navbar>
                    {this.state.user ? (
                        <Nav className='ml-auto' navbar>
                            <NavItem className='navbar-item'>
                                <a
                                    className=' btn btn-primary text-white'
                                    onClick={this.logout}>
                                    {this.state.user.username}
                                </a>
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
// export default NavbarComponent;
// Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti voluptates fugit distinctio, deserunt nostrum itaque et nemo quod quae dolorum qui illo obcaecati totam voluptatem in dicta enim iusto excepturi.
