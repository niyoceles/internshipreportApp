import {
  SET_INTERNSHIPS,
  LOADING_DATA,
  DELETE_INTERNSHIP,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_INTERNSHIP,
  ADD_INTERNSHIP,
  STOP_LOADING_UI,
  SUBMIT_COMMENT,
} from '../types';
import axios from 'axios';

// Get all posts love
export const getInternships = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get('https://itrackinfo.herokuapp.com/internship/myinternships')
    .then((res) => {
      dispatch({
        type: SET_INTERNSHIPS,
        payload: res.data.myinternships,
      });
      // console.log(res.data);
    })
    .catch((err) => {
      dispatch({
        type: SET_INTERNSHIPS,
        payload: [],
      });
    });
};

// Internship a post
export const addInternship = (postLoveData) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('https://itrackinfo.herokuapp.com/internship', postLoveData)
    .then((res) => {
      dispatch({
        type: ADD_INTERNSHIP,
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
