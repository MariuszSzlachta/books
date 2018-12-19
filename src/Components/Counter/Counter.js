import React from 'react';
import {connect} from 'react-redux';

import classes from './Counter.module.scss';

const counter = (props) => (
  <p className={classes.counter}>Shifted <strong>{props.counter}</strong> times</p>
);

const mapStateToProps = state => {
  const { counter } = state.books;
  return {
    counter
  };
};

export default connect(mapStateToProps)(counter);