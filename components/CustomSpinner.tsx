import { Center, Spinner } from '@chakra-ui/react';

export const MySpinner = () => (
  <Spinner
    thickness='4px'
    speed='0.65s'
    emptyColor='gray.200'
    color='blue.500'
    size='xl'
  />
);
const CustomSpinner = () => (

  <Center h={`calc(100vh - ${"64px"})`} w='100%'>
    <MySpinner />
  </Center>
);

export default CustomSpinner;
