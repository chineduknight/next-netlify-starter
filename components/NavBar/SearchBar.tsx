import {
  Box,
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuList,
  MenuGroup,
  MenuItem,
  Text,
} from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";
import { BiArrowBack, BiChevronDown } from "react-icons/bi";
import { nanoid } from "nanoid";
import { languages, MassParts, seasons } from "utils/constants";

type SearchBarProps = {
  searchText: string;
  onChange: (event) => void;
  handleBack?: () => void;
  showDropdown: boolean;
  hideDropdown: () => void;
  searchResult: Array<any>;
  resultClick: (term) => void;
  currentCat: string
  setcurrentCat: (value) => void
  handleHide: () => void
};
const SearchBar = (props: SearchBarProps) => {
  const {
    searchText,
    onChange,
    showDropdown,
    handleBack,
    searchResult,
    resultClick,
    currentCat,
    setcurrentCat,
  } = props;

  return (
    <Flex alignItems="center" width="100%" position="relative">
      {handleBack && (
        <Button
          bg="#fff"
          rounded="none"
          color="black"
          onClick={handleBack}
          variant="ghost"
        >
          <BiArrowBack size={20} />
        </Button>
      )}
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <AiOutlineSearch color="gray.300" />
        </InputLeftElement>
        <Input
          rounded="none"
          value={searchText}
          onChange={onChange}
          type="text"
          placeholder="Search for scripts"
          bg="white"
        />
        <InputRightElement width="max-content" mr="2">
          <Menu>
            <MenuButton
              as="span"
              h="1.75rem"
              mr={2}
            >
              <Flex alignItems="center">
                <Text color="#7F94A6" fontSize="sm">
                  {currentCat}
                </Text>{" "}
                <BiChevronDown color="#7F94A6" />
              </Flex>
            </MenuButton>
            <MenuList fontSize="sm">
              <MenuItem onClick={() => setcurrentCat("All")}>All</MenuItem>
              <MenuGroup title="Mass Parts" >
                {MassParts.map((part) => (
                  <MenuItem key={nanoid()} onClick={() => setcurrentCat(part)}>
                    {part}
                  </MenuItem>
                ))}
              </MenuGroup>
              <MenuDivider />
              <MenuGroup title="Seasons">
                {seasons.map((part) => (
                  <MenuItem key={nanoid()} onClick={() => setcurrentCat(part)}>{part}</MenuItem>
                ))}
              </MenuGroup>
              <MenuDivider />
              <MenuGroup title="Languages">
                {languages.map((part) => (
                  <MenuItem key={nanoid()} onClick={() => setcurrentCat(part)}>{part}</MenuItem>
                ))}
              </MenuGroup>
              <MenuDivider />
              <MenuGroup title="Others">
                <MenuItem onClick={() => setcurrentCat("Composer")}>Composer</MenuItem>
                <MenuItem onClick={() => setcurrentCat("Custom Category")}>Custom Category</MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>
        </InputRightElement>
      </InputGroup>
      {showDropdown && (
        <Box
          position="absolute"
          bg="#fff"
          width="100%"
          zIndex="5"
          top="40px"
          border="1px solid #dbe3e9"
        // ref={domNode}
        >
          {searchResult.map((result) => (
            <Button
              key={nanoid()}
              onClick={() => resultClick(result)}
              // onClick={() => console.log("chicked")}
              variant="unstyled"
              rounded="none"
              pl="4"
              fontWeight="normal"
              isFullWidth
              textAlign="left"
              _hover={{ backgroundColor: "#dbe3e9" }}
            >
              {result}
            </Button>
          ))}
        </Box>
      )}

    </Flex>
  );
};

export default SearchBar;
