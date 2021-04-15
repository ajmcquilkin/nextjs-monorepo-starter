import omit from 'lodash.omit';
import { ResourceState } from 'types/resource';
import { Actions } from 'types/state';

const initialState: ResourceState = {
  resources: {},
  results: [],
  numResults: 0
};

const resourceReducer = (state = initialState, action: Actions): ResourceState => {
  if (action.status !== 'SUCCESS') return state;

  switch (action.type) {
    case 'FETCH_RESOURCE':
      return {
        ...state,
        resources: {
          ...state.resources,
          [action.payload.data.resource._id]: action.payload.data.resource
        }
      };

    case 'FETCH_RESOURCES':
      return {
        ...state,
        resources: action.payload.data.resources.reduce((accum, resource) => ({
          ...accum,
          [resource._id]: resource
        }), state.resources)
      };

    case 'FETCH_RESOURCE_RESULTS':
      return {
        ...state,
        results: action.payload.data.results,
        numResults: action.payload.data.numResults,
        resources: action.payload.data.resources.reduce((accum, resource) => ({
          ...accum,
          [resource._id]: resource
        }), state.resources)
      };

    case 'DELETE_RESOURCE':
      return {
        ...state,
        resources: omit(state.resources, action.payload.data.id)
      };

    default:
      return state;
  }
};

export default resourceReducer;
