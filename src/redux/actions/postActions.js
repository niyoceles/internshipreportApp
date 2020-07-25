import {
  SET_POSTS,
  LOADING_DATA,
  LIKE_POST,
  UNLIKE_POST,
  DELETE_POST,
  SET_ERRORS,
  POST_POST,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_POST,
  ADD_POST,
  STOP_LOADING_UI,
  SUBMIT_COMMENT,
} from '../types';
import axios from 'axios';

// Get all posts love
export const getPosts = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get('https://itrackinfo.herokuapp.com/internship/student')
    .then((res) => {
      dispatch({
        type: SET_POSTS,
        payload: res.data,
      });
      // console.log(res.data);
    })
    .catch((err) => {
      dispatch({
        type: SET_POSTS,
        payload: [],
      });
    });
};

export const getPost = (loveId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(
      `https://europe-west1-inlove-46f42.cloudfunctions.net/api/love/${loveId}`
    )
    .then((res) => {
      dispatch({
        type: SET_POST,
        payload: res.data,
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => console.log(err));
};

// Post a post
export const addInternship = (postLoveData) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('https://itrackinfo.herokuapp.com/internship', postLoveData)
    .then((res) => {
      dispatch({
        type: ADD_POST,
        payload: res.data,
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

// Submit a comment
export const submitComment = (loveId, commentData) => (dispatch) => {
  axios
    .post(
      `https://europe-west1-inlove-46f42.cloudfunctions.net/api/love/${loveId}/comment`,
      commentData
    )
    .then((res) => {
      dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data,
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
      throw err;
    });
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
