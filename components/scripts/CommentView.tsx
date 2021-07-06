import {
  Grid,
  Avatar,
  Text,
  Box,
  Flex,
  Button,
  VStack,
  Divider,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { likeComment, replyComment, spamComment, unlikeComment, unspamComment, updateComment } from 'lib/redux/comments/action';
import { useState } from "react";
import { AiOutlineLike, AiTwotoneLike } from 'react-icons/ai';
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { TiArrowForwardOutline } from "react-icons/ti";
import { useDispatch } from 'react-redux';
import { useClickOutside } from "utils/hooks";
import CommentBox from "./CommentBox";

type CommentViewProps = {
  comment: any;
  deleteComment: () => void;
  scriptId?: string
};

const CommentView = (props: CommentViewProps) => {
  const { comment, deleteComment, scriptId, } = props;
  const { hasLiked = false, likeCount, isOwner, hasMarkedAsSpam } = comment;
  const [showPopUp, setshowPopUp] = useState(false);
  const domNode = useClickOutside(() => {
    setshowPopUp(false);
  });
  const [isEdit, setIsEdit] = useState(false);
  const [isReply, setIsReply] = useState(false);
  const [text, setText] = useState(comment.text);
  const [replyText, setreplyText] = useState("");
  const [isLiked, setIsLiked] = useState(hasLiked)
  const dispatch = useDispatch();
  const updateCommentToAPI = () => {
    dispatch(updateComment({ id: comment.id, text }));
    setIsEdit(false)
  }
  const replyAComment = () => {
    dispatch(replyComment({ id: scriptId, inReplyTo: comment.inReplyTo || comment.id, text: replyText }));
    setIsEdit(false)
    setIsReply(false)
  }
  const handleCancel = () => {
    setText(comment.text);
    setIsEdit(false);
  }

  const handleSpam = () => {
    if (hasMarkedAsSpam) {
      dispatch(unspamComment(comment.id))

    } else {
      dispatch(spamComment(comment.id))

    }
    setshowPopUp(false)
  }
  return (
    <>
      {isEdit ? (
        <CommentBox
          value={text}
          onChange={(e) => setText(e.target.value)}
          postComment={updateCommentToAPI}
          handleCancel={handleCancel}
        />
      ) : (
        <Grid mt={4} templateColumns="45px auto" gap={2}>
          <Avatar name="useraName" src={"image"} width="45px" height="45px" />
          <Box>
            <Flex alignItems="center" justifyContent="space-between">
              <Text fontSize="13px" color="primary" textTransform="capitalize">
                {comment.postedBy.userName} •{" "}
                {dayjs(comment.createdAt).format("MMM DD, YYYY")}
              </Text>
              <Box position="relative">
                <Button
                  variant="unstyled"
                  onClick={() => setshowPopUp(!showPopUp)}
                >
                  <IoEllipsisVerticalSharp />
                </Button>
                {showPopUp && (
                  <VStack
                    bg="white"
                    width="133px"
                    maxW="133px"
                    py={1}
                    position="absolute"
                    top="34px"
                    left="-115px"
                    boxShadow="lg"
                    borderColor="#dbe3e9"
                    borderWidth="1px"
                    zIndex="5"
                    ref={domNode}
                  >
                    {
                      isOwner && <>
                        <Button
                          onClick={() => setIsEdit(true)}
                          variant="unstyled"
                          width="100%"
                          rounded="none"
                          _hover={{
                            backgroundColor: "primary",
                            color: "#fff",
                          }}
                          fontSize="sm"
                          fontWeight="normal"
                          textAlign="left"
                          color="#454545"
                          pl="10px"
                          height="32px"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={deleteComment}
                          variant="unstyled"
                          width="100%"
                          rounded="none"
                          _hover={{
                            backgroundColor: "orangered",
                            color: "#fff",
                          }}
                          fontSize="sm"
                          fontWeight="normal"
                          textAlign="left"
                          height="32px"
                          pl="10px"
                          color="#454545"
                        >
                          Delete
                        </Button>
                      </>
                    }
                    <Button
                      variant="unstyled"
                      width="100%"
                      rounded="none"
                      _hover={{
                        backgroundColor: "primary",
                        color: "#fff",
                      }}
                      fontSize="sm"
                      fontWeight="normal"
                      textAlign="left"
                      height="32px"
                      pl="10px"
                      color="#454545"
                      onClick={handleSpam}
                    >
                      {
                        hasMarkedAsSpam ? " Unmark as spam" : " Mark as spam"
                      }

                    </Button>
                  </VStack>
                )}
              </Box>
            </Flex>
            <Text fontSize="14px" color="#454545">
              {text}
            </Text>
            <Flex alignItems="center">
              <Flex
                color="#7f94a6"
                fontSize="13px"
                fontWeight="normal"
                alignItems="center"
                mr={3}
                _hover={{ cursor: "pointer" }}
                onClick={() => setIsReply(true)}
              >
                <TiArrowForwardOutline color="#7f94a6" size="16px" /> Reply
              </Flex>
              <Button variant="unstyled" color="#7f94a6"
                onClick={() => {
                  if (isLiked) {
                    dispatch(unlikeComment(comment.id))
                    setIsLiked(false)

                  } else {
                    dispatch(likeComment(comment.id))
                    setIsLiked(true)

                  }
                }
                }
              >
                <Flex alignItems="center">

                  {
                    isLiked ?
                      <AiTwotoneLike /> :
                      <AiOutlineLike />
                  }
                  {
                    likeCount > 0 &&
                    <Text fontWeight="normal" ml={1}>
                      {likeCount}
                    </Text>
                  }
                </Flex>
              </Button>
            </Flex>
            {
              isReply &&
              <CommentBox
                value={replyText}
                onChange={(e) => setreplyText(e.target.value)}
                postComment={replyAComment}
                handleCancel={() => setIsReply(false)}
              />
            }
            <Divider />
          </Box>
        </Grid>
      )}
    </>
  );
};

export default CommentView;
