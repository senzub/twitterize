import React from "react";

import CategoryCard from "./CategoryCard";



class CategoryList extends React.Component {
	render() {
		const categories = this.props.categories.map((category) => {
				return (
					<CategoryCard 
						key={category["_id"]}
						category={category}
						userId={this.props.userId}
						deleteCategory={this.props.deleteCategory}
					/>
				);
			})		
		return (
			<div>				
				{categories}
			</div>
		);
	}
}

export default CategoryList;