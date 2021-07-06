import {
  Box,
  Text,
  Image,
  Heading,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import StarRating from "../../pages/dashboard/StarRating";
import { useWhiten } from "hook/colorHelper";
import dayjs from "dayjs";
import { baseURL } from 'services/httpService'
// import { useHistory } from "react-router-dom";
import { useRouter } from 'next/router'
export interface ScriptType {
  audio: any;
  averateRating: number;
  category: string;
  composer: string;
  createdAt: string;
  customCategory: any;
  deletedAt: any;
  id: string;
  image: string;
  isVerified: boolean;
  name: string;
  ratingCount: number;
  slug: string;
  updatedAt: string;
  uploadedBy: string;
  user: any;
}
type ScriptCardProps = {
  script: ScriptType;
};
const ScriptCard = (props: ScriptCardProps) => {
  const { name, averateRating, user, ratingCount, composer, createdAt, image, slug } =
    props.script;

  const color = useColorModeValue("#454545", "#99c9f2");
  const textColor = useWhiten("#1f74bd");
  const history = useRouter();
  return (
    <ScriptCard.Wrapper>
      <Flex flexDir={["row", "column"]}>
        <Image
          onClick={() => history.push(`/scripts/${slug}`)}
          name={name}
          src={`${baseURL}/scripts/files/${image}`}
          alt="script preview"
          w={{
            base: "110px", // 0 - 476
            // sm: "repeat(2, 1fr)", // 758px - 476px 
            // md: "repeat(2, 1fr)", // tablet
            // lg: "repeat(5, 1fr)", // desktop 1024px
            // lg: "277px",
            xl: "277px"
          }}
          // h="388px"
          h={
            {
              base: "154px",
              // lg: "388px",
              xl: "388px"
            }
          }
          objectFit="cover"
          _hover={
            {
              cursor: "pointer"
            }
          }
          mr={4}
        />
        <Box mt={2}>
          <Heading
            as="h2"
            size="sm"
            color={textColor}
            _hover={{ cursor: "pointer" }}
            fontWeight="normal"
            textTransform="capitalize"
            onClick={() => history.push(`/scripts/${slug}`)}
          >
            {name}
          </Heading>
          <Text fontSize="sm" color={textColor}>
            {user.userName}
          </Text>
          <div className="sub-text">
            <p>composer: {composer}</p>
            {"   "}
            <p>{dayjs(createdAt).format("MMM DD, YYYY")}</p>
          </div>

          {averateRating ? (
            <span>
              <StarRating value={averateRating} />
              {"    "}
              <Text fontSize="sm" color={color} mt="5px">
                {"    "} {ratingCount} Votes
              </Text>
            </span>
          ) : (
            <></>
          )}
        </Box>
      </Flex>
    </ScriptCard.Wrapper>
  );
};
ScriptCard.Wrapper = styled.div`
  .score-name {
    color: #1f74bd;
    line-height: 22px;
    word-break: break-word;
  }
  .user-name {
    font-size: 14px;
  }
  .sub-text {
    color: #7f94a6;
  }
  span {
    display: flex;
    align-items: center;
  }
`;
export default ScriptCard;
