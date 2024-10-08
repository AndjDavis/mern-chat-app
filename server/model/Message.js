const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema(
	{
		message: {
			text: { type: String, required: true },
		},
		users: Array,
		sender: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Message", MessageSchema);
