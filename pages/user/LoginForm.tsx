import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Spacer,
  Box,
  Link,
  Flex,
  Button,
  Center,
  Spinner,
  Text,
  useBoolean,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
// import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "lib/redux/auth/action";
import { RootReducer } from "lib/redux/reducers";
import { errorToast } from "utils/hooks";
import MetaDecorator from 'components/MetaDecorator';
const LoginForm = () => {
  const VARIANT_COLOR = "#1F74Db";
  const history = useRouter();
  const dispatch = useDispatch();

  const login = useSelector<RootReducer, any>((state) => state.auth.user);
  useEffect(() => {
    if (login.success) {
      history.push("/dashboard");
    }
  }, [history, login]);

  const [formData, setformData] = useState({
    userNameOrEmail: "",
    password: "",
  });
  const [show, setShow] = useBoolean();
  const { userNameOrEmail, password } = formData;
  const handleChange = (e: any) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = () => {
    if (userNameOrEmail === "") {
      return errorToast("Please input an email or username");
    }
    if (password === "") {
      return errorToast("Please input a password");
    }
    dispatch(loginRequest(formData));
  };
  return (
    <Box>
      <MetaDecorator
        title="Login to Choirscipt | Choirscript.com"
        description="Regain access to all solfa notations"
        imageUrl=""
        imageAlt="Login page"
      />
      {login.processing && (
        <Center
          position="absolute"
          top="1px"
          bottom="0"
          left="0"
          right="0"
          width="100%"
          bg="blackAlpha.700"
          height="100%"
          mx="auto"
          zIndex="9"
        >
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
          <Text ml={4} display="block" color="#fff">
            Loading...
          </Text>
        </Center>
      )}
      <FormControl isRequired>
        <FormLabel mb={1}>Email or Username</FormLabel>
        <Input
          type="text"
          placeholder="Enter your email address"
          name="userNameOrEmail"
          value={userNameOrEmail}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl mt={4} isRequired>
        <FormLabel mb={1}>Password</FormLabel>
        <InputGroup size="md">
          <Input
            placeholder="Enter your password"
            name="password"
            value={password}
            onChange={handleChange}
            pr="4.5rem"
            type={show ? "text" : "password"}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" variant="secondaryOutline" onClick={() => setShow.toggle()}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Stack isInline justifyContent="space-between" mt={4}>
        <Spacer />
        <Box>
          <Link
            color={VARIANT_COLOR}
            onClick={() => history.push("/user/forgot-password")}
          >
            Forgot your password?
          </Link>
        </Box>
      </Stack>
      <Flex justifyContent="space-between" mt={4}>
        <Button width="40%" mt={4} onClick={handleSubmit}>
          Sign In
        </Button>
        <Button
          variant="none"
          onClick={() => history.push("/user/register")}
          color={VARIANT_COLOR}
          mt={4}
        >
          Create Account
        </Button>
      </Flex>
    </Box>
  );
};
export default LoginForm;
