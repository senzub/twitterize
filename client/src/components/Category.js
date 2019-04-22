import React, { Component } from "react";

import users from "../apis/users";
import categories from "../apis/categories";

import CategoryTweetList from "./CategoryTweetList";
import Spinner from "./Spinner";
import Background from "./Background";
import BottomScrollListener from 'react-bottom-scroll-listener';

import "./Category.css";

const getCategoryTweets = (cb,userId,categoryId) => {
	users.get(`/${userId}/userInfo`)
		.then(({data: res}) => {
			cb({userInfo: res});
			return categories.get(`/categories/category/${categoryId}`);
		})
		.then(({data: res}) => {
			let endInd = 30;
			let modIDs = res.IDs.slice().map((id) => {
				return {
					id: Number(id),
					stringId: id
				};
			});
			cb({
				endInd: endInd,
				data: modIDs,
				dataShown: modIDs.slice(0,endInd)
			});
		})
		.catch((err) => cb({errMsg: "Failed to connect to server"}));		
};

const deleteID = (cb,categoryId,tweet,data) => {
	categories.put(`/categories/category/${categoryId}/delete`, data)
		.then(({data: res}) => {
			let data = this.state.data;
			let dataInd = data.findIndex((idObj) => idObj["stringId"] === tweet.id);
			let newData = data.slice(0, dataInd)
				.concat(data.slice(dataInd + 1));
			cb({data: newData});
		})
	    .catch((err) => cb({errMsg:"Could not connect to server"}))	
};

class Category extends Component {
	state = {
		userInfo: "",
		data: null,
		dataShown: "",
		errMsg: "",
		endInd: 0
	};
	handleScroll = (e) => {
		let currentEndInd = this.state.endInd;
		let newEndInd = currentEndInd + 30;
		this.setState({
			endInd: newEndInd,
			dataShown: this.state.data.slice(0, newEndInd)
		});		
	}
	deleteID = (e) => {
		e.preventDefault();
		let categoryId = this.props.category.match.params.id;
		let tweet = e.target;

		let data = {
			name: this.props.category.match.params.category,
			IDs: [tweet.id],
			author: this.state.userInfo.screenName
		};
		deleteID(this.setState.bind(this),categoryId,tweet,data);	
	}
	componentDidMount() {
		let userId = this.props.home.match.params.userId;
		let categoryId = this.props.category.match.params.id;
		getCategoryTweets(this.setState.bind(this),userId,categoryId);
	}
	renderContent() {
		if (this.state.data) {
			let mainUser = this.state.userInfo;
			return (
				<div>
					<Background 
						mainUser={mainUser}
						link={`/${this.props.home.match.params.userId}/categories`}
						btnName="Categories"
					/>	
					<CategoryTweetList 
						dataShown={this.state.dataShown}
						deleteID={this.deleteID}
					/>
					<BottomScrollListener 
						onBottom={this.handleScroll} 
						offset={200}
					/>								
				</div>
			);
		}
		if (this.state.errMsg) return <div className="errMsg">{this.state.errMsg}</div>
		else {
			return <Spinner message="Loading..." />;
		}		
	}
	render() {
		return <div>{this.renderContent()}</div>
	}
};


export default Category;
