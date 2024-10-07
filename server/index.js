const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const userRoutes = require("./routes/users/users");

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
app.use("/api/auth", userRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.info(`Server listening on port ${PORT}`);
});
