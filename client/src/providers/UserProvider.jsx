import { useEffect, useState, createContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import Loader from "../components/Loader";
import {
	loginUser,
	logUserOut,
	registerUser,
} from "../api/services/authService";
import { updateUser } from "../api/services/userService";
import {
	clearLocalStorage,
	getLocalStorageItem,
	setLocalStorageItem,
} from "../utils";
import { paths } from "../constants";

const defaultState = {
	error: null,
	isAuthenticated: false,
	isInitialLoading: true,
	isLoading: false,
	user: null,
	accessToken: null,
};

export const UserContext = createContext(defaultState);

const UserProvider = ({ children }) => {
	const navigate = useNavigate();

	const [isInitialLoading, setIsInitialLoading] = useState(
		defaultState.isInitialLoading
	);
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
			navigate(paths.LOGIN);
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
		setIsAuthenticated(true);
		let path = user?.avatarImage ? paths.CHAT : paths.PROFILE;
		navigate(path);
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
			setIsAuthenticated(true);
			navigate(paths.CHAT);
		}
		setIsInitialLoading(false);
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

	if (isInitialLoading) {
		return <Loader />;
	}

	return (
		<UserContext.Provider value={memoedValues}>{children}</UserContext.Provider>
	);
};

export default UserProvider;
