import { combineReducers } from 'redux';

import paintings from './paintings';
import painting from './painting';

/* root reducer */
export default combineReducers({
  paintings,
  painting
});