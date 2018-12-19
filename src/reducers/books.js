import { CHANGE_POSITIONS, RESET_POSITIONS, RESET_COUNTER, INCREASE_COUNTER, SET_DATA } from '../actions/actions';


const initialState = {
  defaultOrder: null,
  list: null,
  counter: 0
}

const books =  function(state = initialState, action){
  switch(action.type){
    case SET_DATA:
      return {...state, defaultOrder: action.data, list: action.data};

    case RESET_POSITIONS:
      const defaultOrder = [...state.defaultOrder];
      return {...state, list: defaultOrder};

    case CHANGE_POSITIONS:
      const list = [...state.list];
      const draggedEl = list[action.sourcePosition];
      const targetEl = list[action.targetPosition];
      list[action.sourcePosition] = targetEl;
      list[action.targetPosition] = draggedEl;
      return {...state, list};

    case RESET_COUNTER:
      return {...state, counter: 0};

    case INCREASE_COUNTER:
      return {...state, counter: state.counter + 1};

    default:
      return state;
  }
};

export default books;