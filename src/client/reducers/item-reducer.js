import omit from 'lodash.omit';
import ActionTypes from '../actions';

const initialState = {
  items: {},
  selected: {},
  results: [],
  numResults: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `${ActionTypes.SEARCH}_SUCCESS`: // Saves results and total number of results available (before pagination, from server)
      return { ...state, results: action.payload.data.results, numResults: action.payload.data.numResults };
    case `${ActionTypes.FETCH_ITEM}_SUCCESS`: // Load item into { id: element } mapping
      return { ...state, selected: action.payload.data, items: { ...state.items, [action.payload.data._id]: action.payload.data } };
    case `${ActionTypes.FETCH_ITEMS}_SUCCESS`: // Load items into { id: element } mapping
      return { ...state, items: { ...action.payload.data.reduce((accum, e) => ({ ...accum, [e._id]: e }), {}) } };
    case `${ActionTypes.DELETE_ITEM}_SUCCESS`: // Delete item from state
      return { ...state, items: omit(state.items, action.payload.id) };
    default:
      return state;
  }
};

export default reducer;
