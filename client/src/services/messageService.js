import axios from "axios";
import routes from "../utils/routes";
import { handleBadResponse } from "./helpers";

export const fetchMessages = async ({ sentTo, from }) => {
	try {
		const response = await axios.get(routes.messageRoute, {
			params: { from, to: sentTo },
		});
		return response;
	} catch (error) {
		return handleBadResponse(error);
	}
};

export const postMessage = async ({ sendTo, from, message }) => {
	try {
		return await axios.post(routes.messageRoute, {
			from: from,
			to: sendTo,
			message,
		});
	} catch (error) {
		return handleBadResponse(error);
	}
};
