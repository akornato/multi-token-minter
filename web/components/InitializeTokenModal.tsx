import { useState, useCallback } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Box,
  Alert,
  AlertIcon,
  AlertDescription,
  Input,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import { useContractFunction } from "@usedapp/core";
import { abi } from "sol/artifacts/contracts/TokenStore.sol/TokenStore.json";
import { IPFS } from "ipfs-core";
import { TokenStore } from "sol/typechain-types";
import { useFilePicker } from "use-file-picker";

export const InitializeTokenModal: React.FC<{ ipfs?: IPFS }> = ({ ipfs }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [
    openFileSelector,
    { filesContent, loading: fileLoading, errors: fileErrors },
  ] = useFilePicker({
    readAs: "DataURL",
    accept: "image/*",
    multiple: false,
    maxFileSize: 1,
  });
  const image = filesContent[0];
  const [ipfsPath, setIpfsPath] = useState<string>();
  const { send: sendInitializeToken } = useContractFunction(
    new ethers.Contract(
      process.env.NEXT_PUBLIC_TOKEN_STORE_CONTRACT_ADDRESS || "",
      abi
    ) as TokenStore,
    "initializeToken"
  );

  const addToIpfs = useCallback(async () => {
    if (ipfs && name && description && image) {
      const { path: imageIpfsPath } = await ipfs.add(image.content);
      const { path: jsonIpfsPath } = await ipfs.add(
        Buffer.from(
          JSON.stringify({
            name,
            description,
            image: imageIpfsPath,
          })
        )
      );
      setIpfsPath(jsonIpfsPath);
    }
  }, [ipfs, name, description, image, setIpfsPath]);

  const initializeToken = useCallback(async () => {
    if (ipfsPath) {
      sendInitializeToken(ipfsPath);
    }
  }, [ipfsPath, sendInitializeToken]);

  return (
    <>
      <Button onClick={onOpen} disabled={!ipfs?.isOnline()}>
        Initialize new token
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Initialize new token</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <InputGroup mt={4}>
              <InputLeftAddon>Token name</InputLeftAddon>
              <Input
                type="string"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </InputGroup>
            <InputGroup mt={4}>
              <InputLeftAddon>Token description</InputLeftAddon>
              <Input
                type="string"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </InputGroup>
            <Button
              mt={4}
              onClick={() => openFileSelector()}
              isLoading={fileLoading}
            >
              Select token image
            </Button>
            {image && (
              <Box mt={4}>
                <img alt={image.name} src={image.content} />
              </Box>
            )}
            {fileErrors &&
              fileErrors.map((fileError, index) => (
                <Alert key={index} status="error" mt={4}>
                  <AlertIcon />
                  <AlertDescription>
                    {fileError.fileSizeToolarge && "File size is too large!"}
                    {fileError.readerError &&
                      "Problem occured while reading file!"}
                  </AlertDescription>
                </Alert>
              ))}
            {ipfs && name && description && image && (
              <Box mt={4}>
                <Button onClick={addToIpfs}>Add metadata to IPFS</Button>
              </Box>
            )}
            {ipfsPath && (
              <>
                <Box mt={4}>IPFS path: {ipfsPath}</Box>
              </>
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={4}
              onClick={initializeToken}
              disabled={!name || !description || !image || !ipfsPath}
            >
              Initialize Token
            </Button>
            <Button colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
