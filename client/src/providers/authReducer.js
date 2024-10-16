import { actionTypes } from "../constants"

export const initialState = {
	accessToken: null,
	error: null,
	isInitialLoading: true,
	isLoading: false,
	user: null,
	tokenExpiration: undefined,
};

export default function authReducer(state, action) {
    console.log("authReducer - action.type", action.type);
	switch (action.type) {
		case actionTypes.CLEAR_TOKENS:
			return {
				...state,
				accessToken: initialState.accessToken,
				tokenExpiration: initialState.tokenExpiration,
			};
		case actionTypes.CLEAR_USER:
			return {
				...state,
				error: initialState.error,
				isLoading: false,
				user: initialState.user,
			};
		case actionTypes.LOG_OUT:
			const { isInitialLoading, ...defaultState } = initialState;
			return {
				...state,
				...defaultState,
			};
		case actionTypes.SET_ERROR:
			return {
				...state,
				error: action.payload,
				isLoading: false,
			};
		case actionTypes.SET_LOADING:
			return {
				...state,
				isLoading: true,
			};
		case actionTypes.SET_INITIAL_LOADING:
			return {
				...state,
				isInitialLoading: false,
			};
		case actionTypes.SET_TOKENS:
			return {
				...state,
                accessToken: action.payload.accessToken,
                tokenExpiration: action.payload.tokenExpiration,
			};
		case actionTypes.SET_USER:
			return {
				...state,
				error: null,
				isInitialLoading: false,
				isLoading: false,
				user: action.payload,
			};
		default:
			return state;
	}
}