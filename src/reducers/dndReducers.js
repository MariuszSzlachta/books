import { CHANGE_POSITIONS, RESET_POSITIONS, RESET_COUNTER, INCREASE_COUNTER, GET_DATA } from '../actions/actions';
import data from '../Data/data.json';



const initialState = {
  defaultListOrder: data,
  lists: null,
  counter: 0
}

const dndReducers =  function(state = initialState, action){
  switch(action.type){

    case GET_DATA:
    case RESET_POSITIONS:
      const defaultOrder = [...state.defaultListOrder];
      return {...state, lists: defaultOrder};

    case CHANGE_POSITIONS:
      const workState = {...state};
      let { lists } = workState;
      let draggedEl = lists[action.sourcePosition];
      let targetEl = lists[action.targetPosition];
      lists[action.sourcePosition] = targetEl;
      lists[action.targetPosition] = draggedEl;
      return {...state, lists};

    case RESET_COUNTER:
      return {...state, counter: 0};

    case INCREASE_COUNTER:
      return {...state, counter: state.counter + 1};

    default:
      return state
  }
}

export default dndReducers;