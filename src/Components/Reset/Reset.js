import React from 'react';

import classes from './Reset.module.scss';

const reset = props => (
  <button
    className={classes.reset}
    onClick={props.onReset}
    disabled={props.isDisabled}
  >
    {props.children}
  </button>
);

export default reset;