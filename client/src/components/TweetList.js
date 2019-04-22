import React from "react";

import TweetCard from "./TweetCard";
import Masonry from "react-masonry-css";

import "./TweetList.css";

const TweetsList = props => {
	const tweets = props.dataShown.map((idObj) => {
		return (
			<TweetCard key={idObj.id} 
				idObj={idObj} 
				toggleID={props.toggleID}
				IDsSelected={props.IDsSelected}
			/>
		);
	});
	const breakpointColumnsObj = {
		default: 3,
		650: 2,
		470: 1
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


export default TweetsList;
