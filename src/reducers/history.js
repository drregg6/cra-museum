import {
  ADD_PAINTER,
  DELETE_HISTORY
} from '../actions/types';

const initialState = {
  history: [],
  isLoading: true
};

export default function( state = initialState, action ) {
  const { payload, type } = action;
  switch(type) {
    case ADD_PAINTER:
      return {
        ...state,
        history: [payload, ...state.history],
        isLoading: false
      };
    case DELETE_HISTORY:
      return {
        ...state,
        history: [],
        isLoading: false
      }
    default:
      return state;
  }
}