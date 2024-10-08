const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");

const app = express();

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

const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.info(`Server listening on port ${PORT}`);
});
