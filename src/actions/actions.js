export const CHANGE_POSITIONS = 'CHANGE_POSITION';
export const RESET_POSITIONS = 'RESET_POSITIONS';
export const RESET_COUNTER = 'RESET_COUNTER';
export const INCREASE_COUNTER = 'INCREASE_COUNTER';
export const SET_DATA = 'SET_DATA';

export function setData(data){
  return {
    type: SET_DATA,
    data
  }
}

export function changePositions(sourcePosition, targetPosition) {
  return {
    type: CHANGE_POSITIONS,
    sourcePosition,
    targetPosition
  }
}

export function resetPositions(){
  return {
    type: RESET_POSITIONS
  }
}

export function resetCounter(){
  return {
    type: RESET_COUNTER
  }
}

export function increaseCounter(){
  return {
    type: INCREASE_COUNTER
  }
}