const bcrypt = require("bcrypt");
const User = require("../model/User");

const registerNewUser = async (req, res, next) => {
	try {
		const { username, email } = req.body;
		const existingUser = await User.findOne({
			$or: [{ username }, { email }],
		});

		if (existingUser) {
			const existingUserMessage = "Email or username already in use...";
			return res
				.status(409)
				.json({ message: existingUserMessage, success: false });
		}

		const hashedPassword = await bcrypt.hash(req.body.password, 10);
		const { password, ...user } = await User.create({
			username,
			email,
			password: hashedPassword,
		});

		return res.status(201).json({
			success: false,
			message: "User created successfully",
			user: user,
		});
	} catch (error) {
		return res.status(500).json({
			message: "Server error. Please try again later.",
			success: false,
		});
	}
};

module.exports.register = registerNewUser;
