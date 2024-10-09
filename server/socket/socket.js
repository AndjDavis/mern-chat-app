const socket = require("socket.io");

const chatEvents = {
	send: "sendMessage",
	addUser: "addUser",
	received: "receiveMessage",
	connection: "connection",
	disconnect: "disconnect",
};

const FRONTEND_BASE_URL = process.env.FRONTEND_BASE_URL;
const socketCorsConfig = {
	origin: FRONTEND_BASE_URL,
	credentials: true,
};

global.onlineUsers = new Map();

const initializeSocket = (server) => {
	const io = socket(server, {
		cors: socketCorsConfig,
	});

	io.on(chatEvents.connection, (socket) => {
		global.chatSocket = socket;
		socket.on(chatEvents.addUser, (userId) => {
			global.onlineUsers.set(userId, socket.id);
		});

		socket.on(chatEvents.send, (data) => {
			const sendUserSocket = global.onlineUsers.get(data.to);
			if (sendUserSocket) {
				const { id, message } = data;
				socket.to(sendUserSocket).emit(chatEvents.received, { id, message });
			}
		});

		socket.on(chatEvents.disconnect, (userId) => {
			global.onlineUsers.delete(userId);
		});
	});
};

module.exports = initializeSocket;
