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
      if (state.history.indexOf(payload) === -1) {
        return {
          ...state,
          history: [payload, ...state.history],
          isLoading: false
        };
      } else {
        return {
          ...state,
          isLoading: false
        }
      }
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