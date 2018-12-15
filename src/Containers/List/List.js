import React, { Component } from 'react';
import classes from './List.module.scss';

class List extends Component {
  
  render() {
    console.log(this.props);
    const listItems = this.props.data.map(listItem =>
      <li
        key={listItem.id}
        className={classes.list__item}
      >
        {listItem.name}
      </li>
    )
    let classList = [classes.list, classes.droppable];
    return (
      <ul className={classList.join(' ')} id={this.props.id} onMouseDown={this.props.onSelect} onMouseEnter={this.props.onHover}>
        <p className={classes.list__title}>{this.props.name}</p>
        {listItems}
      </ul>
    );
  }
}

export default List;