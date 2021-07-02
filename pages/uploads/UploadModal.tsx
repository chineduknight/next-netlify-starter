import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
  FormLabel,
  FormControl,
  Grid,
  Spinner,
  Center,
  FormHelperText,
  Input,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { BiChevronDown } from "react-icons/bi";
import { MassParts, seasons, languages } from "utils/constants";
import { nanoid } from "nanoid";
type UploadModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onChange: (target) => void;
  handleFileUpload: (event) => void;
  handleSubmit: () => void;
  formData: any;
  isLoading: boolean;
};

const UploadModal = (props: UploadModalProps) => {
  const {
    isOpen,
    onClose,
    onChange,
    handleFileUpload,
    formData,
    handleSubmit,
    isLoading,
  } = props;
  const {
    name,
    composer,
    category,
    audioName,
    documentName,
    videoUrl,
    description,
  } = formData;

  const setcurrentCat = (value) => {
    onChange({
      target: {
        name: "category",
        value,
      },
    });
  };
  return (
    <>
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        closeOnOverlayClick={false}
        size="4xl"
        blockScrollOnMount
      >
        <ModalOverlay />
        <ModalContent>
          {isLoading && (
            <Center
              position="absolute"
              top="1px"
              bottom="0"
              left="0"
              right="0"
              width="100%"
              bg="blackAlpha.700"
              height="100%"
              mx="auto"
              zIndex="9"
            >
              <Flex flexDir="column" alignItems="center" justifyContent="center">
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="xl"
                />
                <Text mt={4} color="#fff">Uploading file please wait...</Text>
              </Flex>
            </Center>
          )}
          <ModalHeader textAlign="center" fontSize="3xl" color="blackAlpha.700">
            New Script
          </ModalHeader>
          <ModalCloseButton />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <ModalBody>
              <Grid
                templateColumns={{
                  base: "repeat(1, 1fr)",
                  lg: "repeat(2, 1fr)",
                }}
                gap={8}
              >
                <Box>
                  <FormControl id="scriptName" isRequired mb={4}>
                    <FormLabel mb={1}>Script Name</FormLabel>
                    <Input
                      type="text"
                      _focus={{ boxShadow: "none" }}
                      name="name"
                      placeholder="Eg Blessed Assurance"
                      value={name}
                      onChange={onChange}
                    />
                  </FormControl>
                  <FormControl id="composerName" isRequired mb={4}>
                    <FormLabel mb={1}>Composer</FormLabel>
                    <Input
                      type="text"
                      _focus={{ boxShadow: "none" }}
                      placeholder="Eg Jude Nnam"
                      name="composer"
                      value={composer}
                      onChange={onChange}
                    />
                    <FormHelperText m={0}>You can put unknown</FormHelperText>
                  </FormControl>
                  <FormControl id="category" isRequired mb={4}>
                    <FormLabel mb={1}>Category</FormLabel>
                    <Menu>
                      <MenuButton as={Button} variant="secondaryOutline" mr={2}>
                        <Flex alignItems="center">
                          <Text color="#7F94A6" fontSize="sm" mr={2}>
                            {category}
                          </Text>{" "}
                          <BiChevronDown color="#7F94A6" />
                        </Flex>
                      </MenuButton>
                      <MenuList fontSize="sm">
                        <MenuItem onClick={() => setcurrentCat("All")}>
                          All
                        </MenuItem>
                        <MenuGroup title="Mass Parts">
                          {MassParts.map((part) => (
                            <MenuItem
                              key={nanoid()}
                              onClick={() => setcurrentCat(part)}
                            >
                              {part}
                            </MenuItem>
                          ))}
                        </MenuGroup>
                        <MenuDivider />
                        <MenuGroup title="Seasons">
                          {seasons.map((part) => (
                            <MenuItem
                              key={nanoid()}
                              onClick={() => setcurrentCat(part)}
                            >
                              {part}
                            </MenuItem>
                          ))}
                        </MenuGroup>
                        <MenuDivider />
                        <MenuGroup title="Languages">
                          {languages.map((part) => (
                            <MenuItem
                              key={nanoid()}
                              onClick={() => setcurrentCat(part)}
                            >
                              {part}
                            </MenuItem>
                          ))}
                        </MenuGroup>
                        <MenuDivider />
                        <MenuGroup title="Others">
                          <MenuItem
                            onClick={() => setcurrentCat("Custom Category")}
                          >
                            Custom Category
                          </MenuItem>
                        </MenuGroup>
                      </MenuList>
                    </Menu>
                  </FormControl>

                  <FormControl id="videoUrl" mb={4}>
                    <FormLabel mb={1}>Video Url</FormLabel>
                    <Input
                      type="text"
                      _focus={{ boxShadow: "none" }}
                      placeholder="Optional Youtube video"
                      name="videoUrl"
                      value={videoUrl}
                      onChange={onChange}
                    />
                  </FormControl>
                  <FormControl id="description" mb={4}>
                    <FormLabel mb={1}>Description</FormLabel>
                    <Input
                      type="text"
                      _focus={{ boxShadow: "none" }}
                      placeholder="Optional description"
                      name="description"
                      value={description}
                      onChange={onChange}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="image" isRequired mb={4}>
                    <FormLabel mb={1}>Script Image/PDF</FormLabel>
                    <Flex>
                      <Input
                        type="file"
                        name="document"
                        id="actual-btn"
                        onChange={handleFileUpload}
                        accept="image/*, .pdf"
                        display="none"
                      />

                      <Input
                        type="text"
                        _focus={{ boxShadow: "none" }}
                        placeholder="Choose a file"
                        value={documentName}
                        readOnly
                        rounded={0}
                        borderLeftRadius="md"
                      />
                      <Button
                        onClick={() => {
                          document.getElementById("actual-btn")?.click();
                        }}
                        rounded={0}
                        borderRightRadius="md"
                        boxShadow="md"
                      >
                        Browse
                      </Button>
                    </Flex>
                  </FormControl>

                  <FormControl id="audio" mb={4}>
                    <FormLabel mb={1}>Audio (Optional)</FormLabel>
                    <Flex>
                      <Input
                        type="file"
                        id="audio-btn"
                        name="audio"
                        onChange={handleFileUpload}
                        // accept=".aac, .mp3"
                        display="none"
                      />

                      <Input
                        type="text"
                        _focus={{ boxShadow: "none" }}
                        placeholder="Choose an audio file"
                        value={audioName}
                        readOnly
                        rounded={0}
                        borderLeftRadius="md"
                      />
                      <Button
                        onClick={() => {
                          document.getElementById("audio-btn")?.click();
                        }}
                        rounded={0}
                        borderRightRadius="md"
                        boxShadow="md"
                      >
                        Browse
                      </Button>
                    </Flex>
                  </FormControl>
                </Box>
              </Grid>
            </ModalBody>
            <ModalFooter>
              <Button variant="secondaryOutline" mr={4} onClick={onClose}>
                Close
              </Button>
              <Button type="submit">Save</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UploadModal;
