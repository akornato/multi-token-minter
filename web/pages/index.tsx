import { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { Box, Button } from "@chakra-ui/react";
import { useEtherBalance, useEthers } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";
import { IpfsUpload } from "../components/IpfsUpload";

const Home: NextPage = () => {
  const { activateBrowserWallet, account } = useEthers();
  const etherBalance = useEtherBalance(account);
  const [ipfsPath, setIpfsPath] = useState<string>();

  return (
    <div>
      <Head>
        <title>Multi Token Minter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box m={4}>
        <Button onClick={activateBrowserWallet}>Connect</Button>{" "}
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
            <Button mt={4} colorScheme="blue">
              Mint
            </Button>
          </>
        )}
      </Box>
    </div>
  );
};

export default Home;
