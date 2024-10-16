const express = require("express");
const {
	getContacts,
	getMe,
	updateUser,
} = require("../controllers/usersController");
const { requireAuth } = require("../middleware/authMiddleware");

const router = express.Router();

// TODO: Make private routes.
router.get("/contacts/:id", getContacts);
router.get("/me", getMe);
router.put("/:id", updateUser);

module.exports = router;
