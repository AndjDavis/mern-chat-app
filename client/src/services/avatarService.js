import axios from "axios";
import { Buffer } from "buffer";

import routes from "../utils/routes";
import { handleBadResponse } from "./helpers";


export const setProfileAvatar = async (selectedAvatar, userId) => {
	try {
		const url = `${routes.setAvatarRoute}/${userId}`;
		const response = await axios.put(url, {
			image: selectedAvatar,
		});
		return response;
	} catch (error) {
		console.log("Set Profile Avatar Error: ", error);
		return handleBadResponse(error);
	}
};

export const fetchAvatarsList = async () => {
	const promises = Array.from({ length: 4 }, () => fetchRandomAvatar());
	const responses = await Promise.all(promises);
	const data = responses.map(({ data }) => {
		const buffer = new Buffer(data);
		return buffer.toString("base64");
	});

	return data;
};

export const fetchRandomAvatar = () => {
	try {
		const avatarSequence = Math.round(Math.random() * 1000);
		return axios.get(`${routes.fetchAvatars}/${avatarSequence}`);
	} catch (error) {
		console.log("Error fetching the avatars....", error);
	}
};
