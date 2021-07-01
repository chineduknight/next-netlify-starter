import {
  Box,
  HStack,
  Avatar,
  Button,
  // useColorMode,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useMediaQuery,
  VStack,
  Divider,
  useBoolean,
  useOutsideClick,
} from "@chakra-ui/react";
import { FaArrowAltCircleUp } from "react-icons/fa";
// import { useHistory } from "react-router-dom";
// import { FaSun, FaMoon } from "react-icons/fa";
import SearchBar from "./SearchBar";
import { HiOutlineSearch } from "react-icons/hi";
import { BiChevronDown } from "react-icons/bi";
// import { PROTECTED_PATHS, PUBLIC_PATHS } from "routes/pagePath";
import { useRef } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

const NavBar = (props: any) => {
  const {
    handleLogout,
    onSearchChange,
    clickedSearchTerm,
    handleHide,
    searchData,
    user,
    searchText,
    showDropdown,
    setcurrentCat,
    currentCat,
    showSearch,
    setshowSearch,
  } = props;
  // const { UPLOAD, DASHBOARD } = PROTECTED_PATHS;
  // const history = useHistory();
  // const { colorMode, toggleColorMode } = useColorMode();
  const [mobile] = useMediaQuery("(min-width: 800px)");

  const [showSideBar, setshowSideBar] = useBoolean();
  const ref = useRef(null);
  useOutsideClick({
    ref: ref,
    handler: () => setshowSideBar.off(),
  });

  return (
    <Box position="relative">
      {showSideBar && (
        <Box
          position="absolute"
          height="100vh"
          bg="blackAlpha.400"
          inset="0"
          zIndex="5"
        >
          <Box bg="white" w="240px" h="100%" ref={ref}>
            <Flex alignItems="center" bg="primary" p={4}>
              <Avatar src={user?.data?.image} />
              {user.success ? (
                <Text
                  mx={2}
                  color="#fff"
                  textTransform="capitalize"
                  fontWeight="bold"
                >
                  {user.data.userName}
                </Text>
              ) : (
                <Button
                  color="#fff"
                  ml={2}
                  onClick={() => {
                    // history.push(PUBLIC_PATHS.LOGIN);
                    setshowSideBar.off();
                  }}
                >

                  Log in
                </Button>
              )}
            </Flex>
            <VStack p="2">
              <Button
                pl={4}
                variant="unstyled"
                textAlign="left"
                w="100%"
                fontWeight="normal"
                onClick={() => {
                  //  history.push(PUBLIC_PATHS.DASHBOARD); 
                  setshowSideBar.off();
                }}
              >
                {" "}
                Dashboard
              </Button>
              <Button
                pl="4"
                variant="unstyled"
                textAlign="left"
                w="100%"
                fontWeight="normal"
                onClick={() => {
                  // history.push(user.success ? PROTECTED_PATHS.UPLOAD : PUBLIC_PATHS.LOGIN);
                  setshowSideBar.off();
                }}
              >

                Upload
              </Button>
            </VStack>
            <Divider />
            <Box p="2">
              <Button
                pl="4"
                variant="unstyled"
                textAlign="left"
                w="100%"
                fontWeight="normal"
              >

                Help
              </Button>
            </Box>
            <Divider />
            {user.success && (
              <Box p="2">
                <Button
                  onClick={handleLogout}
                  pl="4"
                  variant="unstyled"
                  textAlign="left"
                  w="100%"
                  fontWeight="normal"
                >
                  {" "}
                  Log out
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      )}
      <Flex
        bg="primary"
        px="4"
        py="2"
        alignItems="center"
        justify="space-between"
      >
        <Box w="100%" display={showSearch ? "block" : "none"}>
          {/* For mobile screen */}
          <SearchBar
            resultClick={clickedSearchTerm}
            searchText={searchText}
            onChange={onSearchChange}
            handleBack={() => setshowSearch(false)}
            showDropdown={showDropdown}
            hideDropdown={handleHide}
            handleHide={handleHide}
            searchResult={searchData}
            currentCat={currentCat}
            setcurrentCat={setcurrentCat}
          />
        </Box>

        <HStack w="60%" display={showSearch ? "none" : "flex"}>
          {!mobile && (
            <Button
              onClick={() => {
                setshowSideBar.on();
              }}
            >
              <GiHamburgerMenu />
            </Button>
          )}
          <Avatar
            name="softscript"
            src={"image"}
            // onClick={() => history.push(DASHBOARD)}
            _hover={{
              cursor: "pointer",
            }}
            mr={4}
          />
          <Box
            w="100%"
            display={{
              base: "none",
              lg: "block",
            }}

          // ml={8}
          >
            {/* for desktop */}
            <SearchBar
              resultClick={clickedSearchTerm}
              showDropdown={showDropdown}
              searchText={searchText}
              onChange={onSearchChange}
              handleHide={handleHide}
              hideDropdown={handleHide}
              searchResult={searchData}
              currentCat={currentCat}
              setcurrentCat={setcurrentCat}
            />
          </Box>
        </HStack>
        <Box display={showSearch ? "none" : "flex"}>
          <Flex
            display={{
              base: "none",
              lg: "flex",
            }}
            alignItems="center"
          >
            <Button
              leftIcon={<FaArrowAltCircleUp />}
              mr={1}
            // onClick={() => history.push(UPLOAD)}
            >
              Upload
            </Button>
            {user.success ? (
              <Menu>
                <MenuButton as="button">
                  <Flex alignItems="center" color="#fff">
                    <Avatar src={user.data.image} width="36px" height="36px" />
                    <Text mx={2}>{user.data.userName}</Text>
                    <BiChevronDown />
                  </Flex>
                </MenuButton>
                <MenuList>
                  <MenuItem>Profile</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Button>
                Log in
              </Button>
            )}
          </Flex>
          <Flex>
            <Button
              onClick={() => setshowSearch(true)}
              display={{
                base: "block",
                lg: "none",
              }}
            >
              <HiOutlineSearch />
            </Button>
            {/* removed the color toggle mode for now */}
            {/* <Button onClick={() => toggleColorMode()}>
              {colorMode === "light" ? <FaSun /> : <FaMoon />}
            </Button> */}
          </Flex>
        </Box>
      </Flex >
    </Box >
  );
};

export default NavBar;
