const express = require("express");
const {
	postMessage,
	getMessages,
} = require("../controllers/messagesController");

const router = express.Router();

// TODO: Make private route
router.post("/", postMessage);
router.get("/:id", getMessages);

module.exports = router;
