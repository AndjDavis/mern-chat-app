const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const connectDB = require("./config/db");

require("dotenv").config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
    console.info(`Server listening on port ${PORT}`);
});