import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { addName } from './actions/peopleAction'; //rename to actions
import { getNames } from './actions/apiActions';

import HelloWorld from './components/hello-world';
import Table from './components/tabs';
import Forms from './components/forms';

class App extends Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount(){
	this.props.getNames();
  }

  render() {
    return(
		<div>
			<HelloWorld title="Marlboro Commuter" />
			<Table data={this.props.names} database={this.props.api}/>
			<Forms submit={this.props.addName}/>
		</div>
	);
  }
}

const mapStatetoProps = (state) => {
	return{
		names: state.names,
		api: state.api, //rename to database or data from server
		
	}
}
	
const mapDispatchtoProps = (dispatch) => {
	return{ //learn to use bindaction creators
	 addName: (data) => {dispatch(addName(data))},
	 getNames: () => {dispatch(getNames())}
	}
}

export default connect(mapStatetoProps, mapDispatchtoProps)(hot(module)(App));


/* 
Friday all API actions, reducers, tab are functioning
Saturday start flask
Sunday start Database
Monday - Tuesday connect Front End (react router)
Wednesday - Friday Front end design
Saturday - Tuesday migrate to Shannon
 */