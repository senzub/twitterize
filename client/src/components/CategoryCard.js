import React from "react";

import { Link } from 'react-router-dom';

import Img from 'react-image';
import Image1 from './Picture2.png';


class CategoryCard extends React.Component {

	render() {
		let userId = this.props.userId;
		let categoryId = this.props.category["_id"];
		let categoryName = this.props.category.name;
		return (
			<div
			className="categoryText">
				<div className="categoryHeader">
					<h3 className="categoryHeading">{ categoryName }</h3>
					<span className="closeCategoryBtn" id={categoryId}
					onClick={this.props.deleteCategory}>X</span>
				</div>
				<Link 
					to={`/${userId}/categories/${categoryName}/${categoryId}`}
				className="categoryLink">
					<div className="categoryContainer">
						<Img src={Image1} className="logoImg2" />
					</div>
				</Link>
				<div className="categoryFooter">
					<div className="categoryFooterText">
						<span className="footerTitle">Favorites: </span> {this.props.category.IDs.length} <br />
						<span className="footerTitle">Author: </span> {this.props.category.author}
					</div>
				</div>
			</div>
		);
	}
}

export default CategoryCard;