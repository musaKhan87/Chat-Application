const express = require("express");
const { registerUser, loginUser, allUsers } = require("../controllers/user-controller");
const { protect } = require("../middleware/authMiddleware");
const userRouter = express.Router();


userRouter.route("/").post(registerUser).get(protect,allUsers);

userRouter.route("/login").post(loginUser);


module.exports = userRouter;
