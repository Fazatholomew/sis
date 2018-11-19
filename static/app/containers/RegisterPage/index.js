/**
 *
 * RegisterPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import * as actionCreators from 'containers/App/actions/auth';

const styles = theme => ({
  container: {
    margin: 20,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  content: {
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 5,
    paddingBottom: 25,
  },
});

/* eslint-disable react/prefer-stateless-function */
export class RegisterPage extends React.Component {
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleClick = () => {
    const { name, email, password } = this.state;
    this.props.registerUser(name, email, password);
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <h1> Let's Help Marlboro Community! </h1>
        <Paper elevation={10} square={false}>
          <div className={classes.content}>
            <Grid container justify="center" direction="column">
              <TextField
                name="name"
                label="Name"
                fullwidth="true"
                onChange={this.handleChange}
                margin="normal"
              />
              <TextField
                name="email"
                label="Nook Username"
                fullwidth="true"
                onChange={this.handleChange}
                margin="normal"
              />
              <TextField
                name="password"
                label="Password"
                fullwidth="true"
                type="password"
                autoComplete="current-password"
                margin="normal"
                onChange={this.handleChange}
              />
              <br />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={this.handleClick}
              >
                Register
              </Button>
            </Grid>
          </div>
        </Paper>
      </div>
    );
  }
}

RegisterPage.propTypes = {};

const mapStateToProps = state => ({
  auth: state.auth,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default withStyles(styles)(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps,
    )(RegisterPage),
  ),
);
