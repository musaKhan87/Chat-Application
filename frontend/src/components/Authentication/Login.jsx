import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { getLoginData } from "../../api/chatData";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();  
  const [show, setShow] = useState(true);

  const handleFormSubmit = async () => {
     setLoading(true);
     if (!user.email || !user.password ) {
       toast({
         title: "Please Fill all the Feilds",
         status: "warning",
         duration: 5000,
         isClosable: true,
         position: "bottom",
       });
       setLoading(false);
       return;
    }
    
      try {
          const config = {
            headers: {
              "Content-Type": "application/json", 
            },
          };
    
          const { data } = await getLoginData( user.email, user.password, config);
          toast({
            title: "Login Successful",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
    
          localStorage.setItem("userInfo", JSON.stringify(data));
    
          setLoading(false);
          navigate("/chats");
        } catch (error) {
           toast({
             title: "Error Occured!",
             description: error.response?.data?.message || error.message,
             status: "error",
             duration: 5000,
             isClosable: true,
             position: "bottom",
           });
          setLoading(false);
          
        }

  };

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <VStack spacing={"1.5rem"}>
      <FormControl id="login-email" isRequired>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          name="email"
          value={user.email}
          placeholder="Enter Your Email"
          onChange={handleInput}
        />
      </FormControl>
      <FormControl id="login-password" isRequired>
        <FormLabel htmlFor="password">Password</FormLabel>
        <InputGroup>
          <Input
            name="password"
            value={user.password}
            type={show ? "password" : "text"}
            placeholder="Enter Your Password"
            onChange={handleInput}
          />
          <InputRightElement width={"4.5rem"}>
            <Button
              h={"1.75rem"}
              size="sm"
              onClick={() => setShow((prev) => !prev)}
            >
              {!show ? (
                <FaEyeSlash fontSize={"1rem"} />
              ) : (
                <FaEye fontSize={"1rem"} />
              )}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        marginTop={15}
        onClick={handleFormSubmit}
        isLoading={loading}
        disabled={loading}
      >
        Login
      </Button>
     
    </VStack>
  );
};

export default Login;
