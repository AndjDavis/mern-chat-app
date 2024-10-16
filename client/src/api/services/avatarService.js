import axios from "axios";
import { Buffer } from "buffer";
import { errorHandler } from "../errorHandler";

const avatarUrl = "https://api.multiavatar.com";
const avatarClient = axios.create({ baseURL: avatarUrl });

avatarClient.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		// Handle errors centrally
		return Promise.reject(errorHandler.handle(error));
	}
);

export const getRandomMultiAvatars = async () => {
	const promises = Array.from({ length: 4 }, () => fetchRandomAvatar());
	const responses = await Promise.all(promises);

	// convert each avatar's data to base64 format
	const data = responses.map(({ data }) => {
		const buffer = new Buffer(data);
		return buffer.toString("base64");
	});

	return data;
};

export const fetchRandomAvatar = () => {
	const avatarSequence = Math.round(Math.random() * 1000);
	return avatarClient.get(`/${avatarSequence}`);
};
