import React from "react";
import Modal from "./Modal";

import "./Footer.css";


class Footer extends React.Component {
	state = {
		modalOpen: false
	}

	openModal = (e) => {
		e.preventDefault();
		document.body.style.overflow = "hidden";
		document.querySelector("header").style.visibility = "hidden";		
		this.setState({modalOpen: true});
	}

	closeModal = (e) => {
		e.preventDefault();
		document.body.style.overflow = "visible";

		setTimeout(() => {
			document.querySelector("header").style.visibility = "visible";
		}, 700);		
		this.setState({modalOpen: false});
	}

	renderContent() {
		if (this.props.IDsLength) {
			return (
				<div className="togglediv">
					<a className="btnCategorize" href=""
						onClick={ this.openModal }>
						Categorize
					</a>
					<a className="btnExit" href=""
						onClick={ this.props.removeAllIDs }>
						Exit
					</a>
					<Modal mainUser={this.props.mainUser}
						IDsSelected={this.props.IDsSelected}
						modalOpen={ this.state.modalOpen }
						closeModal={this.closeModal} 
						IDs={this.props.IDs}
					/>					
				</div>
			);
		}
		else {
			return null;
		}
	}

	render() {
		return <div>{this.renderContent()}</div>
	}
}

export default Footer;