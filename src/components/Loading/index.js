import React from 'react';
import ReactLoading from 'react-loading';
import PropTypes from 'prop-types';

const Loading = ({ type, color }) => (
  <ReactLoading type={type} color={color} height="20%" width="20%" className="loading-teamplate" />
);

Loading.propTypes = {
  type: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default Loading;
