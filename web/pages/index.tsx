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
import { contractAddresses } from "web/constants/contractAddresses";

const Home: NextPage = () => {
  const { network } = useNetwork();
  const isNetworkAllowed = [Goerli.chainId, Hardhat.chainId].includes(
    network.chainId || 0
  );
  const tokenStoreContract =
    network?.chainId && isNetworkAllowed
      ? (new ethers.Contract(
          contractAddresses[network?.chainId],
          abi
        ) as TokenStore)
      : undefined;
  const { activateBrowserWallet, account, deactivate } = useEthers();
  const etherBalance = useEtherBalance(account);
  const [loadingTokens, setLoadingTokens] = useState(false);
  const [inputAmounts, setInputAmounts] = useState<{
    [tokenId: number]: number;
  }>({});
  const [metadatas, setMetadatas] = useState<
    { name: string; description: string; image: string }[]
  >([]);
  const [imagedatas, setImagedatas] = useState<string[]>([]);

  const nextTokenIdCallResult = useCall(
    tokenStoreContract && {
      contract: tokenStoreContract,
      method: "nextTokenId",
      args: [],
    }
  );
  const nextTokenId = nextTokenIdCallResult?.value?.[0].toNumber() || 0;
  const tokensIds = Array.from({ length: nextTokenId }, (_, index) => index);

  const tokenBalancesResults = useCalls(
    tokensIds.map(
      (tokenId) =>
        tokenStoreContract && {
          contract: tokenStoreContract,
          method: "balanceOf",
          args: [account, tokenId],
        }
    )
  );
  const tokenBalances: ethers.BigNumber[] = useMemo(
    () => tokenBalancesResults?.map((balance) => balance?.value?.[0]),
    [tokenBalancesResults]
  );

  const ipfsPathsResults = useCalls(
    tokensIds.map(
      (tokenId) =>
        tokenStoreContract && {
          contract: tokenStoreContract,
          method: "uri",
          args: [tokenId],
        }
    )
  );
  const ipfsPaths: string[] = useMemo(
    () => ipfsPathsResults?.map((ifpsPath) => ifpsPath?.value?.[0]),
    [ipfsPathsResults]
  );

  useEffect(() => {
    setLoadingTokens(true);
    const getIpfsData = async () => {
      const metadatas = await Promise.all(
        ipfsPaths.map(
          (ipfsPath) =>
            ipfsPath &&
            fetch(
              `https://multi-token-minter.infura-ipfs.io/ipfs/${ipfsPath}`
            ).then((res) => res.json())
        )
      );
      const imagedatas = await Promise.all(
        metadatas.map(
          (metadata) =>
            metadata &&
            fetch(
              `https://multi-token-minter.infura-ipfs.io/ipfs/${metadata.image}`
            ).then((res) => res.text())
        )
      );
      setMetadatas(metadatas);
      setImagedatas(imagedatas);
      setLoadingTokens(false);
    };
    getIpfsData();
  }, [ipfsPaths]);

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
        {account && isNetworkAllowed && (
          <Box mt={4}>
            <InitializeTokenModal tokenStoreContract={tokenStoreContract} />
          </Box>
        )}
        {loadingTokens && (
          <Spinner
            mt={4}
            size="xl"
            style={{ position: "fixed", top: 0, right: "1rem" }}
          />
        )}
        {metadatas?.map(
          (metadata, tokenId) =>
            metadata && (
              <Stack key={tokenId} mt={4} direction="row">
                <img
                  alt={metadata.name}
                  src={imagedatas[tokenId]}
                  style={{ maxWidth: "150px" }}
                />
                <Box>
                  <Box>Name: {metadata.name}</Box>
                  <Box mt={1}>Description: {metadata.description}</Box>
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
            )
        )}
      </Box>
    </div>
  );
};

export default Home;
