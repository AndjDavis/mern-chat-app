const host = process.env.REACT_APP_SERVER_BASE_URL;
const loginRoute = "/api/auth/login";
const logoutRoute = "/api/auth/logout";
const registerRoute = "/api/auth/register";
const refreshTokenRoute = "/api/auth/refresh-token";
const contactsRoute = "/api/users/contacts";
const updateUserRoute = "/api/users/";
const messageRoute = "/api/messages";

const routes = {
	contactsRoute,
	host,
	loginRoute,
	logoutRoute,
	messageRoute,
	refreshTokenRoute,
	registerRoute,
	updateUserRoute,
};

export default routes;
