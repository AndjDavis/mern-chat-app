const asyncHandler = require("express-async-handler");
const User = require("../model/User");

// @desc    Get user contacts
// @route   POST /api/users/contacts
// @access  Private
const getContacts = asyncHandler(async (req, res) => {
	const { id: userId } = req.params;
	if (!userId) {
		res.status(400);
		throw new Error("Missing id param");
	}

	const contacts = await User.find({ _id: { $ne: userId } }).select([
		"email",
		"username",
		"avatarImage",
		"_id",
	]);

	res.status(200).json({
		success: true,
		contacts,
	});
});

// @desc    update user
// @route   PUT /api/users/contacts
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const { userUpdates } = req.body;

	if (!id) {
		res.status(400);
		throw new Error("Missing Id param");
	}
	if (!userUpdates) {
		res.status(400);
		throw new Error("Missing updates to user");
	}

	const user = await User.findByIdAndUpdate(id, userUpdates, {
		new: true,
	});

	if (!user) {
		res.status(404);
		throw new Error("User not found");
	}

	res.status(200).json({
		success: true,
		message: "Successfully updated user",
		user: user.toJSON(),
	});
});

// @desc    get user
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
	res.status(200).json({ success: true, user: req.user });
});

module.exports = {
	getContacts: getContacts,
	getMe: getMe,
	updateUser: updateUser,
};
