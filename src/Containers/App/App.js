import React, { Component } from 'react';
import data from '../../Data/data.json';

import List from '../List/List'
import classes from './App.module.scss';
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      lists: data
    }
    this.onSelectHandler = this.onSelectHandler.bind(this);
  }

  onHoverHandler = (event) => {
    // let sourceEl = event.currentTarget;
    // console.log(sourceEl)
  }

  onSelectHandler(event) {

    // zabiezpieczenie stanu i propagacja itp
    let state = [...this.state.lists];
    event.stopPropagation();
    event.persist()
    // !ELEMENT ŹRÓDŁOWY
    // * Identyfikacja
    let sourceEl = event.currentTarget;
    // source element in state
    let searchedElement = state.filter(element => element.id === sourceEl.id ? element : null);
    // state without searched element
    let filteredState = state.filter(element => element.id !== sourceEl.id ? element : null);
    // suck searched element from array
    let tmp = searchedElement[0]
    // * ---------------
    // ? style
    // sourceEl.style.transform = 'translate3d(event.clientX, event.clientY, 0)';
    sourceEl.style.position = 'absolute';
    sourceEl.style.zIndex = 1000
    // ? ----------------

    // ! function and event for moving
    // usunięcie klasy droppable
    // zmiana stylów
    function moveAt(pageX, pageY) {
      sourceEl.style.left = pageX - 200  + 'px';
      sourceEl.style.top = pageY - 50 + 'px';
    }
    // nakładka do listenera na ruch
    function onMouseMove(event) {
      // ruch
      moveAt(event.pageX, event.pageY);
      // kolizja
      sourceEl.hidden = true;
      // sourceEl.hidden = false;
      let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
      let droppableBelow = elemBelow.closest('#');
      // console.log(droppableBelow);
    }
    // listener na ruch
    document.addEventListener('mousemove', onMouseMove);
    // listener na zwolnienie klawisza
    document.addEventListener('mouseup', stopMove);

    function stopMove(event){
      document.removeEventListener('mousemove', onMouseMove);
      console.log('REMOVCED')
    }

    // !-----------




    // sourceEl.hidden = true;
    // let elBelow = document.elementFromPoint(event.clientX, event.clientY);
    // console.log(elBelow)
    // push searched element to the end of state
    // filteredState.push(tmp)
    // update state
    // this.setState({lists: filteredState})

  }

  render() {
    const lists = this.state.lists.map(list => 
      <List
        key={list.id}
        name={list.name}
        data={list.links}
        id={list.id}
        onSelect={this.onSelectHandler}
        onHover={this.onHoverHandler}
      >
        {list.links}
      </List>
    )
    return (
      <div className={classes.App }>
        {lists}
      </div>
    );
  }
}


export default App;