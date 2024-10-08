const { register, login, setAvatar } = require("../../controllers/usersController");

const router = require("express").Router();

router.post("/login", login);
router.post("/register", register);
router.put("/setavatar/:id", setAvatar);

module.exports = router;
