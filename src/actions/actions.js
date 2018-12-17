export const CHANGE_POSITIONS = 'CHANGE_POSITION';
export const RESET_POSITIONS = 'RESET_POSITIONS';
export const RESET_COUNTER = 'RESET_COUNTER';
export const INCREASE_COUNTER = 'INCREASE_COUNTER';

export const GET_DATA = 'GET_DATA';

export function getData(){
  return {
    type: GET_DATA
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