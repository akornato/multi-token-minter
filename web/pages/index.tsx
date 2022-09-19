import type { NextPage } from "next";
import Head from "next/head";
import { Box, Stack, Button } from "@chakra-ui/react";
import { useEtherBalance, useEthers } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";

const Home: NextPage = () => {
  const { activateBrowserWallet, account } = useEthers();
  const etherBalance = useEtherBalance(account);
  return (
    <div>
      <Head>
        <title>Multi Token Minter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box m={4}>
        <Stack direction="row">
          <Button onClick={activateBrowserWallet}>Connect</Button>{" "}
          <Button colorScheme="blue">Mint</Button>
        </Stack>
        {account && <Box mt={4}>Account: {account}</Box>}
        {etherBalance && <Box mt={4}>Balance: {formatEther(etherBalance)} ETH</Box>}
      </Box>
    </div>
  );
};

export default Home;
