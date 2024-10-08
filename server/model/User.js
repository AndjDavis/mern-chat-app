const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const utils = require("./utils");

const UserSchema = new Schema(
	{
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
			select: false,
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
	},
	{
		timestamps: true,
	}
);

UserSchema.methods.isAvatarImageSet = utils.isAvatarImageSet;
UserSchema.set("toJSON", {
	transform: function (doc, ret, options) {
		delete ret.password; // Remove password field
		return ret;
	},
});

module.exports = mongoose.model("User", UserSchema);
