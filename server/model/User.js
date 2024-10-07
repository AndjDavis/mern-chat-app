const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const utils = require("./utils");

const UserSchema = new Schema({
	username: {
		type: String,
		required: true,
		min: 4,
		max: 20,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		min: 8,
		max: 20,
	},
	email: {
		type: String,
		required: true,
		max: 50,
		unique: true,
	},
	avatarImage: {
		type: String,
		default: "",
	},
});

UserSchema.methods.isAvatarImageSet = utils.isAvatarImageSet;

module.exports = mongoose.model("User", UserSchema);
