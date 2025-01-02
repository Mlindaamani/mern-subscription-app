const express = require("express");
const messageController = require("../controllers/messageController");
const router = express.Router();

router.get("/", messageController.getAllMessageFromMongoDbDatabase);
router.post("/create-message", messageController.createMessageContent);

module.exports = router;
