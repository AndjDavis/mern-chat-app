import { useContext, useEffect, useState, createContext } from "react";
import { useNavigate } from "react-router-dom";

import {
	loginUser,
	logUserOut,
	registerUser,
} from "../api/services/authService";
import { updateUser } from "../api/services/userService";

const AuthStatus = {
	SIGNED_IN: "signedIn",
	SIGNED_OUT: "signedOut",
};

const defaultState = {
	authStatus: AuthStatus.SIGNED_OUT,
	user: null,
	isLoading: true,
	error: null,
};

export const UserContext = createContext(defaultState);

export const AuthIsSignedIn = ({ children }) => {
	const { authStatus } = useContext(UserContext);

	return <>{authStatus === AuthStatus.SIGNED_IN ? children : null}</>;
};

export const AuthIsNotSignedIn = ({ children }) => {
	const { authStatus } = useContext(UserContext);
	return <>{authStatus === AuthStatus.SIGNED_OUT ? children : null}</>;
};

const USER_STORAGE_KEY = process.env.REACT_APP_STORAGE_USER_KEY;

const clearLocalStorage = () => {
	localStorage.clear();
};

const getLocalStorageItem = (key = USER_STORAGE_KEY) => {
	console.log("getLocalStorageItem", key);
	return JSON.parse(localStorage.getItem(key));
};

const setLocalStorageItem = (item, key = USER_STORAGE_KEY) => {
	localStorage.setItem(key, JSON.stringify(item));
};

const removeLocalStorageItem = (key = USER_STORAGE_KEY) => {
	localStorage.removeItem(key);
};

const UserProvider = ({ children }) => {
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

	const signOut = async () => {
		setError(null);
		setIsLoading(true);

		try {
			await logUserOut(user._id);
			clearLocalStorage();
			setUser(null);
			setAuthStatus(AuthStatus.SIGNED_OUT);
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

	const saveUserChanges = async (userUpdates) => {
		setError(null);
		setIsLoading(true);

		try {
			const { user: updatedUser } = await updateUser(user._id, userUpdates);
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

	// TODO: Update to set token on storage.
	useEffect(() => {
		const storedUser = getLocalStorageItem();
		if (storedUser) {
			setUser(storedUser);
		}
		setIsLoading(false);
	}, [getLocalStorageItem]);

	const providerValues = {
		authStatus,
		error,
		isLoading,
		register,
		signIn,
		signOut,
		updateUser: saveUserChanges,
		user,
	};
	console.log("This is my UserProvider");
	return (
		<UserContext.Provider value={providerValues}>
			{children}
		</UserContext.Provider>
	);
};

export default UserProvider;
