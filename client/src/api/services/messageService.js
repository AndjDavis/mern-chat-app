import client from "../client";
import routes from "../../constants/routes";
import {
	transformGetMessagesResponse,
	transformPostMessageResponse,
} from "./transformers";

export const fetchMessages = async ({ recipientId, authorId }) => {
	try {
		const url = `${routes.messageRoute}/${authorId}`;
		const { data } = await client.get(url, {
			params: { recipient: recipientId },
			transformResponse: [transformGetMessagesResponse(authorId)],
		});

		return data;
	} catch (error) {
		throw error;
	}
};

export const postMessage = async ({ recipientId, authorId, message }) => {
	try {
		const { data } = await client.post(
			routes.messageRoute,
			{
				author: authorId,
				recipient: recipientId,
				message,
			},
			{
				transformResponse: [transformPostMessageResponse(authorId)],
			}
		);

		return data;
	} catch (error) {
		throw error;
	}
};
