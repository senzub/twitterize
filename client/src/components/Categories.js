import React, { Component } from "react";

import users from "../apis/users";
import categories from "../apis/categories";

import Background from "./Background";
import Spinner from "./Spinner";
import CategoryList from "./CategoryList";
import axios from "axios";
import "./Categories.css";

const getCategoriesData = (cb, userId) => {
	users.get(`/${userId}/userInfo`)
		.then(({data: res}) => {
			let screenName = res.screenName;
			cb({
				userInfo: res
			});
			return categories.get(`/categories/${screenName}`);
		})
		.then(({data: res}) => {
			cb({
				categories: res
			});
		})
		.catch((err) => cb({errMsg: "Could not connect to server"}))
};

const deleteCategory = (cb,category,categoriesData) => {
	categories.delete(`/categories/${category.id}`)
		.then(({data: res}) => {
			let categoryInd = categoriesData.findIndex((category) => category["_id"] === res["_id"]);
			let newCategories = categoriesData.slice(0, categoryInd)
				.concat(categoriesData.slice(categoryInd + 1));

			cb({categories: newCategories});
		})
	    .catch((err) => cb({errMsg: "Could not connect to server"}));	
};


class Categories extends Component {
	constructor(props) {
		super(props);

		this.state = {
			userInfo: '',
			categories: '',
			errMsg: ""
		}
	}

	deleteCategory = (e) => {
		e.preventDefault();
		let category = e.target;
		let categories = this.state.categories;
		deleteCategory(this.setState.bind(this),category,categories);	
	}
	componentDidMount() {
		let userId = this.props.home.match.params.userId;
		getCategoriesData(this.setState.bind(this),userId);
	}
	renderContent() {
		if (this.state.categories) {
			let mainUser = this.state.userInfo;
			return (
				<div>
					<Background 
						mainUser={mainUser}
						link={`/${this.props.home.match.params.userId}/home`}
						btnName="Home"
					/>			
					<div className="textContent">		
						<CategoryList 
							categories={this.state.categories}
							userId={this.props.home.match.params.userId}
							deleteCategory={this.deleteCategory}
						/>
					</div>
				</div>
			);
		}
		if (this.state.errMsg) return <div className="errMsg">{this.state.errMsg}</div>
		else {
			return <Spinner message="Loading..." />;
		}					
	}

	render() {
		return (
			<div>{this.renderContent()}</div>
		);
	}
};


export default Categories;