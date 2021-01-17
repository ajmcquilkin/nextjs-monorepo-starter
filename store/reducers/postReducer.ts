import omit from 'lodash.omit';
import { PostState, PostActions } from 'types/post';

const initialState: PostState = {
  posts: {},
  results: [],
  numResults: 0,
};

const postReducer = (state = initialState, action: PostActions): PostState => {
  if (action.status !== 'SUCCESS') { return state; }

  switch (action.type) {
    case 'FETCH_POST':
      return {
        ...state,
        posts: {
          ...state.posts,
          [action.payload.data._id]: action.payload.data
        }
      };

    case 'FETCH_POSTS':
      return {
        ...state,
        posts: action.payload.data.reduce((accum, post) => ({
          ...accum,
          [post._id]: post
        }), state.posts) // ? Is this immutable??
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
