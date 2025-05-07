import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  useToast,
  FormControl,
  Input,
  Spinner,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import { useChat } from "../../context/ChatContext";
import { createGroup, searchUser } from "../../api/chatData";
import UserListItem from "../UserAvatar/UserListItem";
import UserBadgeItem from "../UserAvatar/UserBadgeItem";

const GroupChatModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUser, setSelectedUser] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const { user, chats, setChats } = useChat();

  const handleSearch =async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }

    try {
      setLoading(true)

      const config = {
        headers: {
           Authorization: `Bearer ${user.token}`,
        },
      };

      const {data}=await searchUser(search,config)
      
      setLoading(false);
      setSearchResult(data);
      
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left"
      });
    }
  }

  const handleSubmit = async () => {
    
    if (!groupChatName || !selectedUser ) {
      toast({
        title: "Please Fill all the feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await createGroup(groupChatName, selectedUser, config);
      setChats([data, ...chats]);
      onClose();
      toast({
        title: "New Group Chat Created!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position:"bottom",
      })
    } catch (error) {
       toast({
         title: "Failed to Create the Chat!",
         description: error.response.data,
         status: "error",
         duration: 5000,
         isClosable: true,
         position: "bottom",
       });
    }
  
  };
  const handleDelete = (delUser) => {
    setSelectedUser(
      selectedUser.filter((sel) => sel._id !== delUser._id)
    );
  };

  const handleGroup = (userToAdd) => {
    if (selectedUser.includes(userToAdd)) {
      toast({
        title: "User already added",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    setSelectedUser([...selectedUser, userToAdd]);
  };
  

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="35px"
            fontFamily="Works sans"
            display="flex"
            justifyContent="center"
          >
            Create Group Chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDir="column" alignItems="center">
            <FormControl>
              <Input
                placeholder="Chat Name"
                mb={3}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <Input
                placeholder="Add Users eg: Virat,Musa,Rohit"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            <Box w='100%' display='flex' flexWrap='wrap'> 
              
            {
              selectedUser.map((u) => (
                <UserBadgeItem
                key={u._id}
                user={u}
                handleFunction={()=>handleDelete(u)}
                />
              ))
            }
            </Box>
            {
              loading ? (
                <Spinner ml='auto' display='flex' />
              ) : (
                  searchResult?.slice(0,4).map((user)=><UserListItem key={user._id} user={user} handleFunction={()=>handleGroup(user)}/>)
              )
            }
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue"   onClick={handleSubmit}>
              Create Chat
            </Button>
             </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatModal;
