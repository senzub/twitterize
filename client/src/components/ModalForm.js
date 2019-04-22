import React from "react";


class ModalForm extends React.Component {
	render() {
		let modalBtnSaveStyle = {
			border: "1px solid rgb(210,210,210)",
			fontWeight: "550",
			backgroundColor: "#fff",
			color: "rgb(100,100,100)"
		};
		return (
			<form onSubmit={ this.props.preventEnter }>
				<input type="text" 
					value={this.props.value} 
					onChange={this.props.handleFormChange}
					placeholder="Add a Category"
					id="form"
					onFocus={this.props.focusFunct}
				/>
				<div className="modalBtnContainer">
					<a className="modalBtnSave" href=""
						style={this.props.locked? modalBtnSaveStyle : null}
						onClick={ this.props.createCategory }>Save</a>
					<a className="modalBtnCancel" href=""
						onClick={ this.props.cancelCreateCategory }>Cancel</a>
				</div>
			</form>
		);
	}
};


export default ModalForm;