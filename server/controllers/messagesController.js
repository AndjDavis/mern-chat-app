const Message = require("../model/Message");
const { serverErrorResponse } = require("./middleware");

const formatMessages = (messages, from) =>
	messages.map((msg) => ({
		fromSelf: msg.sender.toString() === from.toString(),
		message: msg.message.text,
	}));

const getMessages = async (req, res, next) => {
	try {
		const { from, to } = req.body;
		if (!from || !to) {
			return res.status(400).json({
				message: "Missing fields in the request body",
				success: false,
			});
		}

		const messages = await Message.find({
			users: {
				$all: [from, to],
			},
		}).sort({ updatedAt: 1 });

		const projectedMessages = formatMessages(messages, from);

		return res.status(200).json({
			messages: projectedMessages,
			success: true,
			message: "Successfully fetched messages",
		});
	} catch (error) {
		return serverErrorResponse(res, error, "getMessages", 400);
	}
};

const postMessage = async (req, res, next) => {
	try {
		const { from, to, message } = req.body;
		if (!from || !to || !message) {
			return res.status(400).json({
				message: "Missing fields in the request body",
				success: false,
			});
		}

		const data = await Message.create({
			message: { text: message },
			users: [from, to],
			sender: from,
		});

		if (!data) {
			return res.status(400).json({
				message: "Failed to add message to the database",
				success: false,
			});
		}

		const projectedMessage = formatMessages([data], from);
		const newMessage = projectedMessage[0];

		return res.status(201).json({
			message: "Message added successfully.",
			success: true,
			msg: newMessage,
		});
	} catch (error) {
		return serverErrorResponse(res, error, "postMessage", 400);
	}
};

module.exports = {
	getMessages: getMessages,
	postMessage: postMessage,
};
