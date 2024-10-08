const express = require("express")
const {
    getContacts,
	setAvatar,
} = require("../controllers/usersController");

const router = express.Router();

router.get("/contacts/:id", getContacts);
router.put("/setavatar/:id", setAvatar);

module.exports = router;
