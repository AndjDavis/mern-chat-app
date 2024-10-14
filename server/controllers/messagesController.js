const asyncHandler = require("express-async-handler");
const Message = require("../model/Message");

// TODO: Make private
// @desc    Get messages
// @route   GET /api/messages/:id
// @access  Private
const getMessages = asyncHandler(async (req, res) => {
	const { id: author } = req.params;
	const { recipient } = req.query;

	if (!author || !recipient) {
		res.status(400);
		throw new Error("Missing params in the request");
	}

	const messages = await Message.find({
		$or: [
			{ author: author, recipient: recipient },
			{ author: recipient, recipient: author },
		],
	}).sort({ updatedAt: 1 });

	res.status(200).json({
		messages,
		success: true,
	});
});

// @desc    Post new message
// @route   POST /api/messages
// @access  Private
const postMessage = asyncHandler(async (req, res) => {
	const { author, recipient, message } = req.body;

	let missingFields = [];
	if (!author) missingFields.push("author");
	if (!recipient) missingFields.push("recipient");
	if (!message) missingFields.push("message");
	if (missingFields.length > 0) {
		const fields = missingFields.join(", ");
		res.status(400);
		throw new Error(`Please add these missing field(s) ${fields}`);
	}

	const newMsg = await Message.create({
		message: { text: message },
		recipient,
		author,
	});

	res.status(201).json({
		success: true,
		msg: newMsg,
	});
});

module.exports = {
	getMessages: getMessages,
	postMessage: postMessage,
};
