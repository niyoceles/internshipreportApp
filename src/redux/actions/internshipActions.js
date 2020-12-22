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
	GET_COMMENT_SUCCESS,
	GET_COMMENT_FAILURE,
	SUBMIT_DATA
} from '../types';
import axios from 'axios';

// Get all posts icomments
export const getInternships = () => dispatch => {
	dispatch({ type: LOADING_DATA });
	axios
		.get('https://itrackinfo.herokuapp.com/internship/myinternships')
		.then(res => {
			dispatch({
				type: SET_INTERNSHIPS,
				payload: res.data.myinternships,
			});
			// console.log(res.data);
		})
		.catch(err => {
			dispatch({
				type: SET_INTERNSHIPS,
				payload: [],
			});
		});
};

// Get single internship
export const getInternship = id => dispatch => {
	axios
		.get(`https://itrackinfo.herokuapp.com/internship/${id}`)
		.then(res => {
			// console.log('ggggggggggggg', res.data.readinternship.comments);
			dispatch({
				type: GET_COMMENT_SUCCESS,
				payload: res.data.readinternship.comments
					? res.data.readinternship.comments
					: null,
			});
		})
		.catch(err => {
			dispatch({
				type: GET_COMMENT_FAILURE,
				payload: [],
			});
		});
};

// Internship a post
export const addInternship = posticommentsData => dispatch => {
	dispatch({ type: LOADING_UI });
	axios
		.post('https://itrackinfo.herokuapp.com/internship', posticommentsData)
		.then(res => {
			console.log('successed', res.data);
			dispatch({
				type: ADD_INTERNSHIP,
				payload: res.data,
			});
			dispatch(clearErrors());
		})
		.catch(err => {
			console.log('eeeeeeeejj', err.response.data);
			dispatch({
				type: SET_ERRORS,
				payload: err.response.data,
			});
		});
};

// Submit a comment
export const submitComment = commentData => dispatch => {
	// console.log('ddddddddddddddd', commentData);
	axios
		.post(`https://itrackinfo.herokuapp.com/internship/comment`, commentData)
		.then(res => {
			dispatch({
				type: SUBMIT_COMMENT,
				payload: res.data.message,
			});
			dispatch(clearErrors());
		})
		.catch(err => {
			dispatch({
				type: SET_ERRORS,
				payload: err.response.data,
			});
			throw err;
		});
};

export const clearErrors = () => dispatch => {
	dispatch({ type: CLEAR_ERRORS });
};
