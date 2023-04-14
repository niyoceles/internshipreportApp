import {
	SET_USER,
	SET_AUTHENTICATED,
	SET_UNAUTHENTICATED,
	LOADING_USER,
	SUBMIT_DATA,
	GET_SUPERVISOR,
} from '../types';

const initialState = {
	authenticated: false,
	credentials: {},
	likes: [],
	notifications: [],
	submitting: null,
	supervisors: null,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case SUBMIT_DATA:
			return {
				...state,
				submitting: 'submitting',
			};
		case SET_AUTHENTICATED:
			return {
				...state,
				authenticated: true,
			};
		case GET_SUPERVISOR:
			return {
				...state,
				supervisors: action.payload,
			};
		case SET_UNAUTHENTICATED:
			return initialState;
		case SET_USER:
			return {
				authenticated: true,
				loading: false,
				credentials: action.payload,
			};
		case LOADING_USER:
			return {
				...state,
				loading: true,
			};
		default:
			return state; //or return initialState
	}
}
