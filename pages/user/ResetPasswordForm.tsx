import { FormControl, FormLabel, Input, Flex, Button } from '@chakra-ui/react';
import { resetPassword } from 'lib/redux/auth/action';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { errorToast } from 'utils/hooks';

const ResetPasswordForm = () => {
  const [password, setpassword] = useState("")
  const [password2, setpassword2] = useState("")
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.length < 6) {
      return errorToast("Password should be at least 6 charaters")
    }
    if (password !== password2) {
      return errorToast("Passwords do not match")
    }
    const url = new URL(window.location.href);
    const token = url.searchParams.get('token');

    dispatch(resetPassword({ password, token }))
  }
  return (
    <form onSubmit={handleSubmit}>
      <FormControl isRequired mb={4}>
        <FormLabel>New password</FormLabel>
        <Input type='password'
          placeholder='Enter your password'
          value={password}
          minLength={6}
          autoComplete="new-password"
          aria-autocomplete="list"
          onChange={(e) => setpassword(e.target.value)}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Confirm password</FormLabel>
        <Input type='password'
          placeholder='Confirm password'
          minLength={6}
          value={password2}
          autoComplete="new-password"
          aria-autocomplete="list"
          onChange={(e) => setpassword2(e.target.value)}
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
export default ResetPasswordForm;