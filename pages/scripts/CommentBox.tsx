import { Textarea, Text, Box, Button, Flex } from '@chakra-ui/react'

type CommentBoxProps = {
  value: string
  onChange: (event) => void
  postComment: () => void
  handleCancel?: () => void
}

const CommentBox = (props: CommentBoxProps) => {
  const { value, onChange, postComment, handleCancel } = props;
  return (
    <Box mb={2}>
      <Textarea
        size="lg"
        resize="none"
        bg="#fff"
        borderWidth="1px"
        borderColor="#dbe3e9"
        padding="7px 16px"
        fontSize="14px"
        mt={3}
        outline="none"
        _focus={{ outline: "none" }}
        value={value}
        onChange={onChange}
        maxLength={20000}
      />
      <Text
        fontSize="13px"
        color="#7f94a6" textAlign="right">
        {value.length}/20,000 characters
      </Text>
      <Flex justify="space-between" mt={2}>

        <Button
          fontWeight="normal"
          rounded="none"
          disabled={value.length === 0}
          onClick={postComment}
        >
          Post a comment
        </Button>
        {
          handleCancel &&
          <Button
            onClick={handleCancel}
            bg="#e2e9ef"
            color="primary"
            fontWeight="normal"
            _hover={{ background: "#cbd8e3" }}
            rounded="none"
          >
            Cancel
          </Button>

        }
      </Flex>
    </Box>
  )
}

export default CommentBox
