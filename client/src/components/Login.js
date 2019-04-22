import React from "react";

import 'normalize.css';
import "./Login.css";

import Img from "react-image";
import Image from './Picture1.png';

import loginURL from "../apis/loginURL";

class Login extends React.Component {
	render() {
		return (
		  	<div className="body">
		  		<div id="center">
			  		<div id="container">
						<h1 className="twittertitle">Twitterize</h1>
						<h3 className="twittersubtitle">Categorize your twitter favorites</h3>
						<Img src={Image}  className="logoimg" />
						<a className="login" 
						href={loginURL}>Log in with Twitter</a>
					</div>
				</div>
		  	</div>
		)	
	}
};


export default Login;