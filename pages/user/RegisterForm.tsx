import { FormControl, FormLabel, Input, Flex, Button, useBoolean, InputGroup, InputRightElement, FormErrorMessage } from '@chakra-ui/react';
import { checkEmail, checkUserName, signUpRequest } from 'lib/redux/auth/action';
import { RootReducer } from 'lib/redux/reducers';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router'
// import { useHistory } from 'react-router-dom';
import { errorToast } from 'utils/hooks';

const RegisterForm = () => {
  const VARIANT_COLOR = '#1F74Db'
  const history = useRouter();

  const dispatch = useDispatch();
  const login = useSelector<RootReducer, any>((state) => state.auth.user);
  const validUserName = useSelector<RootReducer, any>((state) => state.auth.userName);
  const validEmail = useSelector<RootReducer, any>((state) => state.auth.email);
  useEffect(() => {
    if (login.success === true) {
      history.push("/dashboard");
    }
  }, [history, login]);


  const [formData, setformData] = useState({
    userName: "",
    email: "",
    password: "",
    password2: ""
  });
  const { userName, password, password2, email } = formData;
  const handleChange = (e: any) => {
    setuserNameError(false)

    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const [show, setShow] = useBoolean();
  const [userNameError, setuserNameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      return errorToast("Passwords do not match")
    }
    dispatch(signUpRequest({
      userName,
      email,
      password
    }))
  }
  const handleBlur = () => {
    if (userName) {
      if (userName.length > 2) {
        dispatch(checkUserName({ userName }))
      } else {
        errorToast("userName must be greater than 3 characters");
        // setuserNameError(true)
      }
    }
  }
  const handleEmailBlur = () => {
    if (email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (re.test(String(email).toLowerCase())) {
        dispatch(checkEmail({ email }))
      } else {
        errorToast("Please input a valid email");
      }
    }
  }
  useEffect(() => {
    const { processing, processed, success } = validUserName;
    if (!processing && processed && success) {
      setuserNameError(false)
    } else if (!processing && processed && !success) {
      setuserNameError(true)
    }
    //eslint-disable-next-line
  }, [validUserName])
  useEffect(() => {
    const { processing, processed, success } = validEmail;
    if (!processing && processed && success) {
      setEmailError(false)
    } else if (!processing && processed && !success) {
      setEmailError(true)
    }
    //eslint-disable-next-line
  }, [validEmail])
  return (
    <form onSubmit={handleSubmit}>
      <FormControl isRequired isInvalid={emailError}>
        <FormLabel mb={1}>Email address</FormLabel>
        <Input type='email' placeholder='Enter your email address'
          name="email"
          value={email}
          onChange={handleChange}
          onBlur={handleEmailBlur}
        />
        <FormErrorMessage>{`This email ${email} is not avaliable`}</FormErrorMessage>

      </FormControl>
      <FormControl isRequired mt={4} isInvalid={userNameError}>
        <FormLabel mb={1} >Username</FormLabel>
        <Input type='text'
          autoComplete="userName"
          placeholder='Enter your username'
          name="userName"
          value={userName}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <FormErrorMessage>{`The Username ${userName} is not avaliable`}</FormErrorMessage>
      </FormControl>
      <FormControl isRequired mt={4}>
        <FormLabel mb={1}>Password</FormLabel>
        <InputGroup size="md">
          <Input
            autoComplete="new-password"
            placeholder='Enter your password'
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
      <FormControl isRequired mt={4}>
        <FormLabel mb={1}>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            autoComplete="new-password"
            name="password2"
            value={password2}
            onChange={handleChange}
            placeholder="Re-enter your password"
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

      <Flex justifyContent="space-between" mt={4}>
        <Button
          type="submit"
          mt={4}>Create account</Button>
        <Button
          onClick={() => history.push("/user/login")}
          variant="none"
          color={VARIANT_COLOR}
          mt={4}>Log in</Button>
      </Flex>
    </form>
  )
}
export default RegisterForm;