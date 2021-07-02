import { FormControl, FormLabel, Input, Flex, Button } from '@chakra-ui/react';
import { forgotPassword } from 'lib/redux/auth/action';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const ForgotPasswordForm = () => {
  const [userNameOrEmail, setuserNameOrEmail] = useState("")
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword({ userNameOrEmail }))
  }
  return (
    <form onSubmit={handleSubmit}>
      <FormControl isRequired>
        <FormLabel>Email or Username</FormLabel>
        <Input type='text'
          placeholder='Enter your email or userName'
          value={userNameOrEmail}
          onChange={(e) => setuserNameOrEmail(e.target.value)}
        />
      </FormControl>
      <Flex justifyContent="space-between" mt={4}>
        <Button
          type="submit"
          mt={4}>Submit</Button>
      </Flex>
    </form>
  )
}
export default ForgotPasswordForm;