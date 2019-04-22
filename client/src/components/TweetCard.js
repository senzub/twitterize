import React from "react";
import { TwitterTweetEmbed } from 'react-twitter-embed';

import ToggleBtn from "./ToggleBtn";

import "./TweetCard.css";

class TweetCard extends React.Component {
	render() {

		let id = this.props.idObj.stringId;
		return (
			<div ref={this.tweetRef}>
				<TwitterTweetEmbed 
					tweetId={id}
				/>
				<ToggleBtn 
					btnType={this.props.btnType}
					toggleID={this.props.toggleID}
					id={id}
					btnStyle={this.props.btnStyle}
					IDsSelected={this.props.IDsSelected}
				/>
			</div>
		);
	}
}

export default TweetCard;