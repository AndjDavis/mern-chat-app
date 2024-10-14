const bcrypt = require("bcrypt");
const User = require("../model/User");

const loginUser = async (req, res, next) => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ username });

		if (!user || !(await bcrypt.compare(password, user.password))) {
			return res.status(401).json({
				message: "Incorrect Username or Password",
				success: false,
			});
		}

		res.status(200);
		req.user = user;
		next();
	} catch (error) {
		next(error);
	}
};

const registerNewUser = async (req, res, next) => {
	try {
		const { username, email } = req.body;
		const existingFields = await User.findOne({
			$or: [{ username }, { email }],
		});

		if (existingFields) {
			return res.status(409).json({
				message: "Email or username already in use...",
				success: false,
			});
		}

		const hashedPassword = await bcrypt.hash(req.body.password, 10);
		const newUser = await User.create({
			username,
			email,
			password: hashedPassword,
		});

		res.status(201);
		req.user = newUser;
		next();
	} catch (error) {
		next(error);
	}
};

const logout = async (req, res, next) => {
	try {
		if (!req.params.id) {
			return res
				.status(400)
				.json({ message: "User id is required", success: false });
		}

		onlineUsers.delete(req.params.id);
		res.cookie("refresh_token", "", { httpOnly: true });
		res.status(200).json({
			success: true,
			message: "User successfully logged out...",
		});
	} catch (error) {
		next(error);
	}
};

const refreshToken = async (req, res, next) => {
	try {
		next();
		const tokenEncrypted = req.cookies.refresh_token;
		const userId = await parseTokenAndGetUserId(tokenEncrypted);
		const user = await User.findById(userId);
		req.user = user;
		next();
	} catch (error) {
		next(error);
	}
};

module.exports = {
	login: loginUser,
	logout: logout,
	refreshToken: refreshToken,
	register: registerNewUser,
};
