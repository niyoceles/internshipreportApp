import {
	SET_USER,
	SET_ERRORS,
	CLEAR_ERRORS,
	LOADING_UI,
	LOADING_USER,
	SET_UNAUTHENTICATED,
	SUBMIT_DATA,
	GET_SUPERVISOR,
} from '../types';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

// const { REACT_APP_URL_API } = process.env;

export const loginUser = userData => dispatch => {
	dispatch({ type: LOADING_UI });
	axios
		.post('https://itrackinfo.herokuapp.com/user/signin', userData)
		.then(res => {
			console.log('data from::', res.data);
			setAuthorization(res.data.User.token);
			dispatch({ type: SET_USER, payload: res.data.User });
			AsyncStorage.setItem('userInfo', JSON.stringify(res.data.User));
		})
		.catch(err => {
			dispatch({ type: SET_ERRORS, payload: err.response.data.errors });
		});
};

export const signupUser = newUserData => dispatch => {
	dispatch({ type: LOADING_UI });
	dispatch({ type: SUBMIT_DATA, payload: 'submitting' });
	console.log('new user', newUserData);
	axios
		.post('https://itrackinfo.herokuapp.com/user/student', newUserData)
		.then(res => {
			console.log('CREATE AN ACCOUTN', res.data);
			setAuthorization(res.data.User.token);
			dispatch({ type: SET_USER, payload: res.data.User });
			AsyncStorage.setItem('userInfo', JSON.stringify(res.data.User));
		})
		.catch(err => {
			console.log('ERZZROR:', err.response.data.error);
			dispatch({ type: SET_ERRORS, payload: err.response.data.error });
		});
};

export const signupSupervisor = newUserData => dispatch => {
	// dispatch({ type: LOADING_UI });
	dispatch({ type: SUBMIT_DATA, payload: 'submitting' });
	console.log('new supervisor', newUserData);
	axios
		.post('https://itrackinfo.herokuapp.com/user/supervisor', newUserData)
		.then(res => {
			console.log('CREATE SUPERVISOR ACCOUNT', res.data);
			setAuthorization(res.data.User.token);
			dispatch({ type: SET_USER, payload: res.data.User });
			AsyncStorage.setItem('userInfo', JSON.stringify(res.data.User));
		})
		.catch(err => {
			console.log('ERsssssu:', err.response.data.error);
			dispatch({ type: SET_ERRORS, payload: err.response.data.error });
		});
};

export const getSupervisors = () => dispatch => {
	axios
		.get('https://itrackinfo.herokuapp.com/user/supervisor')
		.then(res => {
			dispatch({
				type: GET_SUPERVISOR,
				payload: res.data.supervisors,
			});
		})
		.catch(err => {
			dispatch({ type: SET_ERRORS, payload: err.response.data.error });
		});
};

export const setAuthorization = token => {
	const userIdToken = `Bearer ${token}`;
	AsyncStorage.setItem('userIdToken', userIdToken);
	//seting authorization to the header axios
	axios.defaults.headers.common.Authorization = userIdToken;
};

export const logoutUser = () => dispatch => {
	AsyncStorage.removeItem('userIdToken');
	delete axios.defaults.headers.common.Authorization;
	dispatch({ type: SET_UNAUTHENTICATED });
};
