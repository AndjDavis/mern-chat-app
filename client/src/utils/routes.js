const host = process.env.HOST;
console.log({ host });
const allUsersRoute = `${host}/api/auth/allusers`;
const loginRoute = `${host}/api/auth/login`;
const logoutRoute = `${host}/api/auth/logout`;
const recieveMessageRoute = `${host}/api/messages/getmsg`;
const registerRoute = `${host}/api/auth/register`;
const sendMessageRoute = `${host}/api/messages/addmsg`;
const setAvatarRoute = `${host}/api/auth/setavatar`;

const routes = {
	allUsersRoute,
	loginRoute,
	logoutRoute,
	recieveMessageRoute,
	registerRoute,
	sendMessageRoute,
	setAvatarRoute,
};

export default routes;
