import {
	SET_INTERNSHIPS,
	LOADING_DATA,
	DELETE_INTERNSHIP,
	INTERNSHIP_INTERNSHIP,
	ADD_INTERNSHIP,
	SET_INTERNSHIP,
	SUBMIT_COMMENT,
	GET_COMMENT_SUCCESS,
	GET_COMMENT_FAILURE,
} from '../types';

const initialState = {
	internships: [],
	internship: {},
	myinternship: {},
	loading: false,
	comments: [],
	addcomment: null,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case LOADING_DATA:
			return {
				...state,
				loading: true,
			};
		case SET_INTERNSHIPS:
			return {
				...state,
				internships: action.payload,
				loading: false,
			};
		case SET_INTERNSHIP:
			return {
				...state,
				internship: action.payload,
			};
		case GET_COMMENT_SUCCESS:
			return {
				...state,
				comments: action.payload,
			};
		case GET_COMMENT_FAILURE:
			return {
				...state,
				comments: action.payload,
			};
		case DELETE_INTERNSHIP:
			index = state.internships.findIndex(
				internship => internship.loveId === action.payload
			);
			state.internships.splice(index, 1);
			return {
				...state,
			};
		case ADD_INTERNSHIP:
			return {
				...state,
				myinternship: action.payload,
			};
		case INTERNSHIP_INTERNSHIP:
			return {
				...state,
				internships: [action.payload, ...state.internships],
			};
		case SUBMIT_COMMENT:
			return {
				...state,
				internship: {
					...state.internship,
					comments: [action.payload, ...state.internship.comments],
				},
				addcomment: action.payload,
			};
		default:
			return state;
	}
}
