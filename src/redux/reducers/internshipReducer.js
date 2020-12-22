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
	SUBMIT_DATA,
} from '../types';

const initialState = {
	internships: [],
	internship: {},
	myinternship: null,
	loading: false,
	comments: [],
	addcomment: null,
	submiting: null,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case LOADING_DATA:
			return {
				...state,
				loading: true,
			};
		case SUBMIT_DATA:
			return {
				...state,
				loading: false,
				submitting: 'submitting',
				addcomment: null,
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
				addcomment: null,
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
				internship => internship.icommentsId === action.payload
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
				addcomment: action.payload,
			};
		default:
			return state;
	}
}
