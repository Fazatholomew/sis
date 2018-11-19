/**
 *
 * DialogView
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
import DialogTitle from '@material-ui/core/DialogTitle';

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
class DialogView extends React.Component {
  handleClose = () => {
    if (this.props.mode) {
      this.setState({ buttonData: this.viewMode });
    }

    this.props.handleClose();
  };

  edit = () => {
    this.setState({ disable: false, buttonData: this.viewModeEdit });
  };

  join = () => {};

  submit = () => {};

  delete = () => {};

  viewMode = [{ color: 'primary', click: this.edit, label: 'Edit' }];

  viewModeEdit = [
    { color: 'primary', click: this.submit, label: 'Submit', fullWidth: false },
    {
      color: 'secondary',
      click: this.delete,
      label: 'Delete',
      fullWidth: false,
    },
  ];

  joinMode = [
    { color: 'primary', click: this.join, label: 'Join', fullWidth: true },
  ];

  state = {
    disable: true,
    buttonData: this.props.mode ? this.viewMode : this.joinMode,
  };

  render() {
    const { data, open, classes } = this.props;
    const { disable, buttonData } = this.state;

    const renderButtons = buttonData
      ? buttonData.map((button, i) => (
        <Button
          key={i}
          color={button.color ? button.color : 'primary'}
          onClick={button.click}
        >
          {button.label}
        </Button>
      ))
      : null;
	  
    return (
      <div>
        <Dialog open={open} onClose={this.handleClose} fullWidth scroll="paper">
          <Grid container direction="column" className={classes.container}>
            <TextField className={classes.fields} label='From' disabled={disable} defaultValue={data.asal} fullWidth type='text'/>
            <TextField className={classes.fields} label='To' disabled={disable} defaultValue={data.tujuan} fullWidth type='text'/>
            <TextField className={classes.fields} label='Fee' disabled={disable} defaultValue={data.fee} fullWidth type='number'/>
            <TextField className={classes.fields} label='Number of Passengers' disabled={disable} defaultValue={data.passenger} fullWidth type='number'/>
            <TextField className={classes.fields} label='Date & Time' disabled={disable} defaultValue={data.from} fullWidth type='text'/>
            <DialogActions>{renderButtons || null}</DialogActions>
          </Grid>
        </Dialog>
      </div>
    );
  }
}

DialogView.propTypes = {};

export default withStyles(styles)(DialogView);

