import client from "../client";
import routes from "../../constants/routes";

export const loginUser = async ({ username, password }) => {
	try {
		const {
			data: { user, success, ...token },
		} = await client.post(routes.loginRoute, {
			username,
			password,
		});

		return { user, token };
	} catch (error) {
		throw error;
	}
};

export const registerUser = async ({ email, password, username }) => {
	try {
		const {
			data: { user, success, ...token },
		} = await client.post(routes.registerRoute, {
			email,
			password,
			username,
		});

		return { user, token };
	} catch (error) {
		throw error;
	}
};

export const logoutUser = async () => {
	try {
		const { success } = await client.get(routes.logoutRoute);
		return { success };
	} catch (error) {
		throw error;
	}
};

export const getFreshTokens = async () => {
	try {
		const {
			data: { user, success, ...token },
		} = await client.get(routes.refreshTokenRoute);

		return { user, token };
	} catch (error) {
		console.log("getFreshTokens - error", error);
		throw error;
	}
};
