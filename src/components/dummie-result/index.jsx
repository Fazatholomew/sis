import React from 'react';
import PropTypes from 'prop-types';

const Dummie = ({ payload }) => (
  <div>{payload}</div>
);

Dummie.propTypes = {
  payload: PropTypes.string,
};

export default Dummie;