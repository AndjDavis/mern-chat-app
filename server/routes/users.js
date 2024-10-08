const express = require("express")
const {
    getUsers,
	setAvatar,
} = require("../controllers/usersController");

const router = express.Router();

router.get("/all-users/:id", getUsers);
router.put("/setavatar/:id", setAvatar);

module.exports = router;
