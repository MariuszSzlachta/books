import React, { Component } from 'react';
import store from '../../store';
import { getData, increaseCounter, changePositions, resetCounter } from '../../actions/actions';
import {connect} from 'react-redux';

import Lists from '../../Components/Lists/ListsContainer';
import classes from './App.module.scss';
class App extends Component {
  constructor(props){
    super(props);
    this.onDragHandler = this.onDragHandler.bind(this);
  }
  componentDidMount(){
    store.dispatch(getData());
  }

  onDragHandler(event) {
    // kopiuję sobie stan z propsów przekazych przez reduxa
    let state = [...this.props.lists];
    // nie chcę propagowania
    event.stopPropagation();
    // odblokowany dostęp do DOM zwykłego
    event.persist()

    // odnajduję element, który wywołał zdarzenie
    let draggedEl = event.currentTarget;
    // odnajduję indeks tego elementu w stanie aplikacji
    let indexDraggedEl = state.findIndex(element => element.id === draggedEl.id ? element : null);
    // odnajduję element w stanie aplikacji
    let draggedElInState = state.filter(element => element.id === draggedEl.id ? element : null);
    // wyciągam go z arraya
    draggedElInState = draggedElInState[0];
    // deklaruję zmienną opisująca indeks elementu w stanie aplikacji na który upuszczę przenoszony element
    let indexTargetEl = null;
    // oraz zmienną w której go umieszczę
    let targetEl = null;
    // oraz zmienną w której umieszczę element ze stanu
    let targetElInState = null;
    // * ----------------

    // funkcja będzie ustawiać left i right przeoszonego elementu względem pozycji myszki
    function moveAt(pageX, pageY) {
      draggedEl.style.left = pageX - 200  + 'px';
      draggedEl.style.top = pageY - 50 + 'px';
    }
    // funkcję wywoływać będę podczas poruszania myszką z wciśnietym lewym przyciskiem
    function onMouseMove(event) {
      // wywołuję funkcję zadeklarowaną powyżej
      moveAt(event.pageX, event.pageY);
      // by top i left działały musze ustawić elementowi odpowiednie style
      draggedEl.style.position = 'absolute';
      draggedEl.style.zIndex = 1000;
    }

    // funkcję będę wywoływać na zwolnienie lewego klawisza myszy
    const stopMove = (event) => {
      // usuwam listener od poruszania kursorem
      document.removeEventListener('mousemove', onMouseMove);
      // żeby znaleźć element nad którym trzymam element przenoszony musze zrobić taki myk
      // elementowi przenoszonemu zmnieniam na czas próbkowania visibility na hidden
      // potem próbkuję i spowrótem zmieniam na visible, bo przecież chcę widzieć mój przenoszony element
      draggedEl.style.visibility = 'hidden';
      let bellowEl = document.elementFromPoint(event.clientX, event.clientY);
      draggedEl.style.visibility = 'visible';

      // jakbym upuścił element przenoszony na niczym to powstrzymuję
      if (!bellowEl) return;
      // odnajduję element na który upuszczę przenoszony, musi być to element ul
      targetEl = bellowEl.closest('ul');
      // jakby element nie istniał to chcę by nie przenosiło elementu
      if (!targetEl) {
        targetEl = draggedEl; 
      }
      // znajduję indeks elementu (dalej zwanego targetem) na który upuszczam przenoszony element
      indexTargetEl = state.findIndex(element => element.id === targetEl.id ? element : null);
      // znajduję target w stanie
      targetElInState = state.filter(element => element.id === targetEl.id ? element : null);
      // wyciągam target z arraya, bo target musi być obiektem nie tablicą. Analogicznie do kodu z poczatku skryptu z linijki 32
      targetElInState = targetElInState[0];

      // jeśli indeks istnieje i istnieje target w stanie
      if (indexTargetEl !== null && targetElInState) {
        // zmieniam przenoszonemu elementowi pozycję na static, by się ładnie układało
        draggedEl.style.position = 'static'
        // dispatchuję akcję która zamieni miejscami (indeksami) w reduxie elementy
        store.dispatch(changePositions(indexDraggedEl, indexTargetEl))
        // dispatchuję zwiększenie licznika o jeden
        store.dispatch(increaseCounter());
      }
      // po zwolnieniu klawisza nie potrzebuję już listenera
      document.removeEventListener('mouseup', stopMove);
    }
    // listenery na przyciśnięcie lewego klawisza oraz ruch kursorem
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', stopMove);

  }
  geta(){
    store.dispatch(getData());
  }

  resetCounterHandler() {
    store.dispatch(resetCounter())
  }
  render() {
    return (
      <div className={classes.App }>
        <p>Counter: {this.props.counter}</p>
        <Lists onDragHandler={this.onDragHandler}/>
        <button onClick={this.geta}>data</button>
        <button onClick={this.resetCounterHandler}>reset counter</button>

      </div>
    );
  }
}

const mapStateToProps = state => {
  const { lists, counter } = state.dndReducers;
  return {
    lists,
    counter
  }
}
export default connect(mapStateToProps)(App);