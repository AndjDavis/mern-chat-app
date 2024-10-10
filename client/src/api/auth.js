import client from "./client";

import routes from "../utils/routes";

export const loginUser = async ({ username, password }) => {
	try {
		const { data } = await client.post(routes.loginUser, {
			username,
			password,
		});
		return data;
	} catch (error) {
		throw error;
	}
};

export const registerUser = async ({ email, password, username }) => {
	try {
		const { data } = await client.post(routes.registerRoute, {
			email,
			password,
			username,
		});

		return data;
	} catch (error) {
		console.log("Register User Error:", error);
		throw error;
	}
};