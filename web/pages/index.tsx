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
import { create, IPFS } from "ipfs-core";
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
  const [ipfs, setIpfs] = useState<IPFS>();
  const [inputAmounts, setInputAmounts] = useState<{
    [tokenId: number]: number;
  }>({});
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
  const tokenBalances: ethers.BigNumber[] = useMemo(() => {
    const tokenBalances = tokenBalancesResults?.map(
      (balance) => balance?.value?.[0]
    );
    // workaround to [undefined] being returned initially for some reason
    if (tokenBalances?.length === 1 && tokenBalances[0] === undefined) {
      return [];
    }
    return tokenBalances;
  }, [tokenBalancesResults]);
  const ipfsPathsResults = useCalls(
    tokensIds.map((tokenId) => ({
      contract: tokenStoreContract,
      method: "uri",
      args: [tokenId],
    }))
  );
  const ipfsPaths = useMemo(() => {
    const ipfsPaths = ipfsPathsResults?.map((ifpsPath) => ifpsPath?.value?.[0]);
    // workaround to [undefined] being returned initially for some reason
    if (ipfsPaths?.length === 1 && ipfsPaths[0] === undefined) {
      return [];
    }
    return ipfsPaths;
  }, [ipfsPathsResults]);
  const [metadatas, setMetadatas] = useState<
    { name: string; description: string; image: string }[]
  >([]);
  const [imagedatas, setImagedatas] = useState<string[]>([]);

  useEffect(() => {
    const getMetadatas = async () => {
      if (ipfsPaths.length > 0) {
        const metadatas = await Promise.all(
          ipfsPaths.map((ipfsPath) =>
            fetch(`https://ipfs.io/ipfs/${ipfsPath}`).then((res) => res.json())
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
            fetch(`https://ipfs.io/ipfs/${image}`).then((res) => res.text())
          )
        );
        setImagedatas(imagedatas);
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

  useEffect(() => {
    const initIpfs = async () => {
      if (!ipfs) {
        try {
          const ipfs = await create();
          setIpfs(ipfs);
        } catch (e) {
          console.log(e);
        }
      }
    };
    initIpfs();
  }, [ipfs]);

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
        <Box mt={4}>IPFS status: {ipfs?.isOnline() ? "Online" : "Offline"}</Box>
        {account && ipfs?.isOnline && (
          <Box mt={4}>
            <InitializeTokenModal ipfs={ipfs} />
          </Box>
        )}
        {metadatas?.map(({ name, description }, tokenId) => (
          <Stack key={tokenId} mt={4} direction="row">
            <img
              alt={name}
              src={imagedatas[tokenId]}
              style={{ maxWidth: "100px" }}
            />
            <Box>
              <Box>Name: {name}</Box>
              <Box mt={1}>Description: {description}</Box>
              <Box mt={1}>Balance: {tokenBalances[tokenId].toString()}</Box>
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
                <Button onClick={() => mintToken(tokenId)}>Mint</Button>
              </Stack>
            </Box>
          </Stack>
        ))}
      </Box>
    </div>
  );
};

export default Home;
