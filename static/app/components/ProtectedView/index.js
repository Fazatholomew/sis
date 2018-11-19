/**
 *
 * ProtectedView
 *
 */

import React from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function ProtectedView({ component: Component, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => {
        if (isAuthenticated) {
          if (props.match.path == '/' || props.match.path == '/register') {
            return <Redirect to="/home" />;
          }
          return <Component />;
        }
        if (props.match.path == '/' || props.match.path == '/register') {
          return <Component />;
        }
        return <Redirect to="/register" />;
      }}
    />
  );
}

ProtectedView.propTypes = {};

export default ProtectedView;
