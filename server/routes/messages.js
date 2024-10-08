const express = require("express");
const {
	postMessage,
	getMessages,
} = require("../controllers/messageController");

const router = express.Router();

router.post("/add-message", postMessage);
router.get("/get-messages", getMessages);

module.exports = router;
