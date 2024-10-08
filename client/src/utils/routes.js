const host = process.env.REACT_APP_SERVER_BASE_URL;
const loginRoute = `${host}/api/auth/login`;
const logoutRoute = `${host}/api/auth/logout`;
const registerRoute = `${host}/api/auth/register`;
const allUsersRoute = `${host}/api/users/all-users`;
const setAvatarRoute = `${host}/api/users/setavatar`;
const recieveMessageRoute = `${host}/api/messages/getmsg`;
const sendMessageRoute = `${host}/api/messages/addmsg`;

const fetchAvatars = "https://api.multiavatar.com";

const routes = {
	allUsersRoute,
	loginRoute,
	logoutRoute,
	recieveMessageRoute,
	registerRoute,
	sendMessageRoute,
	setAvatarRoute,
	fetchAvatars,
};

export default routes;
