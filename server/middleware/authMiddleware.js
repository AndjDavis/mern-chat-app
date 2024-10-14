const passport = require("passport");
const { generateAccessToken, generateRefreshToken } = require("../utils/token");

const requireAuth = passport.authenticate("jwt", {
	userProperty: "currentUser",
	session: false,
});

const generateTokensAndAuthenticateUser = async (req, res, next) => {
	try {
		const { user } = req;
		const userId = user._id.toString();

		const { token: access_token, expiration: token_expiration } =
			await generateAccessToken(userId);
		const authenticatedUser = user.toObject();
		const { token: refreshToken } = generateRefreshToken(userId);

		res.cookie("refresh_token", refreshToken, { httpOnly: true });
		res.json({
			success: true,
			access_token,
			token_expiration,
			user: authenticatedUser,
		});
	} catch (error) {
		next(error);
	}
};

module.exports = {
	generateTokensAndAuthenticateUser,
	requireAuth,
};
