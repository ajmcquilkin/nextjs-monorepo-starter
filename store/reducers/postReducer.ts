import omit from 'lodash.omit';
import { PostState } from 'types/post';
import { Actions } from 'types/state';

const initialState: PostState = {
  posts: {},
  results: [],
  numResults: 0,
};

const postReducer = (state = initialState, action: Actions): PostState => {
  if (action.status !== 'SUCCESS') { return state; }

  switch (action.type) {
    case 'FETCH_POST':
      return {
        ...state,
        posts: {
          ...state.posts,
          [action.payload.data.post._id]: action.payload.data.post
        }
      };

    case 'FETCH_RELEASE':
      return {
        ...state,
        posts: (action.payload.data?.posts || []).reduce((accum, post) => ({
          ...accum,
          [post._id]: post
        }), state.posts)
      };

    case 'FETCH_POSTS':
      return {
        ...state,
        posts: action.payload.data.posts.reduce((accum, post) => ({
          ...accum,
          [post._id]: post
        }), state.posts)
      };

    case 'FETCH_POST_RESULTS':
      return {
        ...state,
        results: action.payload.data.results,
        numResults: action.payload.data.numResults,
        posts: action.payload.data.posts.reduce((accum, post) => ({
          ...accum,
          [post._id]: post
        }), state.posts)
      };

    case 'DELETE_POST':
      return {
        ...state,
        posts: omit(state.posts, action.payload.data.id)
      };

    default:
      return state;
  }
};

export default postReducer;
