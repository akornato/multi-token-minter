import { useState, useEffect, useCallback } from "react";
import {
  Box,
  Button,
  Alert,
  AlertIcon,
  AlertDescription,
  Input,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import { create, IPFS } from "ipfs-core";
import { useFilePicker } from "use-file-picker";

export const IpfsUpload: React.FC<{
  setIpfsPath: (path: string) => void;
}> = ({ setIpfsPath }) => {
  const [ipfs, setIpfs] = useState<IPFS>();
  const [name, setName] = useState<string>();
  const [description, setDescription] = useState<string>();
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

  useEffect(() => {
    if (!ipfs) {
      create().then(setIpfs);
    }
  }, [ipfs]);

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

  return (
    <>
      <h4>IPFS status: {ipfs?.isOnline() ? "Online" : "Offline"}</h4>
      <InputGroup mt={4}>
        <InputLeftAddon>Token name</InputLeftAddon>
        <Input
          type="string"
          onChange={(event) => setName(event.target.value)}
        />
      </InputGroup>
      <InputGroup mt={4}>
        <InputLeftAddon>Token description</InputLeftAddon>
        <Input
          type="string"
          onChange={(event) => setDescription(event.target.value)}
        />
      </InputGroup>
      <Button mt={4} onClick={() => openFileSelector()} isLoading={fileLoading}>
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
              {fileError.readerError && "Problem occured while reading file!"}
            </AlertDescription>
          </Alert>
        ))}
      {ipfs && name && description && image && (
        <Box mt={4}>
          <Button onClick={addToIpfs}>Add metadata to IPFS</Button>
        </Box>
      )}
    </>
  );
};
