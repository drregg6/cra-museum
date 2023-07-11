import {
  GET_PAINTINGS
} from '../actions/types';

const initialState = {
  paintings: [],
  isLoading: true
};

export default function paintingsReducer(state = initialState, action) {
  const { type, payload } = action;
  switch(type) {
    case GET_PAINTINGS:
      return {
        ...state,
        paintings: [...payload],
        isLoading: false
      }
    default:
      return state;
  }
}