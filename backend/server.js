const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const connectDb = require("./utils/db");
const userRouter = require("./routes/user-router");
const { notFount, errorHandler } = require("./middleware/errorMiddleware");
const chatRouter = require("./routes/chat-route");
const { messageRouter } = require("./routes/message-route");
const path = require("path");
const app = express();
connectDb();
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);
app.use("/api/message", messageRouter);

// ---------------------Deployment----------------
const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("Api is Running");
  });
}


app.use(notFount);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`server started on port ${PORT}`));
const io = require("socket.io")(server, {
  cors: {
    pingTimeout: 60000,
    origin: "http://localhost:5173",
  },
});
io.on("connection", (socket) => {
  console.log("connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);

    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
  });

  socket.on("typing", ({ room, sender }) => {
    socket.in(room).emit("typing", sender);
  });

  socket.on("stop typing", ({ room, sender }) => {
    socket.in(room).emit("stop typing", sender);
  });

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;
    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) {
        return;
      }
      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
