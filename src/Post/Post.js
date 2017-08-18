import React, { Component } from 'react';
import axios from 'axios';

import './Post.css';
import Spinner from '../Spinner/Spinner';

const BEMHelper = require('react-bem-helper');
const classes = new BEMHelper('post');

class Post extends Component {

	constructor(props) {
		super(props);

		this.state = {
			post: [],
			ajaxDone: false,
			ajaxComments: false,
		}

	}

	componentDidMount() {
		axios
			.get('https://jsonplaceholder.typicode.com/posts/' + this.props.match.params.id)
			.then(res => {
				const post = res.data;
				const ajaxDone = true;

				this.setState({ post, ajaxDone });
			});

		axios
			.get('https://jsonplaceholder.typicode.com/comments?postId=' + this.props.match.params.id)
			.then(res => {
				const comments = res.data;
				const ajaxComments = true;

				this.setState({ comments, ajaxComments });
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
						<h1 {...classes('title')}>{this.state.post.title}</h1>

						<p {...classes('body')}>{this.state.post.body}</p>

						<h2>Comments</h2>
						{!this.state.ajaxComments &&
							<Spinner/>
						}
						{this.state.ajaxComments &&
							<ul {...classes('comments')}>
								{this.state.comments.map(comment =>
									<li {...classes('comment')} key={comment.id}>
										<p><strong>{comment.name}, <a href={"mailto:" + comment.email}>{comment.email}</a></strong></p>
										<p>{comment.body}</p>
									</li>
								)}
							</ul>
						}

					</div>
				}
			</div>
		)
	}
}

export default Post
