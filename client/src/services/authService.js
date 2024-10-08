import axios from "axios";
import routes from "../utils/routes";
import { handleBadResponse } from "./helpers";

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
