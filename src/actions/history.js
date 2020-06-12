import {
  ADD_PAINTER,
  DELETE_HISTORY
} from './types';

export const addPainter = painter => dispatch => {
  dispatch({ type: ADD_PAINTER, payload: painter });
};

export const deleteHistory = () => dispatch => {
  dispatch({ type: DELETE_HISTORY });
}