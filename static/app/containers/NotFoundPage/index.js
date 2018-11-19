/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { withRouter } from 'react-router-dom';

/* eslint-disable react/prefer-stateless-function */
export class NotFound extends React.Component {
  render() {
    return <h1>NotFound</h1>;
  }
}

export default withRouter(NotFound);
