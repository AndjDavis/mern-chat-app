const { serverErrorResponse } = require("./middleware");
const User = require("../model/User");

const getAllUsers = async (req, res, next) => {
	try {
		const users = await User.find({ _id: { $ne: req.params.id } }).select([
			"email",
			"username",
			"avatarImage",
			"_id",
		]);

		return res.status(200).json({
			success: true,
			message: "Successfully fetched all users...",
			users,
		});
	} catch (error) {
		return serverErrorResponse(res, error, "getAllUsers", 400);
	}
};

const setAvatar = async (req, res, next) => {
	try {
		const { image: avatarImage, id: userId } = req.body;

		if (!userId || !avatarImage) {
			return res.status(400).json({
				message: "Missing user ID or avatar image",
				success: false,
			});
		}

		const userData = await User.findByIdAndUpdate(
			userId,
			{
				avatarImage,
			},
			{ new: true }
		);

		if (!userData) {
			return res
				.status(404)
				.json({ message: "User not found", success: false });
		}

		const avatarIsSet = userData?.isAvatarImageSet() || false;

		if (!avatarIsSet) {
			console.log("Failed to set avatarImage for user:", userId); // Log the error
			return res.status(500).json({
				message: "Failed to update avatar image.",
				success: false,
			});
		}

		return res.status(200).json({
			success: true,
			message: "Successfully set a new avatar",
			isSet: userData.isAvatarImageSet(),
			image: userData.avatarImage,
		});
	} catch (error) {
		return serverErrorResponse(res, error, "setAvatar");
	}
};

module.exports = {
	setAvatar: setAvatar,
	getUsers: getAllUsers,
};
