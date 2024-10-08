const host = process.env.REACT_APP_SERVER_BASE_URL;
const loginRoute = `${host}/api/auth/login`;
const logoutRoute = `${host}/api/auth/logout`;
const registerRoute = `${host}/api/auth/register`;
const contactsRoute = `${host}/api/users/contacts`;
const setAvatarRoute = `${host}/api/users/setavatar`;
const messageRoute = `${host}/api/messages`;

const fetchAvatars = "https://api.multiavatar.com";

const routes = {
	contactsRoute,
	fetchAvatars,
	loginRoute,
	logoutRoute,
	messageRoute,
	registerRoute,
	setAvatarRoute,
};

export default routes;
