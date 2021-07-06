import { Box, Flex, Image, Heading, Text } from '@chakra-ui/react'
import StarRating from 'pages/dashboard/StarRating';
// import { useHistory } from 'react-router-dom';
import { useRouter } from 'next/router'
import { baseURL } from 'services/httpService';
const ScriptDisplay = (props: any) => {
  const { name, averateRating, description, user, ratingCount, composer, image, slug } =
    props.script;
  const history = useRouter();

  return (
    <Flex borderBottom="1px solid #e2e8f0" pb={4} mb={4}>
      <Image
        onClick={() => history.push(`/scripts/${slug}`)}
        src={`${baseURL}/scripts/files/${image}`}
        alt="script preview"
        objectFit="cover"
        _hover={{ cursor: "pointer" }}
        mr={4}
        w="118px"
        h="166px"
        rounded="sm"
      />
      <Box>
        <Heading
          fontSize={{ base: "16px", lg: "25px" }}
          color="primary"
          onClick={() => history.push(`/scripts/${slug}`)}
          _hover={{ cursor: "pointer" }}

        >{name}</Heading>
        <Text
          textTransform="capitalize"
          color="#64748b"
        >{user.userName}</Text>
        <Text
          // fontSize="25px"
          textTransform="capitalize"
          color="primary"
        >Composer: {composer}</Text>
        <Flex alignItems="center">
          <StarRating value={averateRating} />

          <Text
            mt={1}
            fontSize="14px"
            color="#475569"
          > {ratingCount} votes</Text>
        </Flex>
        <Text
          color="#364152"
          fontSize="14px"
          mt={3}
        > {description}</Text>
      </Box>
    </Flex>
  )
}

export default ScriptDisplay
