const express = require("express");
const router = express.Router();

const { requireAuth } = require("../middleware/authMiddleware");
const {
	generateTokensAndAuthenticateUser,
} = require("../middleware/authMiddleware");
const {
	login,
	logout,
	refreshToken,
	register,
} = require("../controllers/authController");

router.post("/login", login, generateTokensAndAuthenticateUser);
router.get("/logout/:id", requireAuth, logout);
router.get("/refresh-token", refreshToken, generateTokensAndAuthenticateUser);
router.post("/register", register, generateTokensAndAuthenticateUser);

module.exports = router;
