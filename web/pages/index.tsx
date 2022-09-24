import { useState, useCallback } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { ethers } from "ethers";
import {
  Box,
  Button,
  InputGroup,
  InputLeftAddon,
  Input,
} from "@chakra-ui/react";
import { useEtherBalance, useEthers, useContractFunction } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";
import { IpfsUpload } from "web/components/IpfsUpload";
import { abi } from "sol/artifacts/contracts/TokenStore.sol/TokenStore.json";
import { TokenStore } from "sol/typechain-types";

const Home: NextPage = () => {
  const { activateBrowserWallet, account, deactivate } = useEthers();
  const etherBalance = useEtherBalance(account);
  const [ipfsPath, setIpfsPath] = useState<string>();
  const [tokenId, setTokenId] = useState<string>();
  const [amount, setAmount] = useState<number>();
  const { send: sendInitializeToken } = useContractFunction(
    new ethers.Contract(
      process.env.NEXT_PUBLIC_TOKEN_STORE_CONTRACT_ADDRESS || "",
      abi
    ) as TokenStore,
    "initializeToken"
  );

  const { send: sendMintToken } = useContractFunction(
    new ethers.Contract(
      process.env.NEXT_PUBLIC_TOKEN_STORE_CONTRACT_ADDRESS || "",
      abi
    ) as TokenStore,
    "mint"
  );

  const initializeToken = useCallback(async () => {
    if (tokenId && ipfsPath) {
      sendInitializeToken(tokenId, ipfsPath);
    }
  }, [tokenId, ipfsPath, sendInitializeToken]);

  const mintToken = useCallback(async () => {
    if (account && tokenId && amount) {
      sendMintToken(account, tokenId, amount, "0x0");
    }
  }, [account, tokenId, amount, sendMintToken]);

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
                onChange={(event) => setTokenId(event.target.value)}
              />
            </InputGroup>
            <Button mt={4} colorScheme="blue" onClick={initializeToken}>
              Initialize Token
            </Button>
            <InputGroup mt={4}>
              <InputLeftAddon>Amount</InputLeftAddon>
              <Input
                type="number"
                onChange={(event) => setAmount(parseInt(event.target.value))}
              />
            </InputGroup>
            <Button mt={4} colorScheme="blue" onClick={mintToken}>
              Mint Token
            </Button>
          </>
        )}
      </Box>
    </div>
  );
};

export default Home;
