import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './Posts.css';
import Spinner from '../Spinner/Spinner';

const BEMHelper = require('react-bem-helper');
const classes = new BEMHelper('posts');

class Posts extends Component {

	constructor(props) {
		super(props);

		this.state = {
			posts: [],
			ajaxDone: false
		}
	}

	renderItem(i) {

	}

	componentDidMount() {
		// axios.get('http://www.reddit.com/r/${this.props.subreddit}.json')
		axios
			.get('https://jsonplaceholder.typicode.com/posts')
			.then(res => {
				const posts = res.data;
				const ajaxDone = true;

				this.setState({ posts, ajaxDone });
			});

	}

	render() {
		return (
			<div {...classes()}>
				<h1 {...classes('title')}>Posts</h1>

				{!this.state.ajaxDone &&
					<Spinner/>
				}
				{this.state.ajaxDone &&
					<ul {...classes('list')}>
						{this.state.posts.map(post =>
							<li {...classes('item')} key={post.id}>
								<Link to={{pathname: "/post/" + post.id}}>{post.title}</Link>
							</li>
						)}
					</ul>
				}
			</div>
		)
	}
}

export default Posts
