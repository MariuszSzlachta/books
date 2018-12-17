import React from 'react';

import List from './List/List';
import classes from './Lists.module.scss';

const Lists = props => {
  console.log(props);
  let items = null;
  if (props.lists !== null ){
      items = props.lists.map((list, i) => 
      <List
        key={i}
        name={list.name}
        data={list.links}
        id={list.id}
        onDragHandler={props.onDragHandler}
      >
        {list.links}
      </List>
    )
  }
  return (
    <div className={classes.lists}>
      { items }
    </div>
  );
};


export default Lists;