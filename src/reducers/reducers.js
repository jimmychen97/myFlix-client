import { combineReducers } from 'redux';
import { SET_FILTER, SET_MOVIES } from '../actions/actions';

// reducer function takes a state and an action
// returns a new value when concered by the action
// calculate the next state and return it, reducer must return a state
// reducer should never mutate the state, they should create a new instance of the state to be returned

// if the given action is unrelated to the reducer, return default state
function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}

// combined reducer
const moviesApp = combineReducers({
  visibilityFilter,
  movies,
});

export default moviesApp;
