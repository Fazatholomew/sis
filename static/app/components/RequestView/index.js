/**
 *
 * RequestView
 *
 */

import React from "react";
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { DateTimePicker , MuiPickersUtilsProvider } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';

const styles = theme => ({
  container: {
    paddingBottom: 25,
    paddingRight: 15,
    paddingLeft: 15,
  },
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    padding: theme.spacing.unit / 2,
  },
  fields: {
    marginTop: 20,
    marginBottom: 20,
  },
  chip: {
    margin: theme.spacing.unit / 2,
  }
});

/* eslint-disable react/prefer-stateless-function */
class RequestView extends React.Component {
  	state = {
	  time: null, 
	  disable: true, 
	  mode: true, 
	  data: this.props.data,
	}

  	submit = () => {
		let {from, to} = this.state;
		if(from && to){
			from = upperCaser(from)
			to = upperCaser(to)
			const rawTime = this.state.time;
			const time = rawTime.toUTCString();
			let data = {from, to,time}
			if(!this.props.create){
				this.props.delete(this.props.entry_id)
			}
			this.props.handleSubmit(data)
			this.setState({time: new Date(Date.now())});
			this.props.handleClose();
		}
	}
	
	edit = () => {
		const {asal, tujuan} = this.props.data
		const unix_time = Date.parse(this.props.data.time);
		const time = new Date(unix_time);
		this.setState({mode: false, disable: false, from: asal, to: tujuan,time: time})
	}

	delete = () => {
		this.props.delete(this.props.entry_id)
		this.handleClose()
	}

	create = () => {
		this.props.handleCreate(this.props.data, this.props.entry_id)
		this.handleClose()
	}

	handleClose = () => {
		if(!this.props.create){
			this.setState({disable: true, mode: true})
		}
		this.props.handleClose()
	}
  
  	changeHandler = prop => event => {
    	this.setState({ [prop]: event.target.value });
	};
  
 	timeChange = date => {
		this.setState({ time: date })
	}

	renderButton = () => {
		if(this.props.create){
			return(
				<Button color='primary' onClick={this.submit}>Submit</Button>
			)
		}

		if(this.props.mode){
			if(this.state.mode){
				return(
					<Button color='primary' onClick={this.edit}>Edit</Button>
				)
			}else{
				return(
					[<Button color='primary' key={0} onClick={this.submit}>Submit</Button>,
					 <Button color='secondary' key={1} onClick={this.delete}>Delete</Button>]
				)
			}
		}else{
			return(
				<Button color='primary' onClick={this.create}>Create Offer</Button>
			)
		}
	}

	renderDatetime = () => {
		if(this.props.create || this.state.mode === false){
			return(
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<DateTimePicker
					className="picker"
					value={this.state.time}
					label="Date & Time"
					onChange={this.timeChange}
					disablePast
					showTodayButton
					allowKeyboardControl = {false}
					/>
				</MuiPickersUtilsProvider>
			)
		}else{
			const unix_time = Date.parse(this.props.data.time);
			const convertedTime = new Date(unix_time);
			const time = `${convertedTime.toLocaleDateString()} ${convertedTime.toLocaleTimeString()}`
			return(
				<TextField className={this.props.classes.fields} disabled label='Date & Time' defaultValue= {time} type='text'/>
			)
		}
	}

	renderTitle = () => {
		if(this.props.create){
			return ('Post a request')
		}
		if(this.props.users[this.props.data.user_id]){
			return(`${this.props.users[this.props.data.user_id].name} (${this.props.users[this.props.data.user_id].email})`)
		}
	}

	
	componentDidUpdate(prevProps){
		if(prevProps !== this.props){
			if(this.props.create){
				this.setState({data: {}, disable: false});
			}
			else if(!this.props.create || !this.props.mode){
				this.setState({disable: true, data: this.props.data});
			}	
		}
	}
  
  	render() {
		const { open, classes } = this.props;
		const { disable, data } = this.state;
		const renderButton = this.renderButton();
		const renderDatetime = this.renderDatetime();
		const renderTitle = this.renderTitle()
    	return (
			<div>
				<Dialog open={open} onClose={this.handleClose} fullWidth scroll="paper">
					<DialogTitle>{renderTitle}</DialogTitle>
					<DialogContent>
						<Grid container direction="column" className={classes.container}>
							<TextField className={classes.fields} disabled={disable} onChange={this.changeHandler('from')} label='From' type='text' defaultValue={data.asal}/>
							<TextField className={classes.fields} disabled={disable} onChange={this.changeHandler('to')} label='To' type='text' defaultValue={data.tujuan}/>
							{renderDatetime}
							<DialogActions>
								{renderButton}
							</DialogActions>
						</Grid>
					</DialogContent>
				</Dialog>
			</div>
		)
	}
}

RequestView.propTypes = {};

export default withStyles(styles)(RequestView);

//Helper Functions

const upperCaser = (strings) => {
	let buffer = strings.split(" ");
	let finalStrings = []
	if (buffer.length > 1){
		finalStrings = buffer.map(string => {
			return string.charAt(0).toUpperCase() + string.slice(1);
		})
		return finalStrings.join(" ")
	}else{
		return strings.charAt(0).toUpperCase() + strings.slice(1);
	}
}