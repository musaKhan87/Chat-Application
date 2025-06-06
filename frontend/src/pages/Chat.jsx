import { Box } from "@chakra-ui/react";
import { useChat } from "../context/ChatContext";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import MyChats from "../components/MyChats";
import ChatBox from "../components/ChatBox";
import { useState } from "react";
const Chat = () => {
  const { user } = useChat();
  const [fetchAgain, setFetchAgain] = useState();
  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}

      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="91.5vh"
        p="10px"
      >
        {user && <MyChats fetchAgain={ fetchAgain} />}
        {user && <ChatBox fetchAgain={fetchAgain } setFetchAgain={setFetchAgain} />}
      </Box>
    </div>
  );
};

export default Chat;
