import client from "../client";
import routes from "../../constants/routes";

export const loginUser = async ({ username, password }) => {
	try {
		const { data } = await client.post(routes.loginRoute, {
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
		throw error;
	}
};

export const logUserOut = async (userId) => {
	try {
		const { data } = await client.get(`${routes.logoutRoute}/${userId}`);
		return data;
	} catch (error) {
		throw error;
	}
};
