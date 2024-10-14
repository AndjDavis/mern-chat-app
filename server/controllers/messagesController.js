const Message = require("../model/Message");

const getMessages = async (req, res, next) => {
	try {
		const { id: author } = req.params;
		const { recipient } = req.query;

		if (!author || !recipient) {
			return res.status(400).json({
				message: "Missing params in the request",
				success: false,
			});
		}

		const messages = await Message.find({
			$or: [
				{ author: author, recipient: recipient },
				{ author: recipient, recipient: author },
			],
		}).sort({ updatedAt: 1 });

		return res.status(200).json({
			messages,
			success: true,
		});
	} catch (error) {
		next(error)
	}
};

const postMessage = async (req, res, next) => {
	try {
		const { author, recipient, message } = req.body;
		if (!author || !recipient || !message) {
			return res.status(400).json({
				message: "Missing fields in the request body",
				success: false,
			});
		}

		const newMsg = await Message.create({
			message: { text: message },
			recipient,
			author,
		});

		if (!newMsg) {
			return res.status(400).json({
				message: "Failed to add message to the database",
				success: false,
			});
		}

		return res.status(201).json({
			success: true,
			msg: newMsg,
		});
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getMessages: getMessages,
	postMessage: postMessage,
};
