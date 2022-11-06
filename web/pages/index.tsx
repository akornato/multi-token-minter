import { useState, useEffect } from "react";
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
import { abi as tokenStoreAbi } from "sol/typechain-types/factories/contracts/TokenStore.abi.const";
import { InitializeTokenModal } from "web/components/InitializeTokenModal";
import { useRelayedTokenStore } from "web/hooks/useRelayedTokenStore";
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
    chains.polygonMumbai.id,
    chains.hardhat.id,
  ].includes(chain?.id || 0);
  const { relayedTokenStoreContract } = useRelayedTokenStore();
  const { data: balance } = useBalance({
    addressOrName: address,
  });
  const [loadingTokens, setLoadingTokens] = useState(false);
  const [inputAmounts, setInputAmounts] = useState<{
    [tokenId: number]: number;
  }>({});
  const [metadatas, setMetadatas] = useState<
    { name: string; description: string; image: string }[]
  >([]);
  const [imagedatas, setImagedatas] = useState<string[]>([]);
  const [isMintingTokenId, setIsMintingTokenId] = useState<number>();

  const { data: nextTokenIdData } = useContractRead({
    address: tokenStoreAddress,
    abi: tokenStoreAbi,
    functionName: "nextTokenId",
  });
  const nextTokenId = nextTokenIdData?.toNumber() || 0;
  const tokensIds = Array.from({ length: nextTokenId }, (_, index) => index);

  const { data: tokenBalancesData } = useContractReads({
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

  const { data: ipfsPathsData } = useContractReads({
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
              Switch to either Polygon Mumbai or Hardhat network in Metamask
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
                        onClick={async () => {
                          if (address && relayedTokenStoreContract) {
                            setIsMintingTokenId(tokenId);
                            try {
                              await relayedTokenStoreContract.mint(
                                address,
                                tokenId,
                                inputAmounts[tokenId],
                                []
                              );
                            } catch (e) {
                            } finally {
                              setIsMintingTokenId(undefined);
                            }
                          }
                        }}
                        isLoading={isMintingTokenId === tokenId}
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
