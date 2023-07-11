import { combineReducers } from 'redux';

import paintingsReducer from './paintings';
import paintingReducer from './painting';
import historyReducer from './history';

/* root reducer */
export default combineReducers({
  paintings: paintingsReducer,
  painting: paintingReducer,
  history: historyReducer
});