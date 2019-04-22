import React from "react";

import "./DeleteBtn.css";

class DeleteBtn extends React.Component {
	render() {
		return (
			<a onClick={(e) =>{this.props.deleteID(e);this.props.checkDeleted(e);}} 
				className="togglebtn deleteBtn"
				href=""
				id={this.props.id}>
				Delete
			</a>
		);
	}
};


export default DeleteBtn;

