import {
  GET_PAINTING,
  CLEAR_PAINTING
} from '../actions/types';

const initialState = {
  paintings: null,
  isLoading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch(type) {
    case GET_PAINTING:
      return {
        ...state,
        painting: {...payload},
        isLoading: false
      }
    case CLEAR_PAINTING:
      return {
        ...state,
        painting: null,
        isLoading: false
      }
    default:
      return state;
  }
}