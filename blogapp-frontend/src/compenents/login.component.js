import React, { Component } from "react";
import { Label, Form } from "reactstrap";
import axios from "axios";
export default class login extends Component {
    constructor(props) {
        super(props);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            username: "",
            password: "",
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
    onSubmit(e) {
        e.preventDefault();
        const user = {
            username: this.state.username,
            password: this.state.password,
        };
        console.log(this.props);
        axios
            .post("/users/login", user)
            .then((res) => {
                this.props.updateUser(res.data.user).then(() => {
                    console.log(this.props.user);
                    window.location = "/";
                });

                // console.log(this.props);
                // window.location = "blogs";
                console.log(this.props);
            })
            .catch((err) => console.log(err));
        // this.setState({
        //     username: "",
        //     password: "",
        // });
    }
    render() {
        return (
            <div id='form' className='m-5 p-3'>
                <h3>Login</h3>
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
                        <input
                            type='submit'
                            value='Create User'
                            className='btn btn-primary'
                        />
                    </div>
                </Form>
            </div>
        );
    }
}
