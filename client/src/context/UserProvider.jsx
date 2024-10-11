import { useEffect, useState, createContext, useMemo } from "react";
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
	isAuthenticated: false,
	user: null,
	isLoading: true,
	error: null,
};

export const UserContext = createContext(defaultState);

const USER_STORAGE_KEY = process.env.REACT_APP_STORAGE_USER_KEY;

const clearLocalStorage = () => {
	localStorage.clear();
};

const getLocalStorageItem = (key = USER_STORAGE_KEY) => {
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
	const [user, setUser] = useState(defaultState.user);
	const [error, setError] = useState(defaultState.error);
	const [isAuthenticated, setIsAuthenticated] = useState(
		defaultState.isAuthenticated
	);

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
			setIsAuthenticated(false);
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
		setIsAuthenticated(AuthStatus.SIGNED_IN);
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

	const memoedValues = useMemo(
		() => ({
			isAuthenticated,
			error,
			isLoading,
			register,
			signIn,
			signOut,
			updateUser: saveUserChanges,
			user,
		}),
		[user, isLoading, error]
	);

	return (
		<UserContext.Provider value={memoedValues}>{children}</UserContext.Provider>
	);
};

export default UserProvider;
