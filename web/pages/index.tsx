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
  chain as chains,
  useNetwork,
  useBalance,
  useConnect,
  useDisconnect,
  useAccount,
  useContractRead,
  useContractReads,
} from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { usePrevious } from "react-use";
import { isEqual } from "lodash";
import { abi as tokenStoreAbi } from "web/types/TokenStore";
import { InitializeTokenModal } from "web/components/InitializeTokenModal";
import { useGSN } from "web/hooks/useGSN";
import { useAddresses } from "../hooks/useAddresses";

const Home: NextPage = () => {
  const { chain } = useNetwork();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();
  const { address } = useAccount();
  const { tokenStoreAddress } = useAddresses();
  const isNetworkAllowed = [
    chains.goerli.id,
    chains.polygonMumbai.id,
    chains.hardhat.id,
  ].includes(chain?.id || 0);
  const { relayProvider } = useGSN();
  const { data: balance } = useBalance(address);
  const [loadingTokens, setLoadingTokens] = useState(false);
  const [inputAmounts, setInputAmounts] = useState<{
    [tokenId: number]: number;
  }>({});
  const [metadatas, setMetadatas] = useState<
    { name: string; description: string; image: string }[]
  >([]);
  const [imagedatas, setImagedatas] = useState<string[]>([]);

  const { data: nextTokenIdData } = useContractRead({
    address: tokenStoreAddress,
    abi: tokenStoreAbi,
    functionName: "nextTokenId",
  });
  const nextTokenId = nextTokenIdData?.toNumber() || 0;
  const tokensIds = Array.from({ length: nextTokenId }, (_, index) => index);

  const { data: tokenBalancesData, status: tokenBalancesStatus } =
    useContractReads({
      contracts: tokensIds.map((tokenId) => ({
        address: tokenStoreAddress,
        abi: tokenStoreAbi,
        functionName: "balanceOf",
        args: [address, tokenId],
      })),
    });
  const tokenBalances = tokenBalancesData as unknown as
    | ethers.BigNumber[]
    | undefined;

  const { data: ipfsPathsData, status: ipfsPathsStatus } = useContractReads({
    contracts: tokensIds.map((tokenId) => ({
      address: tokenStoreAddress,
      abi: tokenStoreAbi,
      functionName: "uri",
      args: [tokenId],
    })),
  });
  const ipfsPaths = ipfsPathsData as unknown as string[] | undefined;
  const prevIpfsPaths = usePrevious(ipfsPaths);

  useEffect(() => {
    if (isEqual(ipfsPaths, prevIpfsPaths)) return;

    const getIpfsData = async () => {
      if (ipfsPaths) {
        setLoadingTokens(true);
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
      }
    };
    getIpfsData();
  }, [ipfsPaths, prevIpfsPaths]);

  const mintToken = useCallback(
    async (tokenId: number) => {
      if (
        address &&
        inputAmounts[tokenId] &&
        relayProvider &&
        tokenStoreAddress
      ) {
        // @ts-ignore
        const ethersProvider = new ethers.providers.Web3Provider(relayProvider);
        new ethers.Contract(tokenStoreAddress, tokenStoreAbi)
          ?.connect(ethersProvider.getSigner(address))
          .mint(address, tokenId, inputAmounts[tokenId], []);
      }
    },
    [address, inputAmounts, tokenStoreAddress, relayProvider]
  );

  return (
    <div>
      <Head>
        <title>Multi Token Minter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box m={4}>
        <Button onClick={() => (address ? disconnect() : connect())}>
          {address ? "Disconnect" : "Connect"}
        </Button>
        {address && !isNetworkAllowed && (
          <Alert status="error" mt={4}>
            <AlertIcon />
            <AlertDescription>
              Switch to either Ethereum Goerli, Polygon Mumbai or Hardhat
              network in Metamask
            </AlertDescription>
          </Alert>
        )}
        {address && <Box mt={4}>Account: {address}</Box>}
        {balance && (
          <Box mt={4}>
            Balance: {balance.formatted} {balance.symbol}
          </Box>
        )}
        {address && isNetworkAllowed && (
          <Box mt={4}>
            <InitializeTokenModal />
          </Box>
        )}
        {loadingTokens && (
          <Spinner
            mt={4}
            size="xl"
            style={{ position: "fixed", bottom: "1rem", left: "1rem" }}
          />
        )}
        {tokenBalances &&
          metadatas?.map(
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
