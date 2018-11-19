/**
 *
 * LogginView
 
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  container: {
    paddingBottom: 25,
    paddingRight: 15,
    paddingLeft: 15,
  },
  fields: {
    marginTop: 20,
    marginBottom: 20,
  },
});

/* eslint-disable react/prefer-stateless-function */
class LogginView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {dialogData: {buttons: this.logginMode, data: this.logginFields,disable: false}, Username: null, Password: null};
    }

  handleClose = () => {
    const newDialogData = {...this.state.dialogData}
    if(this.props.mode){
      newDialogData.disable = true;
      newDialogData.buttons = this.viewMode;
    }
    this.setState({dialogData: newDialogData})
    this.props.handleClose()
	
  };

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  };

  edit = () => {
    const newDialogData = {...this.state.dialogData}
    newDialogData.disable = false;
    newDialogData.buttons = this.viewModeEdit
    this.setState({dialogData: newDialogData})
  };

  loggin = () => {
    if(this.state.Username && this.state.Password){
      this.props.login(this.state.Username, this.state.Password);
      this.handleClose();
    }
  };

  submit = () => {};

  Delete = () => {};

  loggout = () => {
    this.handleClose();
    this.props.logout();
  };

  logginFields = { Username: '', Password: '' };

  viewMode = [
    { color: 'primary', click: this.edit, label: 'Edit' },
    { color: 'primary', click: this.loggout, label: 'Logout' },
  ];

  viewModeEdit = [
    { color: 'primary', click: this.submit, label: 'Submit', fullWidth: false },
    {
      color: 'secondary',
      click: this.delete,
      label: 'Delete',
      fullWidth: false,
    },
  ];

  logginMode = [{ color: 'primary', click: this.loggin, label: 'Login' }];

  componentDidMount(){
    let dialogData = {};
    if (this.props.mode){
      dialogData = {
        buttonData: this.viewMode,
        data: this.props.profile,
        disable: true,
      }
    } else {
      dialogData = {
        buttonData: this.logginMode,
        data: this.logginFields,
        disable: false,
      };
    }
    this.setState({dialogData});
  }

  componentDidUpdate(prevProps) {
    if (this.props.mode !== prevProps.mode || this.props.profile !== prevProps.profile) {
      
      let dialogData = {};
      if (this.props.mode) {
        dialogData = {
          buttonData: this.viewMode,
          data: this.props.profile,
          disable: true,
        };
      } else {
        dialogData = {
          buttonData: this.logginMode,
          data: this.logginFields,
          disable: false,
        };
      }
      this.setState({ dialogData });
      console.log(this.state.dialogData);
      
    }
  }

  render() {
    const {open, mode, classes} = this.props;
    const {disable, buttonData, data} = this.state.dialogData;
    const types = {Passenger: 'number', Time: 'time', Password: 'password'}; 
    const renderButtons = buttonData ? buttonData.map((button, i) => (<Button key={i} color={button.color ? button.color : 'primary'} onClick={button.click ? button.click : this.edit} fullWidth={button.fullWidth}>{button.label ? button.label : 'Button' }</Button>)) : null;

    const dataKeys = Object.keys(data)
    const fields = dataKeys.map((dataKey, i) => (<TextField name={dataKey} onChange={this.handleChange} className={classes.fields} key={i} label={dataKey} disabled={disable} defaultValue={data[dataKey] || null}  fullWidth type={types[dataKey] || 'text'} /> ));

    return (
      <div>
        <Dialog open={open} onClose={this.handleClose} fullWidth scroll="paper">
          <Grid container direction="column" className={classes.container}>
            {fields}

            <DialogActions>{renderButtons || null}</DialogActions>
          </Grid>
        </Dialog>
      </div>
    )
  }
}

LogginView.propTypes = {};

export default withStyles(styles)(LogginView);

// <Grid container direction='row' justify='center'>{renderButtons ? renderButtons : null}</Grid>
