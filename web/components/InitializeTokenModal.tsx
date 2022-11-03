import { useState, useCallback } from "react";
import { ethers } from "ethers";
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
import { useAccount } from "wagmi";
import { abi as tokenStoreAbi } from "web/types/TokenStore";
import { useFilePicker } from "use-file-picker";
import { useGSN } from "web/hooks/useGSN";
import { useAddresses } from "web/hooks/useAddresses";

export const InitializeTokenModal: React.FC = () => {
  const { address } = useAccount();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { tokenStoreAddress } = useAddresses();
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
  const [isAddingToIpfs, setIsAddingToIpfs] = useState(false);
  const { relayProvider } = useGSN();

  const addToIpfs = useCallback(async () => {
    if (name && description && image) {
      setIsAddingToIpfs(true);
      const { path: imageIpfsPath } = await fetch("/api/ipfs/add", {
        method: "POST",
        body: image.content,
      }).then((res) => res.json());
      const { path: jsonIpfsPath } = await fetch("/api/ipfs/add", {
        method: "POST",
        body: JSON.stringify({
          name,
          description,
          image: imageIpfsPath,
        }),
      }).then((res) => res.json());
      setIpfsPath(jsonIpfsPath);
      setIsAddingToIpfs(false);
    }
  }, [name, description, image]);

  const initializeToken = useCallback(async () => {
    if (ipfsPath && tokenStoreAddress) {
      // @ts-ignore
      const ethersProvider = new ethers.providers.Web3Provider(relayProvider);
      new ethers.Contract(tokenStoreAddress, tokenStoreAbi)
        ?.connect(ethersProvider.getSigner(address))
        .initializeToken(ipfsPath);
    }
  }, [ipfsPath, relayProvider, tokenStoreAddress, address]);

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
