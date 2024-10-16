import client from "../client";
import routes from "../../constants/routes";

export const getUserContacts = async (userId) => {
	try {
		const { data } = await client.get(`${routes.contactsRoute}/${userId}`);
		return data;
	} catch (error) {
		throw error;
	}
};

export const updateUser = async (userId, userUpdates) => {
	try {
		const url = `${routes.updateUserRoute}/${userId}`;
		const {
			data: { user, success, ...token },
		} = await client.put(url, {
			userUpdates,
		});
		return { user, token };
	} catch (error) {
		throw error;
	}
};
