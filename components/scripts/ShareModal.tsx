import {
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Flex,
  Box,
  Input,
  Button,
  useClipboard
} from "@chakra-ui/react";
import styled from '@emotion/styled';
import { useEffect } from 'react';
import { MdClose } from "react-icons/md";
import {
  WhatsappShareButton,
  WhatsappIcon,
  FacebookShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  TwitterShareButton,
  TelegramShareButton,
  TwitterIcon,
  TelegramIcon
} from "react-share";
import { successToast } from 'utils/hooks';

const ShareModal = (props: any) => {
  const { isOpen, onClose } = props;
  const shareUrl = window.location.href;
  const { hasCopied, onCopy } = useClipboard(shareUrl)
  useEffect(() => {
    if (hasCopied) {
      successToast("Link Copied")
    }
  }, [hasCopied])
  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered size="2xl">
        <ModalOverlay />
        <ModalContent>
          <Flex
            alignItems="center"
            justify="space-between"
            width="100%"
            px={6}
            py={4}
            borderBottom="1px"
            borderColor="#e2e9ef"
          >
            <Text fontSize="18px"> Share </Text>
            <Box onClick={onClose} _hover={{ cursor: "pointer" }}>
              <MdClose size={20} />
            </Box>
          </Flex>
          <ModalBody>
            <Text>Share with a single click</Text>
            <Box mt="4">
              <ShareWrapper>
                <WhatsappShareButton
                  url={shareUrl}
                  title={"Checkout this script on ChiorScript"}
                >
                  <WhatsappIcon size={35}></WhatsappIcon>
                </WhatsappShareButton>
                <FacebookShareButton
                  url={shareUrl}
                  title={"Checkout this script on ChiorScript"}
                >
                  <FacebookIcon size={35}></FacebookIcon>
                </FacebookShareButton>
                <FacebookShareButton
                  url={shareUrl}
                  title={"Checkout this script on ChiorScript"}
                >
                  <FacebookMessengerIcon size={35}></FacebookMessengerIcon>
                </FacebookShareButton>
                <TelegramShareButton
                  url={shareUrl}
                  title={"Checkout this script on ChiorScript"}
                >
                  <TelegramIcon size={35}></TelegramIcon>
                </TelegramShareButton>
                <TwitterShareButton
                  url={shareUrl}
                  title={"Checkout this script on ChiorScript"}
                >
                  <TwitterIcon size={35}></TwitterIcon>
                </TwitterShareButton>
              </ShareWrapper>
            </Box>
            <Flex my="4">
              <Input value={shareUrl}
                readOnly
              />
              <Button ml="2" onClick={onCopy}
                variant={hasCopied ? "secondaryOutline" : "primary"}
              >
                {hasCopied ? "Copied" : "Copy"}
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
const ShareWrapper = styled.div`

  svg {
    border-radius: 50%;
    margin-right:10px;
  }
`;
export default ShareModal;
