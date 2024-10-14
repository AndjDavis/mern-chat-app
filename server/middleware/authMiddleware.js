const passport = require("passport");
const asyncHandler = require("express-async-handler");
const { generateAccessToken, generateRefreshToken } = require("../utils/token");

const requireAuth = passport.authenticate("jwt", {
	userProperty: "currentUser",
	session: false,
});

const generateTokensAndAuthenticateUser = asyncHandler(async (req, res) => {
	const { user } = req;
	const userId = user._id.toString();

	const { token: access_token, expiration: token_expiration } =
		generateAccessToken(userId);
	const { token: refreshToken } = generateRefreshToken(userId);

	const authenticatedUser = user.toJSON();
	res.cookie("refresh_token", refreshToken, { httpOnly: true });
	res.json({
		success: true,
		access_token,
		token_expiration,
		user: authenticatedUser,
	});
});

module.exports = {
	generateTokensAndAuthenticateUser,
	requireAuth,
};
