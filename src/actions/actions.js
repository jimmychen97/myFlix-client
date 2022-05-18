// potential actions. Event constructors, call them from a view to formally express
// the change you want to perform on the application's state
export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';

// action creators that returns the action itself (object with type)
export function setMovies(value) {
  return { type: SET_MOVIES, value };
}

export function setFilter(value) {
  return { type: SET_FILTER, value };
}
