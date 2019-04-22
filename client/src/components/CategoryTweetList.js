import React from "react";
import CategoryTweetCard from "./CategoryTweetCard";
import Masonry from "react-masonry-css";
import "./CategoryTweetList.css";


const CategoryTweetList = (props) => {
	const tweets = props.dataShown.map((idObj) => {
		return (
			<CategoryTweetCard key={idObj.stringId} 
				idObj={idObj} 
				deleteID={props.deleteID}
			/>
		);
	});	
	const breakpointColumnsObj = {
		default: 3,
		650: 2,
		440: 1
	};
	return (
		<Masonry
 			breakpointCols={breakpointColumnsObj}
  			className="my-masonry-grid"
  			columnClassName="my-masonry-grid_column">			
			{tweets}
		</Masonry>	
	);
};


export default CategoryTweetList;