import { useContext, useState } from "react";
import { UserContext } from "../context/UserProvider";

export function useUser() {
	return useContext(UserContext);
}

export function useAuth() {
	return useContext(UserContext);
}

export const useLocalStorage = (keyName, defaultValue) => {
	const [storedValue, setStoredValue] = useState(() => {
		try {
			const value = localStorage.getItem(keyName);
			if (value) {
				return JSON.parse(value);
			} else {
				localStorage.setItem(keyName, JSON.stringify(defaultValue));
				return defaultValue;
			}
		} catch (err) {
			return defaultValue;
		}
	});
	const setValue = (newValue) => {
		try {
			localStorage.setItem(keyName, JSON.stringify(newValue));
		} catch (err) {
			console.log(err);
		}
		setStoredValue(newValue);
	};
	return [storedValue, setValue];
};
