import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route } from "react-router-dom";
import NavbarComponent from "./compenents/navbar.component";
import Blog from "./compenents/blog.component";
import BlogEdit from "./compenents/blogEdit.component";
import BlogList from "./compenents/blogList.component";
import Login from "./compenents/login.component";
import axios from "axios";
export default class App extends Component {
    constructor(props) {
        super(props);
        this.updateUser = this.updateUser.bind(this);
        this.state = {
            user: null,
        };
    }
    componentDidMount() {
        axios
            .get("/users/current")
            .then((res) =>
                this.setState({
                    user: res.data.user,
                })
            )
            .catch((err) => console.log(err));
    }
    async updateUser(user) {
        this.setState({
            user: user,
        });
        console.log(this.state.user);
    }
    render() {
        return (
            <BrowserRouter>
                <NavbarComponent
                    user={this.state.user}
                    updateUser={this.updateUser}
                />
                <Route
                    path='/'
                    exact
                    render={(props) => (
                        <BlogList
                            {...props}
                            user={this.state.user}
                            updateUser={this.updateUser}
                        />
                    )}
                />
                <Route
                    path='/blog/:id'
                    exact
                    render={(props) => (
                        <Blog
                            {...props}
                            user={this.state.user}
                            updateUser={this.updateUser}
                        />
                    )}
                />
                <Route
                    path='/blog/edit/:id'
                    exact
                    component={() => (
                        <BlogEdit
                            user={this.state.user}
                            updateUser={this.updateUser}
                        />
                    )}
                />
                <Route
                    path='/login'
                    exact
                    // component={() => (
                    //     <Login
                    //         user={this.state.user}
                    //         updateUser={this.updateUser}
                    //     />
                    // )}
                    render={(props) => (
                        <Login
                            {...props}
                            user={this.state.user}
                            updateUser={this.updateUser}
                        />
                    )}
                />
            </BrowserRouter>
        );
    }
}
