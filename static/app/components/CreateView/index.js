/**
 *
 * CreateView
 *
 */

import React from "react";
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import ProfileView from 'components/ProfileView';

import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import { DateTimePicker , MuiPickersUtilsProvider } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

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
class CreateView extends React.Component {
  	state = {
	  passenger: null, 
	  fee: null, 
	  time: null, 
	  disable: true, 
	  mode: true, 
	  data: {},
	  anchorEl: null,
	  currentProfile: {}
	}

  	submit = () => {
		let {from, to, fee, passenger} = this.state;
		if(this.state.data.asal && !from){
			from = this.state.data.asal;
			to = this.state.data.tujuan;
		}
		if(from && to){
			from = upperCaser(from)
			to = upperCaser(to)
			passenger = passenger || 1;
			const rawTime = this.state.time || new Date(Date.now());
			const time = rawTime.toUTCString();
			let passengers = []
			if(!this.props.create){
				passengers = this.props.data.passengers
				this.props.delete(this.props.entry_id)
			}
			let data = {from, to, fee, passenger, time, passengers}
			this.props.handleSubmit(data);
			this.resetState();
			this.props.handleClose();
		}
	}
	
	edit = () => {
		const {asal, tujuan, fee, passenger} = this.props.data
		const unix_time = Date.parse(this.props.data.time);
		const time = new Date(unix_time);
		this.setState({mode: false, disable: false, from: asal, to: tujuan, fee: fee, passenger: passenger, time: time})
	}

	resetState = () => {
		this.setState({passenger: 1, fee: 0, time: new Date(Date.now()), from: "", to: "", asal: '', tujuan: '', data: {}})
	}

	delete = () => {
		this.props.delete(this.props.entry_id)
		this.handleClose()
	}

	join = () => {
		this.props.join(this.props.entry_id)
		this.handleClose()
	}

	handleClose = () => {
		if(!this.props.create){
			this.setState({disable: true, mode: true})
		}
		this.resetState();
		this.props.handleClose()
	}
  
  	changeHandler = prop => event => {
    	this.setState({ [prop]: event.target.value });
	};

  	handleProfile = (event, data) => {
		this.setState({
		  currentProfile: data,
		  anchorEl: event.currentTarget,
		});
	}

	handleCloseProfile = () => {
		this.setState({
		  anchorEl: null,
		});
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
				<Button color='primary' onClick={this.join}>Join</Button>
			)
		}
	}

	renderPassenger = () => {
		if(!this.props.create && this.props.data.passengers){
			return( 
				this.props.data.passengers.map((id, i) =>{ 
					const data = this.props.users[id];
					const names = data.name.split(" ");
					let initials = names[0].charAt(0).toUpperCase()
					if(names.length > 1){initials += names[1].charAt(0).toUpperCase()}
					return(<Chip 
						key={i} 
						className={this.props.classes.chip} 
						avatar={<Avatar>{initials}</Avatar>} 
						label={names[0]}
						aria-owns={open ? 'simple-popper' : undefined}
						aria-haspopup="true"
						clickable
						onClick={(e) => this.handleProfile(e, data)}
						/>)
					}
				)
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
			return ('Post an offer')
		}
		if(this.props.users[this.props.data.user_id]){
			return(`${this.props.users[this.props.data.user_id].name} 
			(${this.props.users[this.props.data.user_id].email})`)
		}
	}

	
	componentDidUpdate(prevProps){
		if(prevProps !== this.props){
			if(this.props.create){
				if(this.props.fromRequest){
					this.setState({disable: false, time: new Date(this.props.data.time), fee: this.props.data.fee || 0, passenger: this.props.passenger || 1});
				}else{
					this.resetState();
					this.setState({disable: false})
				}
			}
			else if(!this.props.create || !this.props.mode){
				this.setState({disable: true, data: this.props.data});
			}	
		}
	}
  
  	render() {
		const { open, classes } = this.props;
		const { disable, data, passenger, fee, anchorEl, currentProfile } = this.state;
		const renderButton = this.renderButton();
		const renderPassenger = this.renderPassenger();
		const renderDatetime = this.renderDatetime();
		const openProfile = Boolean(anchorEl)
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
							<TextField className={classes.fields} disabled={disable} label='Number of Passengers' onChange={this.changeHandler('passenger')} fullWidth type='number' defaultValue={data.passenger || passenger}/>
							<Grid item className={classes.root}>{renderPassenger}</Grid>
							<FormControl fullWidth className={classes.fields} disabled={disable}>
								<InputLabel htmlFor="adornment-amount">Fee <sup><i>(optional)</i></sup></InputLabel>
								<Input
									id="adornment-amount"
									onChange={this.changeHandler('fee')}
									startAdornment={<InputAdornment position="start">$</InputAdornment>}
									defaultValue={data.fee || fee}
								/>
							</FormControl>
							<DialogActions>
								{renderButton}
							</DialogActions>
						</Grid>
					</DialogContent>
					<ProfileView open={openProfile} 
						anchorEl={anchorEl} 
						handleClose={this.handleCloseProfile}
						data={currentProfile} 
						/>
				</Dialog>
			</div>
		)
	}
}

CreateView.propTypes = {};

export default withStyles(styles)(CreateView);


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