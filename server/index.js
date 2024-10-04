const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const connectDB = require("./config/db");
const userRoutes = require("./routes/users/index");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", userRoutes);

connectDB();

const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
    console.info(`Server listening on port ${PORT}`);
});