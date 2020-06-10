import {
  GET_PAINTING
} from '../actions/types';

const initialState = {
  paintings: {},
  isLoading: true
};

export default function(state = initialState, action) {
  const { type, payload } = actions;
  switch(type) {
    case GET_PAINTING:
      return {
        ...state,
        isLoading: false
      }
    default:
      return state;
  }
}