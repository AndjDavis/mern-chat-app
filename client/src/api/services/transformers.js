import { formatChatMessage, formatMessages } from "../../utils";

export const transformGetMessagesResponse = (authorId) => (responseData) => {
	const data = JSON.parse(responseData);
	if (data?.success) {
		data.messages = formatMessages(data.messages, authorId);
	}
	return data;
};

export const transformPostMessageResponse = (authorId) => (responseData) => {
	const data = JSON.parse(responseData);
	if (data?.success) {
		data.msg = formatChatMessage(data.msg, authorId);
	}
	return data;
};
