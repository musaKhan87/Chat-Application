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
import {useNavigate} from "react-router-dom"
import { getRegisterData } from "../../api/chatData";

const Signup = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const toast = useToast();
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();  

  const postDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (pics.type === "image/jpeg" || pics.type === "/image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "mk123");
      fetch("https://api.cloudinary.com/v1_1/mk123/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.url) {
            setPic(data.url.toString());
          } else {
            toast({
              title: "Image upload failed. Please try again.",
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            });
            console.error("Cloudinary error:", data);
          }
          setLoading(false);
          
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
       toast({
         title: "Please Select an Image!",
         status: "warning",
         duration: 5000,
         isClosable: true,
         position: "bottom",
       });
      setLoading(false);
      return;
    }
  };


  const [show, setShow] = useState(true);

  const handleFormSubmit = async () => {
    setLoading(true);
    if (!user.name || !user.email || !user.password || !user.confirmpassword ) {
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

    if (user.name.length < 4) {
      toast({
        title: "Username must be at least 4 characters",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      toast({
        title: "Invalid email format",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
    if (!passwordRegex.test(user.password)) {
      toast({
        title:
          "Password must be at least 6 characters and include a number and special character",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }


    if (user.password !== user.confirmpassword) {
       toast({
         title: "Passwords Do Not Match",
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

      const { data } = await getRegisterData(user.name, user.email, user.password, pic, config);
      toast({
        title: "Registration Successful",
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
      <FormControl id="first-name" isRequired>
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input
          name="name"
          placeholder="Enter Your Name"
          onChange={handleInput}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          name="email"
          placeholder="Enter Your Email"
          onChange={handleInput}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel htmlFor="password">Password</FormLabel>
        <InputGroup>
          <Input
            name="password"
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
      <FormControl id="confirmpassword" isRequired>
        <FormLabel htmlFor="confirmpassword">Confirm Password</FormLabel>
        <InputGroup>
          <Input
            name="confirmpassword"
            type={show ? "password" : "text"}
            placeholder="Confirm Password"
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
      <FormControl id="pic" isRequired>
        <FormLabel htmlFor="pic">Upload your Picture</FormLabel>
        <Input
          name="pic"
          type="file"
          p={1.5}
          accept="image/jpeg,image/png"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        marginTop={15}
        onClick={handleFormSubmit}
        isLoading={loading}
        disabled={loading}
      >
        Signup
      </Button>
    </VStack>
  );
};

export default Signup;
