import React from "react";

import { TwitterTweetEmbed } from 'react-twitter-embed';

import DeleteBtn from "./DeleteBtn";


class CategoryTweetCard extends React.Component {
	state = {
		deleted: false
	};
	checkDeleted = (e) => {
		this.setState({deleted: !this.state.deleted});
	}
	renderContent() {
		if (!this.state.deleted) {
			let id = this.props.idObj.stringId;
			return (
				<div>
					<TwitterTweetEmbed 
						tweetId={id}
					/>
					<DeleteBtn 
						btnType={this.props.btnType}
						deleteID={this.props.deleteID}
						checkDeleted={this.checkDeleted}
						id={id}
						btnStyle={this.props.btnStyle}
						IDsSelected={this.props.IDsSelected}
					/>
				</div>
			);
		} else return null;
	}
	render() {
		return <div>{this.renderContent()}</div>
	}
}

export default CategoryTweetCard;