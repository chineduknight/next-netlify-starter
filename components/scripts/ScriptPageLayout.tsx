import {
  Avatar,
  Box,
  Flex,
  Text,
  Button,
  Grid,
  Heading,
  Divider,
  Container,
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import StarRating from "pages/dashboard/StarRating";
import { Document, Page, pdfjs } from "react-pdf";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import React, { useState } from "react";
import styled from "@emotion/styled";
import ReactAudioPlayer from "react-audio-player";
import CommentBox from "./CommentBox";
import CommentView from "./CommentView";
import ShareModal from "./ShareModal";
import VideoModal from "./VideoModal";
import axios from "axios";
import { scriptsRequest } from "services/request";
import { convertParamsToString } from "helpers/stringManipulation";
import { nanoid } from 'nanoid';
import CustomSpinner from 'components/CustomSpinner';
import MetaDecorator from 'components/MetaDecorator';
import { baseURL } from 'services/httpService';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { HiDownload } from 'react-icons/hi';
import { FaRegComment, FaYoutube } from 'react-icons/fa';
import { AiFillHeart, AiOutlineEye, AiOutlineHeart, AiOutlinePrinter } from 'react-icons/ai';
import { GiShare } from 'react-icons/gi';
pdfjs.GlobalWorkerOptions.workerSrc =
  `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const ScriptPageLayout = (props: any) => {
  const {
    script,
    userComment,
    onCommentChange,
    postComment,
    deleteComment,
    handleFavoriting,
    addOrRemoveFollowing,
    userInfo,
    comments
  } = props;
  const {
    id,
    name,
    user,
    createdAt,
    image,
    audio,
    ratingCount,
    averateRating,
    description,
    document,
    viewCount,
    downloadCount,
    favoriteCount,
    videoUrl
  } = script;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const videoModalCtl = useDisclosure();

  const fileExtension = document.split(".").pop();
  const [numPages, setNumPages] = useState(1);
  const [PDFLoading, setPDFLoading] = useState(true)
  const [pageNumber, setPageNumber] = useState(1);
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPDFLoading(false);
  };
  const onLoadError = (error) => {
    console.log("onLoadError:", error);
  };
  const onSourceError = (error) => {
    console.log("onSourceError:", error);
  };

  const goToPrevPage = () => {
    if (pageNumber <= 1) return;
    setPageNumber(pageNumber - 1);
  };
  const goToNextPage = () => {
    if (pageNumber >= numPages) return;
    setPageNumber(pageNumber + 1);
  };

  const downloadThisFile = () => {
    const url = convertParamsToString(scriptsRequest.DOWNLOAD_FILE, { id });
    const myFile = `${baseURL}${url}`;
    axios
      .get(myFile, {
        responseType: "blob",
        withCredentials: true,
      })
      .then(function (response) {
        const url = window.URL.createObjectURL(
          new Blob([response.data], {
            type: response.headers["content-type"],
          })
        );
        const link = window.document.createElement("a");
        link.href = url;
        link.download = document;
        link.click();
      });
  };


  return (
    <Box>
      <MetaDecorator
        title={`${name} | Choirscript.com`}
        description={`${description} | Get the clearest and free tonic Solfa notation music sheet / scripts for liturgical celebrations suitable for any event, competition, rendition etc`}
        imageAlt="Script Image"
        imageUrl={image}
      />
      <ShareModal isOpen={isOpen} onClose={onClose} />
      <VideoModal isOpen={videoModalCtl.isOpen} onClose={videoModalCtl.onClose} videoUrl={videoUrl} />
      <Grid
        templateColumns={{
          base: "1fr", //smaller than desktop
          lg: "auto 440px", // large screen desktop
        }}
      >
        <Box>
          {audio && (
            <Box bg="#f2f2f2" mb="4">
              <Container maxWidth="851px">
                <ReactAudioPlayer
                  src={`${baseURL}/scripts/files/${audio}`}
                  controls />
              </Container>
            </Box>
          )}
          {
            videoUrl &&
            <Flex alignItems="center" justifyContent="center"
              color="#38a6dc"
              onClick={() => videoModalCtl.onOpen()}
              _hover={{ cursor: "pointer" }}
            >
              <FaYoutube />
              <Button
                variant="unstyled"
                ml="2"
              >  Play Video</Button>
            </Flex>
          }
          <Container maxWidth="851px" mt="4">
            {fileExtension !== "pdf" ? (
              <Image
                src={`${baseURL}/scripts/files/${image}`}
                alt="song preview"
              />
            ) : (
              <PDFHolder>
                {
                  !PDFLoading &&
                  <Flex alignItems="center" justifyContent="space-between" mb={4}>
                    <Box>
                      <Button
                        leftIcon={<MdNavigateBefore />}
                        variant="secondaryOutline"
                        onClick={goToPrevPage}
                        p={{
                          base: "1",
                          lg: "2",
                        }}
                        fontSize={{
                          base: "sm",
                          lg: "initial",
                        }}
                      >
                        Prev
                      </Button>
                      <Button
                        p={{
                          base: "1",
                          lg: "2",
                        }}
                        fontSize={{
                          base: "sm",
                          lg: "initial",
                        }}
                        rightIcon={<MdNavigateNext />}
                        variant="secondary"
                        ml={4}
                        onClick={goToNextPage}
                      >
                        Next
                      </Button>
                    </Box>
                    <Box>
                      <p>
                        Page {pageNumber} of {numPages}
                      </p>
                    </Box>
                  </Flex>
                }
                <Document
                  file={`${baseURL}/scripts/files/${document}`}
                  onLoadSuccess={onDocumentLoadSuccess}
                  onLoadError={onLoadError}
                  onSourceError={onSourceError}
                  className="pdf-holder"
                  loading={<CustomSpinner />}
                >
                  <Page pageNumber={pageNumber}
                  />
                </Document>

              </PDFHolder>
            )}
          </Container>
        </Box>
        <Box
          bg="#f6f6f6"
          minHeight={`calc(100vh - ${"64px"})`}
          borderLeft="1px"
          borderColor="#b1bac2"
        >
          <Box p={5}>
            <Heading fontWeight="normal" fontSize="22px">
              {name}
            </Heading>
            <Flex justify="space-between" alignItems="center" padding="12px 0">
              <Flex alignItems="center">
                <Avatar
                  name={user.userName}
                  src={"image"}
                  width="45px"
                  height="45px"
                />
                <Text ml={2} textTransform="capitalize">
                  {user.userName}{" "}
                </Text>
              </Flex>
              <Button
                variant={userInfo.isFollowing ? "secondaryOutline" : "primary"}
                fontSize="13px"
                onClick={addOrRemoveFollowing}
              >
                {userInfo.isFollowing ? "Unfollow" : "Follow"}
              </Button>
            </Flex>
            <Flex alignItems="center">
              <HiDownload color="#777777" />
              <Text ml={2} fontSize="14px" color="#777777" mr={5}>
                {downloadCount}
              </Text>
              <AiOutlineHeart color="#777777" />
              <Text ml={2} fontSize="14px" color="#777777" mr={4}>
                {favoriteCount}
              </Text>
              <FaRegComment color="#777777" />{" "}
              <Text ml={2} fontSize="14px" color="#777777" mr={5}>
                {comments.length}
              </Text>
              <AiOutlineEye color="#777777" />
              <Text ml={2} fontSize="14px" color="#777777" mr={5}>
                {viewCount}
              </Text>
              {ratingCount >= 3 && (
                <>
                  <StarRating value={averateRating} />
                  <Text ml={2} fontSize="14px" color="#777777" mr={5}>
                    {ratingCount} votes
                  </Text>
                </>
              )}
            </Flex>

            <Grid mt={5} templateColumns="repeat(2, 1fr)" gap={1}>
              <Button
                onClick={downloadThisFile}
                variant="unstyled"
                textAlign="left"
                bg="primary"
                color="#fff"
                pl="12px"
                rounded="none"
                leftIcon={<HiDownload color="#fff" />}
              >
                Download
              </Button>
              <Button
                variant="unstyled"
                textAlign="left"
                bg="#e2e9ef"
                pl="12px"
                color="primary"
                fontWeight="normal"
                _hover={{ background: "#cbd8e3" }}
                rounded="none"
                leftIcon={<AiOutlinePrinter />}
              >
                Print
              </Button>
              <Button
                onClick={onOpen}
                variant="unstyled"
                textAlign="left"
                pl="12px"
                bg="#e2e9ef"
                color="primary"
                fontWeight="normal"
                _hover={{ background: "#cbd8e3" }}
                rounded="none"
                leftIcon={<GiShare />}
              >
                Share
              </Button>
              <Button
                variant="unstyled"
                textAlign="left"
                pl="12px"
                bg="#e2e9ef"
                color="primary"
                fontWeight="normal"
                _hover={{ background: "#cbd8e3" }}
                rounded="none"
                leftIcon={userInfo.hasFavorited ? <AiFillHeart /> : <AiOutlineHeart />}
                onClick={handleFavoriting}
              >
                {userInfo.hasFavorited ? "UnFavorite" : "Favorite"}
              </Button>
            </Grid>
          </Box>
          <Divider />
          <Box p={5}>
            <Text
              fontSize="14px"
              textTransform="uppercase"
              fontWeight="extrabold"
            >
              Please Rate this score
            </Text>
            <Flex alignItems="center">
              <StarRating isEditable id={id} value={userInfo?.rating} />
              {ratingCount < 3 && (
                <Text color="#080808" fontSize="14px" mt={1}>
                  {ratingCount === 0 ? 3 : 3 - ratingCount} more votes to show
                  rating
                </Text>
              )}
            </Flex>
          </Box>
          <Divider />
          <Box p={5}>
            <Text
              fontSize="14px"
              textTransform="uppercase"
              fontWeight="extrabold"
            >
              UPLOADED ON {dayjs(createdAt).format("MMM DD, YYYY")}{" "}
            </Text>

            <Text color="#454545" mt={2} fontSize="14px">
              {description ? description : "There is no description for this"}
            </Text>
          </Box>
          <Divider />
          <Box p={5}>
            <Text
              fontSize="14px"
              textTransform="uppercase"
              fontWeight="extrabold"
            >
              Your Comment
            </Text>
            <CommentBox
              value={userComment}
              onChange={onCommentChange}
              postComment={postComment}
            />
          </Box>
          <Divider />
          <Box p={5}>
            <Text
              fontSize="14px"
              textTransform="uppercase"
              fontWeight="extrabold"
            >
              Comments
            </Text>
            {comments.length === 0 ? (
              <div>Nothing to show, replace this with a nice svg</div>
            ) : (
              comments.map((comment) => {
                return (
                  <div key={nanoid()}>
                    <CommentView
                      key={comment.id}
                      scriptId={id}
                      comment={comment}
                      deleteComment={() => deleteComment(comment.id)}
                    />
                    {
                      comment.commentReplies.map(replies =>
                        <Box
                          pl="40px"
                          key={replies.id}
                        >
                          <CommentView
                            key={replies.id}
                            scriptId={id}
                            comment={replies}
                            deleteComment={() => deleteComment(replies.id)}
                          /></Box>)
                    }

                  </div>
                );
              })
            )}
          </Box>
          <Divider />
        </Box>
      </Grid>
    </Box>
  );
};

const PDFHolder = styled.div`
width:100%;
height: auto !important;
  .pdf-holder {
    .react-pdf__Page__canvas {
      width: 100% !important;
      height: auto !important;
    }
  }
`;
export default ScriptPageLayout;
