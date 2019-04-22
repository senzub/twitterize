import React from "react";

import categories from "../apis/categories";

import ModalForm from "./ModalForm";
import Spinner from "./Spinner";

import "./Form.css";

const getCategoriesData = (cb, screenName) => {
	categories.get(`/categories/${screenName}`)
		.then(({data: res}) => {
			cb({ categories: res });
		})
	    .catch((err) => cb({errMsg: "Could not connect to server"}))
}

const updateCategory = (cb,data,action,categoryId) => {
	let form = document.getElementById('form');
	let verb = "add" === action ? "added":"deleted";
	categories.put(`/categories/${categoryId}/${action}`, data)
		.then(({data: res}) => {
			form.style.color = "green";
			form.value = `Successfully ${verb}!`;
		})
	    .catch((err) => {
	    	cb({errMsg: "Could not connect to server"});
			form.style.color = "red";
			form.value = "Failed to Connect to Server";
	    })	
}

const createCategory = (cb,data) => {
	categories.post('/categories', data)
		.then(({data: res}) => {
			cb({locked: true});
			let form = document.getElementById('form');
			form.style.color = "green";
			form.value = "Successfully added new category!";

			let list = document.getElementById('displayCategories');
			let category = document.createElement('li');
			category.id = res["_id"];

			category.innerHTML = `
				<label> 
					${ res.name }
				</label>
			`;
			let label = category.childNodes[1];

			label.style.cssText = 
				"display:block; font-size:1.3em;font-family:Lato;cursor:pointer;padding-left:35px;margin-bottom:12px;position:relative;margin-left: 1px;";
			list.appendChild(category);
		})
	    .catch((err) => {
	    	cb({errMsg: "Could not connect to server"});
			let form = document.getElementById('form');
			form.style.color = "red";
			form.value = "Failed to Connect to Server";
	    })
};

let recentlyClicked;
let recentlySubmitted;

class Form extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			categories: "",
			errMsg: "",
			value: "",
			locked: false
		}
	}

	handleCheckChange = (e) => {
		if (recentlyClicked) return;

		let checkbox = e.target;
		let categoryId = checkbox.id;
		// IDs must be sent as string forms
		let stringIDs = this.props.IDsSelected.map((id) => String(id));
		let data = {
			name: checkbox.name,
			IDs: stringIDs,
			author: this.props.mainUser.screenName
		};	

		let action = checkbox.checked ? "add":"delete";
		updateCategory(this.setState.bind(this),data,action,categoryId);

		recentlyClicked = true;
		checkbox.disabled = true;

		setTimeout(() => {
			recentlyClicked = false;
			checkbox.disabled = false;
		}, 1000);
		
	}

	handleFormChange = (e) => {
		this.setState({
			value: e.target.value
		});
	}

	createCategory = (e) => {
		e.preventDefault();
		if (recentlySubmitted) return;
		let stringIDs = this.props.IDsSelected.map((id) => String(id));
		let data = {
			name: this.state.value,
			IDs: stringIDs,
			author: this.props.mainUser.screenName
		};
		recentlySubmitted = true;
		createCategory(this.setState.bind(this),data);
	
	}
	cancelCreateCategory = (e) => {
		e.preventDefault();
		let form = document.getElementById('form');
		form.value = "";
		this.setState({value:""});
	}	
	focusFunct = (e) => {
		recentlySubmitted = false;		
		let form = e.target;
		form.style.color = 'black';
		let msgs = [`Failed to Connect to Server`,
			`Successfully added new category!`,
			`Successfully added!`,
			`Successfully deleted!`
		];
		if (msgs.includes(form.value)) {
			form.value = '';
			this.setState({value: "",locked: false});
		}
	}	
	preventEnter = (e) => {
		e.preventDefault();
	}
	componentDidMount() {
		let screenName = this.props.mainUser.screenName;
		getCategoriesData(this.setState.bind(this), screenName);
	}

	renderContent() {
		if (this.state.categories) {
			return (
				<div>
					<div className="categoriesListContainer">
						<ul className="categoriesList" id="displayCategories">
							{this.state.categories.map((category) => {
								return (
									<li key={category["_id"]}>
									<label className="container"> 
										<input type="checkbox" 
											className="checkbox" 
											name="name"
											id={category["_id"]}
											onChange={this.handleCheckChange}
											checked={this.state.checkedState}
										/>
										<span className="checkmark"></span>
										{ category.name }		
									</label>
								</li>
								);
							})}
						</ul>
					</div>
					<div className="modalFooter">
						<ModalForm 
							value={this.state.value}
							handleFormChange={this.handleFormChange}
							createCategory={this.createCategory}
							cancelCreateCategory={this.cancelCreateCategory}
							focusFunct={this.focusFunct}
							preventEnter={this.preventEnter}
							locked={this.state.locked}
						/>
					</div>					
				</div>
			);
		}
		else if (this.state.errMsg) {
			return (
				<div>{this.state.errMsg}</div>
			);			
		} else return <Spinner message="Fetching Categories..." />;

	}
	render() {
		return (
			<div>{this.renderContent()}</div>
		);
	}
}

export default Form;