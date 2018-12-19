import React, { Component } from 'react';
import axios from 'axios';
import store from '../../store';
import {connect} from 'react-redux';
import { increaseCounter, changePositions, resetCounter, resetPositions, setData } from '../../actions/actions';
import closestPollyfill from '../../Vendor/closest.pollyfill';

import Books from '../../Components/Books/Books';
import Counter from '../../Components/Counter/Counter';
import Reset from '../../Components/Reset/Reset';
import Spinner from '../../Components/Spinner/Spinner';

import classes from './App.module.scss';


class App extends Component {
  constructor(props){
    super(props);
    this.onDragHandler = this.onDragHandler.bind(this);
    this.fetchDataHandler = this.fetchDataHandler.bind(this);
  }

  fetchDataHandler() {
    axios.get('https://anapioficeandfire.com/api/books/?page=1&pageSize=12')
      .then(res => {
        for (let i in res.data){
          res.data[i].id = i;
        }
        store.dispatch(setData(res.data))
      })
      .catch(err => {
        console.error(err);
      })
  }

  componentDidMount(){
    this.fetchDataHandler();
  }

  onDragHandler(event) {
    // pollyfill for IE;
    closestPollyfill();
    // copy state from redux props
    let state = [...this.props.list];
    // dont't want to propagate events
    event.stopPropagation();
    // unlock regular DOM properities
    event.persist()

    // find element that called event
    let draggedEl = event.currentTarget;
    // find index of dragged element in state
    let indexDraggedEl = state.findIndex(element => element.id === draggedEl.id ? element : null);
    // prepare variable for index of an element on what I want to drop my dragged element
    let indexTargetEl = null;
    // and next variable, for target element itself
    let targetEl = null;
    // and variable to localize target element in state of app
    let targetElInState = null;

    // center pointer X when drag
    let shiftX = event.clientX - draggedEl.getBoundingClientRect().left;
    // function allows to set top and left css properities of dragged element
    function moveAt(pageX, pageY) {
      draggedEl.style.left = pageX - shiftX  + 'px';
      draggedEl.style.top = pageY - 500 + 'px';
    }
    // I gonna call this function when I drag my element
    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
      // I need to set this styles for element I want to drag. In other hand it won't work

      draggedEl.style.position = 'absolute';
      draggedEl.style.zIndex = 1000;
      // draggedEl.style.transform = `translate3d(${event.pageX}, ${event.pageY}, 0)`;
    }

    // This function will be called when user leave the left mouse button
    const drop = (event) => {
      // remove event listener on mouse move
      document.removeEventListener('mousemove', onMouseMove);
      // To find element bellow my dragged element I need to do some hook
      // change visibility of dragged element for a moment of probing
      draggedEl.style.visibility = 'hidden';
      let bellowEl = document.elementFromPoint(event.clientX, event.clientY);
      draggedEl.style.visibility = 'visible';

      // if element bellow doesnt exist I want to stop
      if (!bellowEl) return;
      // that's how I've found element <ul> bellow my element
      targetEl = bellowEl.closest('li');
      // this is hook that prevents from error with null as target elements. And when I drag my dragged element outside the window
      if (!targetEl) {
        targetEl = draggedEl;
      }
      // Find index of target element
      indexTargetEl = state.findIndex(element => element.id === targetEl.id ? element : null);
      // Find target element in state
      [ targetElInState ] = state.filter(element => element.id === targetEl.id ? element : null);

      // before I dispatch action I need to check if my element are proper
      if (indexTargetEl !== null && targetElInState) {
        // I want to have my elements well organized so I need to revert css position of dragged element. Otherwise will be mess
        draggedEl.style.position = 'static';
        draggedEl.style.zIndex = 0;
        draggedEl.style.top = 0;
        draggedEl.style.left = 0;
        // let's dispatch action to change positions of elements in store
        store.dispatch(changePositions(indexDraggedEl, indexTargetEl))
        // and increase counter
        store.dispatch(increaseCounter());
      }
      // When I leave left mouse button I don't need anymore listener
      document.removeEventListener('mouseup', drop);
    }
    // set listeners for mouse move and leave left mouse button
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', drop);
  }

  resetStateHandler() {
    store.dispatch(resetPositions());
    store.dispatch(resetCounter());
  }

  render() {
    return (
      <div className={classes.app }>
        <h1 className={classes.app__title}>List of books in the world of Westeros</h1>
        <Counter />
        <Reset
          onReset={this.resetStateHandler}
          isDisabled={this.props.list ? false : true}
        >
          Reset
        </Reset>
        {this.props.list ? <Books onDragHandler={this.onDragHandler}/> : <Spinner />}
      </div>
    );
  };
};

const mapStateToProps = state => {
  const { list} = state.books;
  return {
    list
  };
};

export default connect(mapStateToProps)(App);