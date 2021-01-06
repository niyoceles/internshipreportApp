import {
	SET_INTERNSHIPS,
	LOADING_DATA,
	DELETE_INTERNSHIP,
	INTERNSHIP_INTERNSHIP,
	ADD_INTERNSHIP,
	UPDATE_INTERNSHIP,
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
	updated: null,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case LOADING_DATA:
			return {
				...state,
				loading: true,
				updated: null,
				addcomment: null,
			};
		case SUBMIT_DATA:
			return {
				...state,
				loading: false,
				submitting: 'submitting',
				addcomment: null,
				updated: null,
				myinternship: null,
			};
		case SET_INTERNSHIPS:
			return {
				...state,
				internships: action.payload,
				loading: false,
				updated: null,
				myinternship: null,
				addcomment: null,
			};
		case SET_INTERNSHIP:
			return {
				...state,
				internship: action.payload,
				addcomment: null,
				updated: null,
				myinternship: null
			};
		case GET_COMMENT_SUCCESS:
			return {
				...state,
				comments: action.payload,
				updated: null,
				myinternship: null,
				addcomment: null,
			};
		case GET_COMMENT_FAILURE:
			return {
				...state,
				comments: action.payload,
				updated: null,
				myinternship: null,
				addcomment: null,
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
				updated: null,
				addcomment: null,
			};
		case UPDATE_INTERNSHIP:
			return {
				...state,
				updated: action.payload,
				myinternship: null,
				addcomment: null,
			};
		case INTERNSHIP_INTERNSHIP:
			return {
				...state,
				internships: [action.payload, ...state.internships],
				updated: null,
				myinternship: null,
				addcomment: null,
			};
		case SUBMIT_COMMENT:
			return {
				...state,
				addcomment: action.payload,
				updated: null,
				myinternship: null
			};
		default:
			return state;
	}
}
