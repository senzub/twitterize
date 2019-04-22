import React from "react"
import {
	Link
	 } from 'react-router-dom';

import Img from 'react-image';
import Image from './Picture1.png';

import "./Background.css";

class Background extends React.Component {
	render() {
		let mainUser = this.props.mainUser;
		let imgSrc = mainUser.img;
		return (
			<div>
				<header className="siteHeader">
					<div className="profileImgDiv">
						<div className="profileImgContainer">
							<img src={ imgSrc && 
								imgSrc.replace('normal', '400x400') } 
								className="profileImg" 
								alt="User profile"
							/>
							<div className="dropdownContent">
								<Link to="" onClick={this.logout}
								id="logout">Log out</Link>
							</div>
						</div>
					</div>
					<h1 className="title">Twitterize</h1>
					<h3 className="subtitle">Categorize your twitter favorites</h3>
					<Img src={Image}  className="logoImg" alt="Twitter logo"/>
					<div className="primaryNavContainer">
						<nav className="primaryNav">
							<ul>
								<li> <span className="twitterHandle">
								{mainUser.name}</span> 
								<br /><span className="screenName"> @{mainUser.screenName} </span>
								</li>
								<li><span className="titles">Favorites</span> <br /> { mainUser.favoritesCount }</li>
								<li><span className="titles">Following</span> <br /> { mainUser.followingCount }</li>
								<li><span className="titles">Followers</span> <br /> { mainUser.followersCount }</li>
							</ul>
						</nav>
					</div>
					<div className="collectionsbtnContainer">
						<Link to={this.props.link}
						className="collectionsbtn">{this.props.btnName}</Link>	
					</div>
				</header>
			</div>
		);
	}
}

export default Background;