const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");

const app = express();
const socket = require("socket.io");

const FRONTEND_BASE_URL = process.env.FRONTEND_BASE_URL;
const corOptions = {
	origin: FRONTEND_BASE_URL,
	allowedHeaders: ["content-type"],
};
app.use(cors(corOptions));
app.use(express.json());

connectDB();

// Log requests for debugging
app.use((req, res, next) => {
	console.log(
		`${req.method} request to ${req.url} from ${req.headers.origin} with body:`,
		req.body
	);
	next();
});

// routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);
app.get("/ping", (_req, res) => {
	return res.json({ message: "Ping Successfull" });
});

const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
	console.info(`Server listening on port ${PORT}`);
});

const io = socket(server, {
	cors: {
		origin: FRONTEND_BASE_URL,
		credentials: true,
	},
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
	global.chatSocket = socket;
	socket.on("add-user", (userId) => {
		onlineUsers.set(userId, socket.id);
	});

	socket.on("send-msg", (data) => {
		const sendUserSocket = onlineUsers.get(data.to);
		if (sendUserSocket) {
			socket.to(sendUserSocket).emit("msg-recieve", data.msg);
		}
	});
});
