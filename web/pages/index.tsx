import { useState, useEffect, useCallback, useMemo } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { ethers } from "ethers";
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
  Alert,
  AlertIcon,
  AlertDescription,
  Spinner,
} from "@chakra-ui/react";
import {
  useEtherBalance,
  useEthers,
  useContractFunction,
  useCall,
  useCalls,
  useNetwork,
  Goerli,
  Hardhat,
} from "@usedapp/core";
import { formatEther } from "@ethersproject/units";
import { abi } from "sol/artifacts/contracts/TokenStore.sol/TokenStore.json";
import { TokenStore } from "sol/typechain-types";
import { InitializeTokenModal } from "web/components/InitializeTokenModal";

const tokenStoreContract = new ethers.Contract(
  process.env.NEXT_PUBLIC_TOKEN_STORE_CONTRACT_ADDRESS || "",
  abi
) as TokenStore;

const Home: NextPage = () => {
  const { network } = useNetwork();
  const isNetworkAllowed = [Goerli.chainId, Hardhat.chainId].includes(
    network.chainId || 0
  );
  const { activateBrowserWallet, account, deactivate } = useEthers();
  const etherBalance = useEtherBalance(account);
  const [loadingTokens, setLoadingTokens] = useState(false);
  const [inputAmounts, setInputAmounts] = useState<{
    [tokenId: number]: number;
  }>({});

  useEffect(() => {
    if (network.chainId && isNetworkAllowed) {
      setLoadingTokens(true);
    }
  }, [network.chainId, isNetworkAllowed]);

  const nextTokenIdCallResult = useCall({
    contract: tokenStoreContract,
    method: "nextTokenId",
    args: [],
  });
  const nextTokenId = nextTokenIdCallResult?.value?.[0].toNumber() || 0;
  const tokensIds = Array.from({ length: nextTokenId }, (_, index) => index);

  const tokenBalancesResults = useCalls(
    tokensIds.map((tokenId) => ({
      contract: tokenStoreContract,
      method: "balanceOf",
      args: [account, tokenId],
    }))
  );
  const tokenBalances: ethers.BigNumber[] = useMemo(
    () =>
      tokenBalancesResults
        ?.map((balance) => balance?.value?.[0])
        .reduce((acc, cur) => (cur ? [...acc, cur] : acc), []),
    [tokenBalancesResults]
  );

  const ipfsPathsResults = useCalls(
    tokensIds.map((tokenId) => ({
      contract: tokenStoreContract,
      method: "uri",
      args: [tokenId],
    }))
  );
  const ipfsPaths: string[] = useMemo(
    () =>
      ipfsPathsResults
        ?.map((ifpsPath) => ifpsPath?.value?.[0])
        .reduce((acc, cur) => (cur ? [...acc, cur] : acc), []),
    [ipfsPathsResults]
  );

  const [metadatas, setMetadatas] = useState<
    { name: string; description: string; image: string }[]
  >([]);
  const [imagedatas, setImagedatas] = useState<string[]>([]);

  useEffect(() => {
    const getMetadatas = async () => {
      if (ipfsPaths.length > 0) {
        const metadatas = await Promise.all(
          ipfsPaths.map((ipfsPath) =>
            fetch(
              `https://multi-token-minter.infura-ipfs.io/ipfs/${ipfsPath}`
            ).then((res) => res.json())
          )
        );
        setMetadatas(metadatas);
      }
    };
    getMetadatas();
  }, [ipfsPaths]);

  useEffect(() => {
    const getImagedatas = async () => {
      if (metadatas.length > 0) {
        const imagedatas = await Promise.all(
          metadatas.map(({ image }) =>
            fetch(
              `https://multi-token-minter.infura-ipfs.io/ipfs/${image}`
            ).then((res) => res.text())
          )
        );
        setImagedatas(imagedatas);
        setLoadingTokens(false);
      }
    };
    getImagedatas();
  }, [metadatas]);

  const { send: sendMintToken } = useContractFunction(
    tokenStoreContract,
    "mint"
  );

  const mintToken = useCallback(
    async (tokenId: number) => {
      if (account && inputAmounts[tokenId]) {
        sendMintToken(account, tokenId, inputAmounts[tokenId], []);
      }
    },
    [account, inputAmounts, sendMintToken]
  );

  return (
    <div>
      <Head>
        <title>Multi Token Minter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box m={4}>
        <Button onClick={account ? deactivate : activateBrowserWallet}>
          {account ? "Disconnect" : "Connect"}
        </Button>
        {account && !isNetworkAllowed && (
          <Alert status="error" mt={4}>
            <AlertIcon />
            <AlertDescription>
              Switch to either Goerli or Hardhat network in Metamask
            </AlertDescription>
          </Alert>
        )}
        {account && <Box mt={4}>Account: {account}</Box>}
        {etherBalance && (
          <Box mt={4}>Balance: {formatEther(etherBalance)} ETH</Box>
        )}
        {account && (
          <Box mt={4}>
            <InitializeTokenModal />
          </Box>
        )}
        {loadingTokens && <Spinner mt={4} size="xl" />}
        {metadatas?.map(({ name, description }, tokenId) => (
          <Stack key={tokenId} mt={4} direction="row">
            <img
              alt={name}
              src={imagedatas[tokenId]}
              style={{ maxWidth: "150px" }}
            />
            <Box>
              <Box>Name: {name}</Box>
              <Box mt={1}>Description: {description}</Box>
              <Box mt={1}>
                Balance: {tokenBalances[tokenId]?.toString() || 0}
              </Box>
              <Stack mt={4} direction="row">
                <InputGroup>
                  <InputLeftAddon>Amount</InputLeftAddon>
                  <Input
                    type="number"
                    value={inputAmounts[tokenId] || ""}
                    onChange={(event) =>
                      setInputAmounts((inputAmounts) => ({
                        ...inputAmounts,
                        [tokenId]: parseInt(event.target.value),
                      }))
                    }
                  />
                </InputGroup>
                <Button
                  onClick={() => mintToken(tokenId)}
                  disabled={!inputAmounts[tokenId]}
                >
                  Mint
                </Button>
              </Stack>
            </Box>
          </Stack>
        ))}
      </Box>
    </div>
  );
};

export default Home;
