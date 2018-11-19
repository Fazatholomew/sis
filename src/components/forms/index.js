import React, { Component } from 'react';
import PropTypes from 'prop-types';


class Forms extends Component {
  constructor(props) {
    super(props);
    this.state = {name: '', passenger: 0};
  }
  
  handleChange = (event) => {
	this.setState({[event.target.name]: event.target.value})
  }
  
  handleClick = (event) => {
	const id = Math.floor(Math.random() * 1000);
	console.log(id);
	const data = {id: id, name: this.state.name, passenger: this.state.passenger};
	this.props.submit(data);
	this.setState({name: '', passenger: 0});
  }
  
  render() {
	const state = this.state;
	
    return(
		<div>
			<form>
				<label>
				 Is going:
				 <input
					name="name"
					type="text"
					value={state.name}
					id="name"
					onChange={this.handleChange}
				 />
				</label>
				<br />
				<label>
				 Number of passenger:
				 <input
					name="passenger"
					type="number"
					value={state.passenger}
					id="passenger"
					onChange={this.handleChange}
				 />
				</label>
				<br />
				<input name="submit"id="submit" type="button" onClick={this.handleClick}/>
			</form>
		</div>
	);
  }
}

Forms.propTypes = {
  Submit: PropTypes.func,
};

export default Forms;
