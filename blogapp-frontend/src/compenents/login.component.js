import React, { Component } from "react";
import {
    Label,
    Form,
    Button,
    FormGroup,
    Input,
    Modal,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Alert,
} from "reactstrap";
import axios from "axios";
export default class login extends Component {
    constructor(props) {
        super(props);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.addUser = this.addUser.bind(this);
        this.state = {
            username: "",
            password: "",
            email: "",
            alert: false,
            isModalOpen: false,
        };
    }
    onChangeUsername(e) {
        this.setState({
            username: e.target.value,
        });
    }
    onChangePassword(e) {
        this.setState({
            password: e.target.value,
        });
    }
    onChangeEmail(e) {
        this.setState({
            email: e.target.value,
        });
    }
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen,
        });
    }
    onSubmit(e) {
        e.preventDefault();
        const user = {
            username: this.state.username,
            password: this.state.password,
        };
        // console.log(this.props);
        axios
            .post("/users/login", user)
            .then((res) => {
                this.props.updateUser(res.data.user).then(() => {
                    console.log("asdf");
                    window.location = "/";
                });
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    alert: true,
                });
            });
    }
    addUser(e) {
        e.preventDefault();
        const newUser = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
        };
        axios
            .post("/users/", newUser)
            .then(({ data }) => {
                console.log(data);
                this.props.updateUser(data.user).then(() => {
                    window.location = "/";
                });
                this.setState({
                    alert: false,
                });
            })
            .catch((err) => {
                this.setState({
                    alert: true,
                });
                console.log(err);
                console.log(this.state.alert);
            });
        this.toggleModal();
    }
    componentDidMount() {
        if (this.props.user) window.location = "/";
    }
    render() {
        return (
            <div>
                {this.state.alert && (
                    <div className='p-3 mt-1'>
                        <Alert fade='true'>Invalid Credentials</Alert>
                    </div>
                )}

                <div id='form' className='p-4 my-4'>
                    <h1 style={{ fontFamily: "Kaushan Script" }}>Login</h1>
                    <Form onSubmit={this.onSubmit}>
                        <div className='form-group'>
                            <Label>Username : </Label>
                            <input
                                type='text'
                                required
                                className='form-control'
                                value={this.state.username}
                                onChange={this.onChangeUsername}
                            />
                        </div>
                        <div className='form-group'>
                            <Label>Password : </Label>
                            <input
                                type='password'
                                required
                                className='form-control'
                                value={this.state.password}
                                onChange={this.onChangePassword}
                            />
                        </div>
                        <div className='form-group'>
                            New to{" "}
                            <span
                                style={{
                                    fontFamily: "Monoton",
                                }}>
                                BlogApp ?
                            </span>{" "}
                            <Button
                                className='btn btn-sm'
                                color='success'
                                onClick={this.toggleModal}>
                                Sign Up
                            </Button>
                        </div>
                        <div className='form-group'>
                            <input
                                type='submit'
                                value='Login'
                                className='btn btn-primary'
                            />
                        </div>
                    </Form>
                </div>
                <Modal
                    isOpen={this.state.isModalOpen}
                    fade={false}
                    toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>
                        Add a blog
                    </ModalHeader>
                    <Form onSubmit={this.addUser}>
                        <ModalBody>
                            <FormGroup>
                                <Label htmlFor='username'>Username</Label>
                                <Input
                                    type='text'
                                    id='username'
                                    onChange={this.onChangeUsername}
                                    name='username'></Input>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor='email'>Email</Label>
                                <Input
                                    type='text'
                                    id='email'
                                    onChange={this.onChangeEmail}
                                    name='email'></Input>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor='password'>Password</Label>
                                <Input
                                    type='password'
                                    id='password'
                                    onChange={this.onChangePassword}
                                    name='password'></Input>
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                type='submit'
                                value='submit'
                                color='primary'>
                                Sign Up
                            </Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </div>
        );
    }
}
