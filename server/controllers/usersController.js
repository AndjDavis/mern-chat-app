const { serverErrorResponse } = require("./middleware");
const User = require("../model/User");

const getContacts = async (req, res, next) => {
	try {
		const contacts = await User.find({ _id: { $ne: req.params.id } }).select([
			"email",
			"username",
			"avatarImage",
			"_id",
		]);

		return res.status(200).json({
			success: true,
			contacts,
		});
	} catch (error) {
		return serverErrorResponse(res, error, "getContacts", 400);
	}
};

const updateUser = async (req, res, next) => {
	const { id } = req.params;
	const { userUpdates } = req.body;
	try {
		if (!id || !userUpdates) {
			return res.status(400).json({
				message: "Missing user ID or body",
				success: false,
			});
		}

		const updatedUser = await User.findByIdAndUpdate(id, userUpdates, {
			new: true,
		});

		if (!updatedUser) {
			return res
				.status(404)
				.json({ message: "User not found", success: false });
		}

		return res.status(200).json({
			success: true,
			message: "Successfully updated user",
			user: updatedUser,
		});
	} catch (error) {
		return serverErrorResponse(res, error, "updateUser");
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
				message: "Failed to update user's avatar image.",
				success: false,
			});
		}

		return res.status(200).json({
			success: true,
			message: "Successfully set a new avatar",
			user: userData,
			isSet: userData.isAvatarImageSet(),
			image: userData.avatarImage,
		});
	} catch (error) {
		return serverErrorResponse(res, error, "setAvatar");
	}
};

module.exports = {
	setAvatar: setAvatar,
	getContacts: getContacts,
	updateUser: updateUser,
};
