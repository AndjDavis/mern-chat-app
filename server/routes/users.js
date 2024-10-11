const express = require("express");
const {
	getContacts,
	setAvatar,
	updateUser,
} = require("../controllers/usersController");

const router = express.Router();

router.get("/contacts/:id", getContacts);
router.put("/setavatar/:id", setAvatar);
router.put("/:id", updateUser);

module.exports = router;
