const express = require("express");

const router = express.Router();
const { register, login, logout } = require("../controllers/authController");

router.post("/login", login);
router.get("/logout/:id", logout);
router.post("/register", register);

module.exports = router;
