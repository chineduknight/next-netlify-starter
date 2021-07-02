import {
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Flex,
  Box,
  AspectRatio,
} from "@chakra-ui/react";
import { MdClose } from "react-icons/md";
import ReactPlayer from 'react-player/youtube'
const VideoModal = (props: any) => {
  const { isOpen, onClose, videoUrl } = props;
  console.log('videoUrl:', videoUrl)

  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} size="2xl" >
        <ModalOverlay />
        <ModalContent>
          <Flex
            alignItems="center"
            px={6}
            py={2}
            background="#f0c869"
            borderTopRightRadius="7px"
            borderTopLeftRadius="7px"
          >
            <Text fontSize="18px"
              w="100%"
              textAlign="center"
            > Share </Text>
            <Box
              alignSelf="flex-end"
              onClick={onClose} _hover={{ cursor: "pointer" }}
              background="#FF605C"
              color="#fff"
              p={1}
            >
              <MdClose size={20} />
            </Box>
          </Flex>
          <ModalBody p={0}
            bg="black"
            border="5px solid #f0c869"
            borderBottomLeftRadius="7px"
            borderBottomRightRadius="7px"
          >
            <AspectRatio w="100%" ratio={1} rounded="md">
              <ReactPlayer url={videoUrl}
                width="100%"
                height="100%"
              />
            </AspectRatio>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default VideoModal;
