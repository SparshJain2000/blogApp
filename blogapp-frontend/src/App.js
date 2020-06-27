import React, { Component, createRef } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route } from 'react-router-dom';
import NavbarComponent from './compenents/navbar.component';
import Blog from './compenents/blog.component';
import BlogList from './compenents/blogList.component';
import Myblogs from './compenents/myBlog.component';

import Login from './compenents/login.component';
import axios from 'axios';
export default class App extends Component {
	constructor (props) {
		super(props);
		this.updateUser = this.updateUser.bind(this);
		this.setUser = this.setUser.bind(this);
		this.state = {
			user : null
		};
	}
	wrapper = createRef();
	componentDidMount () {
		const node=this.wrapper.current;
		console.log(node)
		axios
			.get('api/users/current')
			.then((res) =>
				this.setState({
					user : res.data.user
				})
			)
			.catch((err) => console.log(err.response));
	}
	async setUser () {
		axios
			.get('api/users/current')
			.then((res) => {
				this.setState({
					user : res.data.user
				});
				console.log(this.state.user);
			})
			.catch((err) => console.log(err.response.data));
	}
	async updateUser (user) {
		this.setState({
			user : user
		});
		console.log(this.state.user);
	}
	render () {
		return (
			<BrowserRouter>
				<NavbarComponent user={this.state.user} updateUser={this.updateUser} />
				<Route
					path='/'
					exact
					render={(props) => (
						<BlogList
							{...props}
							user={this.state.user}
							updateUser={this.updateUser}
							setUser={this.setUser}
						/>
					)}
				/>
				<Route
					path='/blog/:id'
					exact
					render={(props) => <Blog {...props} user={this.state.user} updateUser={this.updateUser} />}
				/>
				{/* <Route
					path='/blog/edit/:id'
					exact
					component={() => <BlogEdit user={this.state.user} updateUser={this.updateUser} />}
				/> */}
				<Route
					path='/myblogs/'
					exact
					component={() => <Myblogs user={this.state.user} updateUser={this.updateUser} />}
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
					render={(props) => <Login {...props} user={this.state.user} updateUser={this.updateUser} />}
				/>
			</BrowserRouter>
		);
	}
}
