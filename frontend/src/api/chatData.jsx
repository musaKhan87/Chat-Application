import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});


export const getRegisterData = (name,email,password,pic,config) => {
  return api.post("/user", { name, email, password, pic }, config);
}

export const getLoginData = ( email, password, config) => {
  return api.post("/user/login", { email, password }, config);
};

export const searchUser = (search, config) => {
  return api.get(`/user?search=${search}`, config);
}

export const getAccessChat = (userId, config) => {
  return api.post("/chat", { userId }, config);
};

export const fetchChat = (config) => {
  return api.get("/chat", config);
}

export const createGroup = (groupChatName,selectedUser,config) => {
  return api.post("/chat/group", {
    name: groupChatName,
    users: JSON.stringify(selectedUser.map((u) => u._id)),
  }, config);
}

export const renameGroup = (selectedChat,groupChatName,config) => {
  return api.put("/chat/rename", {
    chatId: selectedChat._id,
    chatName: groupChatName
  }, config);
}

export const addUser = (selectedChat, user1, config) => {
  return api.put(
    "/chat/groupadd",
    {
      chatId: selectedChat._id,
      userId:user1._id,
    },
    config
  );
};

export const removeUser = (selectedChat, user1, config) => {
  return api.put(
    "/chat/groupremove",
    {
      chatId: selectedChat._id,
      userId: user1._id,
    },
    config
  );
};

export const sendMessages = (newMessage, selectedChat, config) => {
  return api.post("/message", {
    content: newMessage,
    chatId: selectedChat._id,
  }, config)
};

export const getAllMessage = ( selectedChat, config) => {
  return api.get(
    `/message/${selectedChat._id}`,
    config
  );
};