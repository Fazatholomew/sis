/**
 *
 * Header
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import LogginView from 'components/LogginView';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { navigateto } from 'containers/App/actions/router';
import { logout, loginUserRequest, checkToken } from 'containers/App/actions/auth';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  header:{
    background: 'linear-gradient(0deg, rgba(230,81,0,1) 0%, rgba(244,67,54,1) 100%)'
  }
};


/* eslint-disable react/prefer-stateless-function */
export class Header extends React.Component {
  state = { open: false };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleClick = () => {
    this.props.checkToken();
    this.setState({ open: !this.props.open });
  };

  handleLogout = () => {
    this.props.logout();
    this.props.navigateto('/register');
  };

  render() {
    const { classes, auth, userProfile } = this.props;
    const { open } = this.state;
    const profile = {Name: userProfile.name, Email: userProfile.email, Password: ""}
    console.log(profile);
    
    return (
      <div className={classes.root}>
        <AppBar position="sticky" className={classes.header}>
          <Toolbar>
              <img src={require("../../images/logo.svg")}/>
            <Typography variant="h6" color="inherit" className={classes.grow}>
                 
            </Typography>
            {this.props.auth ? (
              <Button color="inherit" onClick={this.handleClick}>
                Profile
              </Button>
            ) : (
              <Button color="inherit" onClick={this.handleClick}>
                Login
              </Button>
            )}
          </Toolbar>
        </AppBar>
        <LogginView
          open={open}
          mode={auth}
          logout={this.handleLogout}
          login={this.props.loginUserRequest}
          handleClose={this.handleClose}
          profile={profile}
        />
      </div>
    );
  }
}

Header.propTypes = {
  navigateto: PropTypes.func.isRequired,
  classes: PropTypes.object,
};

const mapStateToProps = state => ({
  auth: state.auth.isAuthenticated,
  userProfile: state.auth.userProfile
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ navigateto, logout, loginUserRequest, checkToken}, dispatch);
}

export default withStyles(styles)(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps,
    )(Header),
  ),
);
