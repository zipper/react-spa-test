import React, { Component } from 'react';
import axios from 'axios';

import './User.css';
import Spinner from '../Spinner/Spinner';

const BEMHelper = require('react-bem-helper');
const classes = new BEMHelper('user');

const userId = 1;

class User extends Component {

	constructor(props) {
		super(props);

		this.state = {
			user: [],
			ajaxDone: false
		}
	}

	componentDidMount() {
		axios
			.get('https://jsonplaceholder.typicode.com/users/' + userId)
			.then(res => {
				const user = res.data;
				const ajaxDone = true;

				this.setState({ user, ajaxDone });
			});
	}

	render() {
		return (
			<div {...classes()}>
				{!this.state.ajaxDone &&
					<Spinner/>
				}
				{this.state.ajaxDone &&
					<div>
						<h1 {...classes('title')}>{this.state.user.name}</h1>

						<p {...classes('email')}>E-mail: <a href={"mailto:" + this.state.user.email}>{this.state.user.email}</a></p>
						<p {...classes('phone')}>Phone: <a href={"tel:" + this.state.user.phone}>{this.state.user.phone}</a></p>
						<p {...classes('website')}>Website: <a href={"http://" + this.state.user.website}>{this.state.user.website}</a></p>

						<p {...classes('company')}>Company: {this.state.user.company.name}</p>

						<h3>Address</h3>
						<address {...classes('address')}>
							{this.state.user.address.city}<br/>
							{this.state.user.address.street}<br/>
							{this.state.user.address.suite}<br/>
							{this.state.user.address.zipcode}<br/>
							(lat: {this.state.user.address.geo.lat}, lng: {this.state.user.address.geo.lng})
						</address>
					</div>
				}
			</div>
		)
	}
}

export default User
