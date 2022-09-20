import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Alert,
  AlertIcon,
  AlertDescription,
} from "@chakra-ui/react";
import { create, IPFS } from "ipfs-core";
import { useFilePicker } from "use-file-picker";

export const IpfsUpload: React.FC<{
  setIpfsPath: (path: string) => void;
}> = ({ setIpfsPath }) => {
  const [ipfs, setIpfs] = useState<IPFS>();
  const [
    openFileSelector,
    { filesContent, loading: fileLoading, errors: fileErrors },
  ] = useFilePicker({
    readAs: "DataURL",
    accept: "image/*",
    multiple: false,
    maxFileSize: 1,
  });

  useEffect(() => {
    if (!ipfs) {
      create().then(setIpfs);
    }
  }, [ipfs]);

  return (
    <>
      <h4>IPFS status: {ipfs?.isOnline() ? "Online" : "Offline"}</h4>
      <Button mt={4} onClick={() => openFileSelector()} isLoading={fileLoading}>
        Select token image
      </Button>
      {filesContent.map((file, index) => (
        <Box mt={4} key={index}>
          <img alt={file.name} src={file.content} />
          <Button
            mt={4}
            onClick={() =>
              ipfs
                ?.add(file.content)
                .then((addResult) => setIpfsPath(addResult.path))
            }
          >
            Add to IPFS
          </Button>
        </Box>
      ))}
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
    </>
  );
};
