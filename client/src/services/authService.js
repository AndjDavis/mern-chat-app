import axios from "axios";
import routes from "../utils/routes";

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
		const errorResponse = {
			success: false,
			status: error?.status || error?.response?.status,
			message: "An unexpected error occurred. Please try again later.",
		};

		if (error?.response && error.response?.message) {
			errorResponse.message = error.response.message;
		}
		return errorResponse;
	}
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
		const errorResponse = {
			success: false,
			status: error?.status || error?.response?.status,
			message: "An unexpected error occurred. Please try again later.",
		};

		if (error?.response && error.response?.message) {
			errorResponse.message = error.response.message;
		}
		return errorResponse;
	}
};
