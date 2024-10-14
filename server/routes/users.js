const express = require("express");
const { getContacts, updateUser } = require("../controllers/usersController");

const router = express.Router();

// TODO: Make private routes.
router.get("/contacts/:id", getContacts);
router.put("/:id", updateUser);

module.exports = router;
