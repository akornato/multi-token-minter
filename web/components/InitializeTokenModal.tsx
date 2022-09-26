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
import { useContractFunction } from "@usedapp/core";
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

export const InitializeTokenModal: React.FC<{
  tokenStoreContract?: TokenStore;
}> = ({ tokenStoreContract }) => {
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
  const { state: sendInitializeTokenState, send: sendInitializeToken } =
    useContractFunction(tokenStoreContract, "initializeToken");
  const [isAddingToIpfs, setIsAddingToIpfs] = useState(false);
  const isInitializing = ["PendingSignature", "Mining"].includes(
    sendInitializeTokenState.status
  );

  const addToIpfs = useCallback(async () => {
    if (name && description && image) {
      setIsAddingToIpfs(true);
      const { path: imageIpfsPath } = await ipfsClient.add(image.content);
      const { path: jsonIpfsPath } = await ipfsClient.add(
        JSON.stringify({
          name,
          description,
          image: imageIpfsPath,
        })
      );
      setIpfsPath(jsonIpfsPath);
      setIsAddingToIpfs(false);
    }
  }, [name, description, image]);

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
              mr={4}
              onClick={addToIpfs}
              disabled={!name || !description || !image}
              isLoading={isAddingToIpfs}
            >
              Add to IPFS
            </Button>
            <Button
              mr={4}
              onClick={initializeToken}
              disabled={!name || !description || !image || !ipfsPath}
              isLoading={isInitializing}
            >
              Initialize Token
            </Button>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
