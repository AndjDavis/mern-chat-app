import axios from "axios";
import routes from "../utils/routes";
import { handleBadResponse } from "./helpers";

// Post?
export const fetchMessages = async ({ userId, chatId }) => {
	try {
		const response = await axios.get(routes.recieveMessageRoute, {
			from: userId,
			to: chatId,
		});
		return response;
	} catch (error) {
		return handleBadResponse(error);
	}
};

export const postMessage = async ({ userId, chatId, message }) => {
	try {
		axios.post(routes.sendMessageRoute, {
			from: userId,
			to: chatId,
			message: message,
		});
	} catch (error) {
		return handleBadResponse(error);
	}
};
