const host = process.env.REACT_APP_SERVER_BASE_URL;
const loginRoute = `/api/auth/login`;
const logoutRoute = `/api/auth/logout`;
const registerRoute = `/api/auth/register`;
const contactsRoute = `/api/users/contacts`;
const updateUserRoute = "/api/users/";
const messageRoute = `/api/messages`;

const routes = {
	contactsRoute,
	host,
	loginRoute,
	logoutRoute,
	messageRoute,
	registerRoute,
	updateUserRoute,
};

export default routes;
