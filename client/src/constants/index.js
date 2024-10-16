export const toastOptions = {
	position: "bottom-right",
	autoClose: 8000,
	pauseOnHover: true,
	draggable: true,
	theme: "dark",
};

export const chatEvents = {
	send: "sendMessage",
	addUser: "addUser",
	received: "receiveMessage",
	connection: "connection",
	disconnect: "disconnect",
};

export const paths = {
	LOGIN: "/",
	REGISTER: "/register",
	PROFILE: "/profile",
	CHAT: "/chat",
};

export { actionTypes, AuthEvents, TokenType } from "./auth";