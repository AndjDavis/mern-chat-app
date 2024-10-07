const mongoose = require("mongoose");

const connectDB = async () => {
	try {
		const MONGODB_URI = process.env.MONGODB_URI || "";
		const conn = await mongoose.connect(MONGODB_URI);
		console.info(
			`Mongoose | MongoDB connection successful: ${conn.connection.host}`
		);
	} catch (err) {
		console.log("Mongoose | MongoDB connection error: ", err);
	}
};

module.exports = connectDB;
