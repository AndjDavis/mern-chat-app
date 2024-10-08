const host = process.env.REACT_APP_SERVER_BASE_URL;
const allUsersRoute = `${host}/api/auth/allusers`;
const loginRoute = `${host}/api/auth/login`;
const logoutRoute = `${host}/api/auth/logout`;
const recieveMessageRoute = `${host}/api/messages/getmsg`;
const registerRoute = `${host}/api/auth/register`;
const sendMessageRoute = `${host}/api/messages/addmsg`;
const setAvatarRoute = `${host}/api/auth/setavatar`;
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
