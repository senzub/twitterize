import React from "react"

import users from "../apis/users";

import Background from "./Background";
import TweetList from "./TweetList";
import Footer from "./Footer";
import Spinner from "./Spinner";

import BottomScrollListener from 'react-bottom-scroll-listener';
import "./Home.css";

const getInitialData = (userId,cb) => {

	users.get(`/${userId}/userInfo`)
		.then(({data: res}) => {
			cb({userInfo: res});
			return users.get(`/${userId}/favorites`);
		})
		.then(({data: res}) => {
			let endInd = 20;
			cb({
				data: res,
				dataShown: res.slice(0,endInd),
				endInd: endInd
			});
		})		
		.catch((err) => cb({errMsg: err.message}))	
}

const getMoreTweets = (userId,maxId,cb,data) => {

	users.get(`/${userId}/${maxId}/moreFavorites`)
		.then((res) => {
			data = data.concat(res);
			cb({ data });
		})		
		.catch((err) => cb({errMsg: err.message}))		
}

const toggleID = (ID,IDsSelected,cb) => {
	
	let newIDsSelected = IDsSelected.slice();

	if (!IDsSelected.includes(ID)) {
		newIDsSelected.push(ID);
		cb({
			IDsSelected: newIDsSelected
		});

	} else {
		let ind = IDsSelected.indexOf(ID);
		newIDsSelected.splice(ind, 1);
		cb({
			IDsSelected: newIDsSelected	
		});
	}
}

class Home extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			userInfo: '',
			data: null,
			dataShown: null,
			IDsSelected: [],   // IDs added will be in number format, not string
			endInd: 0,
			errMsg: ""
		}
	}

	componentDidMount() {
		let userId = this.props.home.match.params.userId;
		getInitialData(userId, this.setState.bind(this));
	}

	handleScroll = () => {
		let currentEndInd = this.state.endInd;
		let newEndInd = currentEndInd + 30;
		this.setState({
			endInd: newEndInd,
			dataShown: this.state.data.slice(0, newEndInd)
		});

		let dataLength = this.state.data.length;
		let dataShownLength = this.state.dataShown.length;
		if (dataLength > 0 && dataLength === dataShownLength) {
			this.getMoreTweets();
		}
	}

	getMoreTweets = () => {
		let len = this.state.data.length;
		let maxId = this.state.data[len-1].id;
		let userId = this.state.userInfo.userId;
		let data = this.state.data.slice();

		getMoreTweets(userId, maxId, this.setState.bind(this),data);
	}

	toggleID = (e) => {
		e.preventDefault();
		let tweet = e.target;
		let ID = tweet.id;
		let IDsSelected = this.state.IDsSelected;

		toggleID(ID,IDsSelected,this.setState.bind(this));

	}

	removeAllIDs = (e) => {
		e.preventDefault();
		this.setState({IDsSelected:[]});
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
					<TweetList dataShown={this.state.dataShown} 
						toggleID={this.toggleID}
						IDsSelected={this.state.IDsSelected}
					/>
					<Footer mainUser={mainUser}
						IDsSelected={this.state.IDsSelected}
						IDsLength={this.state.IDsSelected.length}
						removeAllIDs={this.removeAllIDs} 
					/>
					<BottomScrollListener 
						onBottom={this.handleScroll} 
						offset={200}
					/>				
				</div>
			)	
		}
		if (this.state.errMsg) return <div className="errMsg">{this.state.errMsg}</div>
		else {
			return <Spinner message="Loading..." />;
		}	
	}

	render() {
		return <div>{this.renderContent()}</div>
	}
}
export default Home;