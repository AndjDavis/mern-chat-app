const USER_STORAGE_KEY = process.env.REACT_APP_STORAGE_USER_KEY;

export const clearLocalStorage = () => {
	localStorage.clear();
};

export const getLocalStorageItem = (key) => {
	return JSON.parse(localStorage.getItem(key));
};

export const setLocalStorageItem = (key, item) => {
	localStorage.setItem(key, JSON.stringify(item));
};

export const removeLocalStorageItem = (key) => {
	localStorage.removeItem(key);
};
