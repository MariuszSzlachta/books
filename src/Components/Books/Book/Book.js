import React from 'react';
import classes from './Book.module.scss';

const book = (props) => {
  return (
    <li className={classes.book} id={props.id} onMouseDown={props.onDragHandler}>
      <h2 className={classes.book__title}>{props.title}</h2>
      <p className={classes.book__author}>{props.authors}</p>
    </li>
  );
};

export default book;