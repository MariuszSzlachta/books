import React from 'react';
import classes from './List.module.scss';

const list = (props) => {

  const listItems = props.data.map(listItem =>
    <li
      key={listItem.id}
      className={classes.list__item}
    >
      {listItem.name}
    </li>
  )
  let classList = [classes.list, classes.droppable];
    return (
      <ul className={classList.join(' ')} id={props.id} onMouseDown={props.onDragHandler}>
        <p className={classes.list__title}>{props.name}</p>
        {listItems}
      </ul>
    );
}

export default list;