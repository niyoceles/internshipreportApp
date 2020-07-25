import {
	SET_USER,
	SET_ERRORS,
	CLEAR_ERRORS,
	LOADING_UI,
	LOADING_USER,
	SET_UNAUTHENTICATED,
	MARK_NOTIFICATIONS_READ,
} from '../types';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

// const { REACT_APP_URL_API } = process.env;

export const loginUser = userData => dispatch => {
	dispatch({ type: LOADING_UI });
	axios
		.post('https://itrackinfo.herokuapp.com/user/signin', userData)
		.then(res => {
      console.log('data from::', res.data)
			setAuthorization(res.data.User.token);
      dispatch({ type: SET_USER, payload: res.data.User});
      AsyncStorage.setItem('userInfo', JSON.stringify(res.data.User));
		})
		.catch(err => {
			dispatch({ type: SET_ERRORS, payload: err.response.data.errors });
		});
};

export const signupUser = newUserData => dispatch => {
	dispatch({ type: LOADING_UI });

	axios
		.post('https://itrackinfo.herokuapp.com/user/student', newUserData)
		.then(res => {
			setAuthorization(res.data.token);
			dispatch({ type: CLEAR_ERRORS });
		})
		.catch(err => {
			dispatch({ type: SET_ERRORS, payload: err.response.data });
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
	console.log('Toooo:', AsyncStorage.getItem('userIdToken'));
	delete axios.defaults.headers.common.Authorization;
	dispatch({ type: SET_UNAUTHENTICATED });
};

//upload image
export const uploadImage = formData => dispatch => {
	dispatch({ type: LOADING_USER });
	axios
		.post(
			'https://europe-west1-inlove-46f42.cloudfunctions.net/api/user/image',
			formData
		)
		.then(() => {
			// dispatch(getUserData());
		})
		.catch(err => console.log(err));
};

//edit your profile
export const editUserDetails = userDetails => dispatch => {
	dispatch({ type: LOADING_USER });
	axios
		.post(
			'https://europe-west1-inlove-46f42.cloudfunctions.net/api/user',
			userDetails
		)
		.then(() => {
			// dispatch(getUserData());
		})
		.catch(err => console.log(err));
};
