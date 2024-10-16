import { useCallback, useEffect, useMemo, useReducer, useRef } from "react";
import { createContainer } from "unstated-next";
import { useNavigate } from "react-router-dom";

import {
	loginUser,
	logoutUser,
	registerUser,
	getFreshTokens,
} from "../api/services/authService";
import { setupAxiosInterceptors } from "../api/interceptors";
import { actionTypes, AuthEvents, paths } from "../constants";
import authReducer, { initialState } from "./authReducer";
import { setAuthEventToLocalStorage } from "../utils";

export function useAuth() {
	const navigate = useNavigate();
	const clearAutoRefresh = useRef();
	const [state, dispatch] = useReducer(authReducer, initialState);

	const setError = useCallback(({ message }) => {
		let payloadMessage = message || "Something went wrong..."
		console.error("Error occurred:", message);
		dispatch({
			type: actionTypes.SET_ERROR,
			payload: payloadMessage,
		});
	}, []);

	const setUser = useCallback((user) => {
		dispatch({ type: actionTypes.SET_USER, payload: user });
	}, []);

	const clearAutoRefreshInterval = useCallback(() => {
		clearInterval(clearAutoRefresh.current);
	}, []);

	const clearToken = useCallback(() => {
		dispatch({ type: actionTypes.CLEAR_TOKENS });
		clearAutoRefreshInterval();
	}, []);

	const clearTokenAndCookie = useCallback(async () => {
		try {
			await logoutUser();
			dispatch({ type: actionTypes.LOG_OUT });
			clearAutoRefreshInterval();
		} catch (error) {
			throw error;
		}
	}, []);

	const setToken = useCallback(({ access_token, token_expiration }) => {
		const expirationDate = new Date(token_expiration);
		const payload = {
			accessToken: access_token,
			tokenExpiration: expirationDate,
		};
		dispatch({ type: actionTypes.SET_TOKENS, payload: payload });
	}, []);

	const refreshTokens = useCallback(async () => {
		try {
			const { user, token } = await getFreshTokens();
			setUser(user);
			setToken(token);
		} catch (error) {
			setError(error);
			clearToken();
			navigate(paths.LOGIN);
		}
	}, []);

	const setAutoRefreshInterval = useCallback(
		(tokenExpiration) => {
			const oneMinuteInterval = 60 * 1000;

			return setInterval(() => {
				const fiveMinutes = 5 * 60 * 1000;
				const now = new Date();
				if (
					tokenExpiration instanceof Date &&
					tokenExpiration - now < fiveMinutes
				) {
					refreshTokens(); // Refresh 5 minutes before expiration
				}
			}, oneMinuteInterval);
		},
		[]
	);

	const register = useCallback(async (registration) => {
		try {
			dispatch({ type: actionTypes.SET_LOADING });

			const { user, token } = await registerUser(registration);
			setToken(token);
			setAuthEventToLocalStorage(AuthEvents.REGISTER);
			setUser(user);
			navigate(paths.PROFILE);
		} catch (error) {
			setError(error);
		}
	}, []);

	const signIn = useCallback(async (credentials) => {
		try {
			dispatch({ type: actionTypes.SET_LOADING });

			const { user, token } = await loginUser(credentials);
			setToken(token);
			setAuthEventToLocalStorage(AuthEvents.LOGIN);
			setUser(user);
			navigate(user?.avatarImage ? paths.CHAT : paths.PROFILE);
		} catch (error) {
			setError(error);
		}
	}, []);

	const signOut = useCallback(async () => {
		try {
			clearTokenAndCookie();
			setAuthEventToLocalStorage(AuthEvents.LOGOUT);
			navigate(paths.LOGIN);
		} catch (error) {
			setError(error);
		}
	}, []);

	useEffect(() => {
		const fetchFreshTokens = async () => {
			if (state.isInitialLoading) {
				await refreshTokens();
				dispatch({ type: actionTypes.SET_INITIAL_LOADING });
			}
		};

		fetchFreshTokens();
	}, [state.isInitialLoading]);

	useEffect(() => {
		// Setup axios client interceptors
		const cleanupInterceptors = setupAxiosInterceptors(
			state.accessToken,
			() => {
				clearToken();
				navigate(paths.LOGIN);
			}
		);

		// clear interceptors on unmount.
		return () => {
			cleanupInterceptors();
		};
	}, [state.accessToken]);

	useEffect(() => {
		if (
			state.tokenExpiration instanceof Date &&
			!isNaN(state.tokenExpiration.valueOf())
		) {
			const now = new Date();
			const timeUntilExpiration =
				state.tokenExpiration.getTime() - now.getTime();
			if (timeUntilExpiration <= 0) {
				refreshTokens();
			} else {
				clearAutoRefreshInterval();
				clearAutoRefresh.current = setAutoRefreshInterval(
					state.tokenExpiration
				);
			}
		}

		return () => {
			clearAutoRefreshInterval();
		};
	}, [state.tokenExpiration]);

	useEffect(() => {
		const handleStorage = async ({ key }) => {
			if (state.user && key === AuthEvents.LOGOUT) {
				clearToken();
			} else if (key === AuthEvents.LOGIN || key === AuthEvents.REGISTER) {
				refreshTokens();
			}
		};

		window.addEventListener("storage", handleStorage);

		// Cleanup on unmount
		return () => {
			window.removeEventListener("storage", handleStorage);
		};
	}, [state.user]);

	const isAuthenticated = useMemo(
		() => !!state.accessToken,
		[state.accessToken]
	);

	return {
		...state,
		isAuthenticated,
		register,
		signOut,
		signIn,
	};
}

const AuthContainer = createContainer(useAuth);
export default AuthContainer;
