const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema(
	{
		message: {
			text: {
				type: String,
				required: true,
			},
		},
		recipient: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

MessageSchema.index({ author: 1, recipient: 1, updatedAt: 1 });
MessageSchema.index({ recipient: 1, author: 1, updatedAt: 1 });
MessageSchema.set("toJSON", {
	transform: function (doc, ret, options) {
		delete ret.__v;
		return ret;
	},
});

module.exports = mongoose.model("Message", MessageSchema);
