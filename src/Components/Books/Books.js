import React from 'react';
import {connect} from 'react-redux';

import Book from './Book/Book';
import classes from './Books.module.scss';

const books = props => {
  let booksList = null;
  if (props.list){
    booksList = props.list.map((book, i) => (
      <Book
        key={book.isbn.split('-').join('')}
        id={book.id}
        title={book.name}
        authors={book.authors[0]}
        pages={book.numberOfPages}
        onDragHandler={props.onDragHandler}
      />
    ));
  };

  return (
    <ul className={classes.books}>
      { booksList }
    </ul>
  );
};

const mapStateToProps = state => {
  const { list } = state.books;
  return {
    list
  };
};

export default connect(mapStateToProps)(books);