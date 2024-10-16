const setAuthEventToLocalStorage = (authEvent) => {
	const eventTime = new Date().toISOString();
	localStorage.setItem(authEvent, eventTime);
};

export {
	setAuthEventToLocalStorage,
};
