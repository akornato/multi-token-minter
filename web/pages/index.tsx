import { useState, useCallback } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import {
  Box,
  Button,
  InputGroup,
  InputLeftAddon,
  Input,
} from "@chakra-ui/react";
import { useEtherBalance, useEthers } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";
import { IpfsUpload } from "web/components/IpfsUpload";

const Home: NextPage = () => {
  const { activateBrowserWallet, account, deactivate } = useEthers();
  const etherBalance = useEtherBalance(account);
  const [ipfsPath, setIpfsPath] = useState<string>();
  const [tokenID, setTokenID] = useState<string>();

  const initializeToken = useCallback(async () => {

  }, []);

  return (
    <div>
      <Head>
        <title>Multi Token Minter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box m={4}>
        <Button onClick={account ? deactivate : activateBrowserWallet}>
          {account ? "Disconnect" : "Connect"}
        </Button>{" "}
        {account && <Box mt={4}>Account: {account}</Box>}
        {etherBalance && (
          <Box mt={4}>Balance: {formatEther(etherBalance)} ETH</Box>
        )}
        <Box mt={4}>
          <IpfsUpload setIpfsPath={setIpfsPath} />
        </Box>
        {ipfsPath && (
          <>
            <Box mt={4}>IPFS path: {ipfsPath}</Box>
            <InputGroup mt={4}>
              <InputLeftAddon>Token ID</InputLeftAddon>
              <Input
                type="string"
                onChange={(event) => setTokenID(event.target.value)}
              />
            </InputGroup>
            <Button mt={4} colorScheme="blue" onClick={initializeToken}>
              Initialize Token
            </Button>
          </>
        )}
      </Box>
    </div>
  );
};

export default Home;
