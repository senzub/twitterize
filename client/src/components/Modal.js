import React from "react";
import Form from "./Form.js";

import "./Modal.css";

class Modal extends React.Component {
	render() {

		if (this.props.modalOpen) {
			return (
				<div className="modal">
					<div id="modalCenter">
						<div className="modalText">
							<div className="modalHeader">
								<h3 className="modalHeading">Current Categories</h3>
								<span className="close" onClick={this.props.closeModal}>X</span>
							</div>
							<Form 
								mainUser={this.props.mainUser}
								IDsSelected={this.props.IDsSelected}
							/>
						</div>
					</div>
				</div>
			);
		}
		else {
			return null;
		}

	}
}

export default Modal;