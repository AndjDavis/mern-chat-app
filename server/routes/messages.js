const express = require("express");
const {
	postMessage,
	getMessages,
} = require("../controllers/messagesController");

const router = express.Router();

router.post("/", postMessage);
router.get("/", getMessages);

module.exports = router;
