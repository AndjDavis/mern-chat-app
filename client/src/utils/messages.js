/**
 * Formats a single chat message.
 *
 * @param {Object} message - The message object.
 * @param {string} userId - The ID of the current user.
 * @returns {Object} The formatted message object.
 */
export const formatChatMessage = ({ message, _id, author }, authorId) => ({
	message: message.text,
	id: _id.toString(),
	fromSelf: !!(authorId === author),
});

/**
 * Formats a list of chat messages.
 *
 * @param {Array} messages - The array of message objects.
 * @param {string} userId - The ID of the current user.
 * @returns {Array} The array of formatted message objects.
 */
export const formatMessages = (messages, authorId) =>
	messages.map((msg) => formatChatMessage(msg, authorId));
