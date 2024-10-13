const USER_STORAGE_KEY = process.env.REACT_APP_STORAGE_USER_KEY;

export const clearLocalStorage = () => {
	localStorage.clear();
};

export const getLocalStorageItem = (key = USER_STORAGE_KEY) => {
	return JSON.parse(localStorage.getItem(key));
};

export const setLocalStorageItem = (item, key = USER_STORAGE_KEY) => {
	localStorage.setItem(key, JSON.stringify(item));
};

export const removeLocalStorageItem = (key = USER_STORAGE_KEY) => {
	localStorage.removeItem(key);
};
