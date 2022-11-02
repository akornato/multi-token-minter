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
  useCall,
  useCalls,
  Goerli,
  Mumbai,
  Hardhat,
} from "@usedapp/core";
import { usePrevious } from "react-use";
import { isEqual } from "lodash";
import { formatEther } from "@ethersproject/units";
import { abi } from "sol/artifacts/contracts/TokenStore.sol/TokenStore.json";
import { InitializeTokenModal } from "web/components/InitializeTokenModal";
import { useGSN } from "web/hooks/useGSN";
import { useAddresses } from "../hooks/useAddresses";
import type { TokenStore } from "sol/typechain-types";

const Home: NextPage = () => {
  const { activateBrowserWallet, account, deactivate, chainId } = useEthers();
  const { tokenStoreAddress } = useAddresses();
  const isNetworkAllowed = [
    Goerli.chainId,
    Mumbai.chainId,
    Hardhat.chainId,
  ].includes(chainId || 0);
  const tokenStoreContract = useMemo(
    () =>
      tokenStoreAddress
        ? (new ethers.Contract(tokenStoreAddress, abi) as TokenStore)
        : undefined,
    [tokenStoreAddress]
  );
  const { relayProvider } = useGSN();
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
  const prevIpfsPaths = usePrevious(ipfsPaths);

  useEffect(() => {
    if (isEqual(ipfsPaths, prevIpfsPaths)) return;

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
  }, [ipfsPaths, prevIpfsPaths]);

  const mintToken = useCallback(
    async (tokenId: number) => {
      if (account && inputAmounts[tokenId] && relayProvider) {
        // @ts-ignore
        const ethersProvider = new ethers.providers.Web3Provider(relayProvider);
        tokenStoreContract
          // @ts-ignore
          ?.connect(ethersProvider.getSigner(account))
          .mint(account, tokenId, inputAmounts[tokenId], []);
      }
    },
    [account, inputAmounts, tokenStoreContract, relayProvider]
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
              Switch to either Ethereum Goerli, Polygon Mumbai or Hardhat
              network in Metamask
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
            style={{ position: "fixed", bottom: "1rem", left: "1rem" }}
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
