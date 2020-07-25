import {
  SET_POSTS,
  LOADING_DATA,
  DELETE_POST,
  POST_POST,
  ADD_POST,
  SET_POST,
  SUBMIT_COMMENT,
} from '../types';

const initialState = {
  posts: [],
  post: {},
  mypost: {},
  loading: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case SET_POST:
      return {
        ...state,
        post: action.payload,
      };
    case DELETE_POST:
      index = state.posts.findIndex(post => post.loveId === action.payload);
      state.posts.splice(index, 1);
      return {
        ...state,
      };
    case ADD_POST:
      return {
        ...state,
        mypost: action.payload,
      };
    case POST_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    case SUBMIT_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: [action.payload, ...state.post.comments],
        },
      };
    default:
      return state;
  }
}
