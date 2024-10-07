const bcrypt = require("bcrypt");
const User = require("../model/User");

const invalidCredentialsResponse = (res) =>
	res.status(401).json({
		message: "Incorrect Username or Password",
		success: false,
	});

const serverErrorResponse = (res, error, route) => {
	console.log(`Server error on ${route}: ${error}`);
	return res.status(500).json({
		message: "Server error. Please try again later.",
		success: false,
	});
};

const loginUser = async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ username });
		if (!user) {
			return invalidCredentialsResponse(res);
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return invalidCredentialsResponse(res);
		}

		const { password: _, ...userWithoutPassword } = user.toObject();
		return res.status(200).json({ success: true, user: userWithoutPassword });
	} catch (error) {
		return serverErrorResponse(res, error, "login");
	}
};

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
		const newUser = await User.create({
			username,
			email,
			password: hashedPassword,
		});

		// Exclude password before sending the user object
		const { password: _, ...userWithoutPassword } = newUser.toObject();

		return res.status(201).json({
			success: true,
			message: "User created successfully",
			user: userWithoutPassword,
		});
	} catch (error) {
		return serverErrorResponse(res, error, "register");
	}
};

module.exports.register = registerNewUser;
module.exports.login = loginUser;
