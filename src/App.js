import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import ActionHome from 'material-ui/svg-icons/action/home';
import ActionFace from 'material-ui/svg-icons/action/face';
import ActionQuestionAnswer from 'material-ui/svg-icons/action/question-answer';

import User from './User/User'
import Posts from './Posts/Posts';
import Post from './Post/Post';

import './App.css';

const history = createBrowserHistory();

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			open: false
		}
	}

	toggleDrawer = () => this.setState({ open: !this.state.open })

	render() {
		return (
			<Router history={history}>
				<div>
					<AppBar
						title="SPA in React"
						onLeftIconButtonTouchTap={this.toggleDrawer}
					/>

					<Drawer
						docked={false}
						width={300}
						onRequestChange={this.toggleDrawer}
						open={this.state.open}
					>
						<AppBar
							title="Menu"
							iconElementLeft={<IconButton><NavigationClose /></IconButton>}
							onLeftIconButtonTouchTap={this.toggleDrawer}
						/>
						<MenuItem
							primaryText="Home"
							leftIcon={<ActionHome/>}
							containerElement={<Link to="/" />}
							onClick={() => {
								this.toggleDrawer();
							}}
						/>
						<MenuItem
							primaryText="Profile"
							leftIcon={<ActionFace/>}
							containerElement={<Link to="/user" />}
							onClick={() => {
								this.toggleDrawer();
							}}
						/>
						<MenuItem
							primaryText="Posts"
							leftIcon={<ActionQuestionAnswer/>}
							containerElement={<Link to="/posts" />}
							onClick={() => {
								this.toggleDrawer();
							}}
						/>
					</Drawer>

					<div className="app">
						<Route exact path="/" render={() => <h1>App homepage</h1>}/>
						<Route path="/user" component={User} />
						<Route path="/posts" component={Posts}/>
						<Route path="/post/:id" component={Post}/>
					</div>
				</div>
			</Router>
		);
	}
}

export default App;
