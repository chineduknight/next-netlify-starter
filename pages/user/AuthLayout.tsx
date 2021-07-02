import {
  Box,
  Flex,
  Heading,
  Container
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import { googleAuth } from 'lib/redux/auth/action';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';

interface AuthLayoutProps {
  headerText: string;
  hasGoogleLogin?: boolean;
  children?: any
}
const AuthLayout = (props: AuthLayoutProps) => {
  const { headerText, hasGoogleLogin = true } = props;
  const dispatch = useDispatch();
  const responseGoogle = (values) => {
    dispatch(googleAuth({
      token: values.tokenId
    }))
  }
  const errorGoogle = () => {
  }
  const googleID = process.env.REACT_APP_GOOGLE_CLIENT_ID as string
  return (
    <Box
      minHeight={`calc(100vh - ${"64px"})`} bg="#f6f6f6">
      <Box
        pt="34px"
      >
        <Container
          maxWidth="800px"
          position="relative"
          boxShadow='lg'
          bg="white"
          pt="34px"
          borderRadius={4}
          border="1px"
          borderColor="#dbe3e9"
          borderStyle="solid"
        >
          <Flex width='full' align='center' justifyContent='center'>
            <Box
              width='full'
              maxWidth='336px'
              textAlign='center'
            >
              <Heading fontWeight={400} textAlign="left" size="lg" color="text">{headerText} </Heading>

              <Box my={8} textAlign='left'>
                {
                  hasGoogleLogin &&
                  <>
                    <GoogleBtn>
                      <GoogleLogin
                        clientId={googleID}
                        buttonText="Login with Google"
                        onSuccess={responseGoogle}
                        onFailure={errorGoogle}
                        cookiePolicy={'single_host_origin'}
                      />
                    </GoogleBtn>
                    <Seperator className="separator">or</Seperator></>
                }
                {
                  props.children
                }
              </Box>

            </Box>
          </Flex >
        </Container>
      </Box>
    </Box>
  )
}
export default AuthLayout;

const GoogleBtn = styled.div`
button{

  width:100%;
  box-shadow:none !important;
  border: 1px solid #dbe3e9 !important;
  border-radius: 2px !important;
}
span{
  width:100%;
  font-size:16px;
  color:#454545;
}
`

const Seperator = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
margin: 2rem 0;
font-size:14px;
&::before,
&::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #d6dce1;
}

&:not(:empty)::before {
  margin-right: .25em;
}

&:not(:empty)::after {
  margin-left: .25em;
}
`