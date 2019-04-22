import React from "react";


class ToggleBtn extends React.Component {
	render() {
		let style = {
			off: {
				color: 'rgb(225,225,225)',
				border: '1px solid rgb(225,225,225)'
			},
			on: {
				color: 'rgb(132,146,158)',
				border: '1.2px solid rgb(132,146,158)'				
			}
		};

		let btnState = this.props.IDsSelected.includes(
			this.props.id
		) ? "on":"off";
		
		let currentStyle = style[btnState];
		
		return (
			<a onClick={(e) =>{this.props.toggleID(e);}} 
				className="togglebtn"
				href=""
				id={this.props.id}
				style={currentStyle}>
				{btnState === "on" ? "Added":"Add"}
			</a>
		);
	}
};


export default ToggleBtn;

