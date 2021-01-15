import omit from 'lodash.omit';
import { Post, PostState, PostActionTypes } from 'types/post';
import { getReducerSuccessSelector } from 'store/helpers';

const initialState: PostState = {
  posts: {},
  results: [],
  numResults: 0,
};

// TODO: Update action typing

const postReducer = (state = initialState, action): PostState => {
  switch (action.type) {
    case getReducerSuccessSelector<PostActionTypes>(PostActionTypes.FETCH_POST):
      return {
        ...state,
        posts: {
          ...state.posts,
          [action.payload.data._id]: action.payload.data
        }
      };

    case getReducerSuccessSelector<PostActionTypes>(PostActionTypes.FETCH_POSTS):
      return {
        ...state,
        posts: {
          ...(action.payload.data as Post[]).reduce((accum, post) => ({
            ...accum,
            [post._id]: post
          }), {})
        }
      };

    case getReducerSuccessSelector<PostActionTypes>(PostActionTypes.DELETE_POST):
      return {
        ...state,
        posts: omit(state.posts, action.payload.id)
      };

    default:
      return state;
  }
};

export default postReducer;
