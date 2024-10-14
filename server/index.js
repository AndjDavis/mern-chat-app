const express = require("express");
const cors = require("cors");

const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const initializeSocket = require("./socket/socket");

connectDB();
const app = express();

const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");

const FRONTEND_BASE_URL = process.env.FRONTEND_BASE_URL;
const corOptions = {
	origin: FRONTEND_BASE_URL,
	allowedHeaders: ["content-type"],
};

app.use(cors(corOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);
app.use(errorHandler);

const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
	console.info(`Server listening on port ${PORT}`);
	initializeSocket(server);
});
