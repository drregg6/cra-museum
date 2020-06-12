import { combineReducers } from 'redux';

import paintings from './paintings';
import painting from './painting';
import history from './history';

/* root reducer */
export default combineReducers({
  paintings,
  painting,
  history
});