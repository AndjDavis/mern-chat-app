import { useContext, useEffect, useState, createContext } from "react";
import { useNavigate } from "react-router-dom";

import {
	loginUser,
	logUserOut,
	registerUser,
} from "../api/services/authService";
import { updateUser } from "../api/services/userServices";

const AuthStatus = {
	SIGNED_IN: "signedIn",
	SIGNED_OUT: "signedOut",
	LOADING: true,
};

const defaultState = {
	authStatus: AuthStatus.SIGNED_OUT,
	user: null,
	isLoading: AuthStatus.LOADING,
	error: null,
};

export const AuthContext = createContext(defaultState);

export const AuthIsSignedIn = ({ children }) => {
	const { authStatus } = useContext(AuthContext);

	return <>{authStatus === AuthStatus.SIGNED_IN ? children : null}</>;
};

export const AuthIsNotSignedIn = ({ children }) => {
	const { authStatus } = useContext(AuthContext);
	return <>{authStatus === AuthStatus.SIGNED_OUT ? children : null}</>;
};

const USER_STORAGE_KEY = process.env.REACT_APP_LOCALHOST_KEY;

const AuthProvider = ({ children }) => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(defaultState.isLoading);
	const [authStatus, setAuthStatus] = useState(defaultState.authStatus);
	const [user, setUser] = useState(defaultState.user);
	const [error, setError] = useState(defaultState.error);

	const signIn = async (credentials) => {
		setError(null);
		setIsLoading(true);

		try {
			const { user } = await loginUser(credentials);
			handleSuccessfulAuth(user);
		} catch (error) {
			setError(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	const signOut = async (userId) => {
		setError(null);
		setIsLoading(true);

		try {
			await logUserOut(userId);
			setUser(null);
			setAuthStatus(AuthStatus.SIGNED_OUT);
			clearLocalStorage();
			navigate("/login");
		} catch (error) {
			setError(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	const register = async (registration) => {
		setError(null);
		setIsLoading(true);

		try {
			const { user } = await registerUser(registration);
			handleSuccessfulAuth(user);
		} catch (error) {
			setError(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	const handleSuccessfulAuth = (user) => {
		setUser(user);
		setLocalStorageItem(user);
		setAuthStatus(AuthStatus.SIGNED_IN);
		navigate("/");
	};

	const makeUserUpdate = async (userId, userUpdates) => {
		setError(null);
		setIsLoading(true);

		try {
			const { user: updatedUser } = await updateUser(userId, userUpdates);
			setUser((prevUser) => {
				setLocalStorageItem(updatedUser);
				return { ...prevUser, ...updatedUser };
			});
		} catch (error) {
			setError(error);
		} finally {
			setIsLoading(false);
		}
	};

	// TODO: Switch to token based.
	const setLocalStorageItem = (item, key = USER_STORAGE_KEY) => {
		localStorage.setItem(key, JSON.stringify(item));
	};

	const getLocalStorageItem = (key = USER_STORAGE_KEY) => {
		return JSON.parse(localStorage.getItem(key));
	};

	const removeLocalStorageItem = (key = USER_STORAGE_KEY) => {
		localStorage.removeItem(key);
	};

	const clearLocalStorage = () => {
		localStorage.clear();
	};

	const providerValues = {
		authStatus,
		error,
		isLoading,
		register,
		signIn,
		signOut,
		updateUser: makeUserUpdate,
		user,
	};

	// TODO: Update to set token on storage.
	useEffect(() => {
		const storedUser = getLocalStorageItem();
		if (storedUser) {
			setUser(storedUser);
		}
		setIsLoading(false);
	}, []);

	return (
		<AuthContext.Provider value={providerValues}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
