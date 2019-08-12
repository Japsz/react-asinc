import {combineReducers} from "redux";
import users from './users/reducer';
import episodes from './episodes/reducer';
import characters from './characters/reducer';

export default combineReducers({
  users,
  episodes,
  characters
})