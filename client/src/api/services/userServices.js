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

export const updateUserAvatarImage = async (selectedAvatar, userId) => {
	try {
		const url = `${routes.setAvatarRoute}/${userId}`;
		const { data } = await client.put(url, {
			image: selectedAvatar,
		});
		return data;
	} catch (error) {
		throw error;
	}
};

export const updateUser = async (userId, userUpdates) => {
	try {
		const url = `${routes.setAvatarRoute}/${userId}`;
		const { data } = await client.put(url, {
			userUpdates,
		});
		return data;
	} catch (error) {
		throw error;
	}
};
