const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { accessChat, fetchChats, createGroupChat, renameGroup, addToGroup, removeFromGroup } = require("../controllers/chat-controller");

const chatRouter = express.Router();
chatRouter.route("/").get(protect, fetchChats).post(protect, accessChat);

chatRouter.route("/group").post(protect, createGroupChat);
chatRouter.route("/rename").put(protect, renameGroup);
chatRouter.route("/groupadd").put(protect, addToGroup);
chatRouter.route("/groupremove").put(protect, removeFromGroup);

module.exports = chatRouter;