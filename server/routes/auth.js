const express = require("express");

const router = express.Router();

const {
	login,
	logout,
	refreshToken,
	register,
} = require("../controllers/authController");
const {
	generateTokensAndAuthenticateUser,
} = require("../middleware/auth");

router.post("/login", login, generateTokensAndAuthenticateUser);
router.get("/logout/:id", logout);
router.get("/refresh-token", refreshToken, generateTokensAndAuthenticateUser);
router.post("/register", register, generateTokensAndAuthenticateUser);

module.exports = router;
