import axios from "axios";

import routes from "../utils/routes";
import { handleBadResponse } from "./helpers";
import { formatChatMessage, formatMessages } from "../utils/lib";

export const fetchMessages = async ({ recipientId, authorId }) => {
	try {
		const url = `${routes.messageRoute}/${authorId}`;
		const { data, status } = await axios.get(url, {
			params: { recipient: recipientId },
		});

		const updatedData = { ...data };
		if (data?.messages && data?.success) {
			updatedData.messages = formatMessages([...data.messages], authorId);
		}
		return {
			data: updatedData,
			status,
		};
	} catch (error) {
		return handleBadResponse(error);
	}
};

export const postMessage = async ({ recipientId, authorId, message }) => {
	try {
		const { data, status } = await axios.post(routes.messageRoute, {
			author: authorId,
			recipient: recipientId,
			message,
		});

		const updatedData = { ...data };
		if (data?.msg && data?.success) {
			updatedData.msg = formatChatMessage(data.msg, authorId);
		}
		return {
			data: updatedData,
			status,
		};
	} catch (error) {
		return handleBadResponse(error);
	}
};
