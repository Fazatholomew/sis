/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from 'containers/App/actions/auth';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';


import Header from 'containers/Header';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import MainPage from 'containers/MainPage';
import RegisterPage from 'containers/RegisterPage';
import LoggedIn from 'components/ProtectedView';

/* eslint-disable react/prefer-stateless-function */
export class App extends React.Component {
  componentDidMount() {
    this.checkAuth();
  }

  checkAuth(props = this.props) {
    if (!props.isAuthenticated) {
      const token = localStorage.getItem('token');
      if (!token) {
      } else {
        this.props.checkToken()
      }
    }
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <MuiThemeProvider
        theme={createMuiTheme({
          typography: {
            useNextVariants: true,
          }
        })}
      >
        <Header/>
        <Grid container direction="row">
          <Grid item md xs />
          <Grid item xs={10} md={4}>
            <Grid container justify="center">
              <Switch>
                <LoggedIn
                  isAuthenticated={isAuthenticated}
                  exact
                  path="/"
                  component={RegisterPage}
                />
                <LoggedIn
                  isAuthenticated={isAuthenticated}
                  path="/home"
                  component={MainPage}
                />
                <LoggedIn
                  isAuthenticated={isAuthenticated}
                  path="/register"
                  component={RegisterPage}
                />
                <Route component={NotFoundPage} />
              </Switch>
            </Grid>
          </Grid>
          <Grid item md xs />
        </Grid>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(App),
);
