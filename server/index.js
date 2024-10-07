const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const userRoutes = require("./routes/users/users");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", userRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.info(`Server listening on port ${PORT}`);
});
