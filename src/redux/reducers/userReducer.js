import {
	SET_USER,
	SET_AUTHENTICATED,
	SET_UNAUTHENTICATED,
	LOADING_USER,
	LIKE_POST,
	UNLIKE_POST,
	MARK_NOTIFICATIONS_READ,
} from '../types';

const initialState = {
	authenticated: false,
	credentials: {},
	likes: [],
	notifications: [],
};

export default function (state = initialState, action) {
	switch (action.type) {
		case SET_AUTHENTICATED:
			return {
				...state,
				authenticated: true,
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
		case LIKE_POST:
			return {
				...state,
				likes: [
					...state.likes,
					{
						userName: state.credentials.email,
						loveId: action.payload.loveId,
					},
				],
			};
		case UNLIKE_POST:
			return {
				...state,
				likes: state.likes.filter(
					like => like.loveId !== action.payload.loveId
				),
			};
		case MARK_NOTIFICATIONS_READ:
			state.notifications.forEach(not => (not.read = true));
			return {
				...state,
			};
		default:
			return state; //or return initialState
	}
}
