import { useState, useEffect, useCallback } from "react";
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
import { TokenStore } from "sol/typechain-types";
import { useFilePicker } from "use-file-picker";
import { create } from "ipfs-http-client";

const ipfsClient = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization:
      "Basic " +
      Buffer.from(
        process.env.NEXT_PUBLIC_INFURA_PROJECT_ID +
          ":" +
          process.env.NEXT_PUBLIC_INFURA_API_KEY_SECRET
      ).toString("base64"),
  },
});

export const InitializeTokenModal: React.FC = () => {
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

  useEffect(() => {
    const addToIpfs = async () => {
      if (name && description && image) {
        const { path: imageIpfsPath } = await ipfsClient.add(image.content);
        const { path: jsonIpfsPath } = await ipfsClient.add(
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
    };
    addToIpfs();
  }, [name, description, image, setIpfsPath]);

  const initializeToken = useCallback(async () => {
    if (ipfsPath) {
      sendInitializeToken(ipfsPath);
    }
  }, [ipfsPath, sendInitializeToken]);

  return (
    <>
      <Button onClick={onOpen}>Initialize new token</Button>

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
