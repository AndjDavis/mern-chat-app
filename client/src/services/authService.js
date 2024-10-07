import axios from "axios";
import routes from "../utils/routes";

const handleBadResponse = (error) => {
	const errorResponse = {
		status: error?.status,
		data: {
			message: "An unexpected error occurred. Please try again later.",
			success: false,
		}
	};

	if (error?.response && error.response?.data) {
		errorResponse.data.message = error.response.data.message;
		errorResponse.data.success = error.response.data.success;
	}

	return errorResponse;
};

export const loginUser = async ({ username, password }) => {
	try {
		const response = await axios.post(routes.loginRoute, {
			username,
			password,
		});

		return response;
	} catch (error) {
		console.log("Login User Error:", error);
		return handleBadResponse(error);
	}
};

export const registerNewUser = async ({ email, password, username }) => {
	try {
		const response = await axios.post(routes.registerRoute, {
			email,
			password,
			username,
		});

		return response;
	} catch (error) {
		console.log("Register User Error:", error);
		return handleBadResponse(error);
	}
};
