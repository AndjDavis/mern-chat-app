const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const User = require("../model/User");
const { TokenType } = require("../constants/tokens");
const { parseTokenAndGetUserId } = require("../utils/token");
// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res, next) => {
	const { username, password } = req.body;
	if (!username || !password) {
		res.status(500);
		throw new Error("Missing credentials");
	}

	const user = await User.findOne({ username });

	if (!user || !(await bcrypt.compare(password, user.password))) {
		res.status(400);
		throw new Error("Invalid credentials");
	}

	res.status(200);
	req.user = user;
	next();
});

// @desc    Log user out
// @route   GET /api/auth/logout/:id
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
	// TODO: This should be part of protected middleware.
	const refreshToken = req.cookies[TokenType.REFRESH_TOKEN];
	if (!refreshToken) {
		res.status(400);
		throw new Error("Refresh token is missing");
	}

	// Verify and decode the refresh token
	const tokenEncrypted = req.cookies[TokenType.REFRESH_TOKEN];
	const userId = await parseTokenAndGetUserId(tokenEncrypted);

	onlineUsers.delete(userId);
	res.cookie(TokenType.REFRESH_TOKEN, "", { httpOnly: true });

	res.status(200).json({
		success: true,
		message: "User successfully logged out...",
	});
});

// @desc    Refresh token
// @route   GET /api/auth/refresh-token
// @access  Public
const refreshToken = asyncHandler(async (req, res, next) => {
	const tokenEncrypted = req.cookies[TokenType.REFRESH_TOKEN];
	if (!tokenEncrypted) {
		res.status(401);
		throw new Error("Refresh token is missing");
	}

	const userId = await parseTokenAndGetUserId(tokenEncrypted);
	if (!userId) {
		res.status(401)
		throw new Error("Invalid refresh token")
	}

	const user = await User.findById(userId);
	if (!user) {
		res.status(401)
		throw new Error("User not found")
	}

	res.status(200);
	req.user = user;
	next();
});

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res, next) => {
	const { email, password, username } = req.body;
	if (!email || !password || !username) {
		res.status(500);
		throw new Error("Please add all fields");
	}

	const userExists = await User.findOne({
		$or: [{ username }, { email }],
	});

	if (userExists) {
		res.status(400);
		throw new Error("User already exists");
	}

	const hashedPassword = await bcrypt.hash(req.body.password, 10);
	const user = await User.create({
		username,
		email,
		password: hashedPassword,
	});

	if (!user) {
		res.status(400);
		throw new Error("Invalid user data");
	}

	res.status(201);
	req.user = user;
	next();
});

module.exports = {
	login: loginUser,
	logout: logoutUser,
	refreshToken: refreshToken,
	register: registerUser,
};
