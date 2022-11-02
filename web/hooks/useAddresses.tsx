import { Goerli, Mumbai, Hardhat, useEthers } from "@usedapp/core";
import { address as hardhatMultiCallAddress } from "sol/build/Multicall.json";
import { address as hardhatTokenStoreAddress } from "sol/build/TokenStore.json";
import { address as paymasterAddress } from "sol/build/gsn/Paymaster.json";

export const multiCallAddresses = {
  [Goerli.chainId]: Goerli.multicallAddress,
  [Mumbai.chainId]: Mumbai.multicallAddress,
  [Hardhat.chainId]: hardhatMultiCallAddress,
};

const tokenStoreAddresses = {
  [Goerli.chainId]: "0xb1Af5338A8173676EA628D3Fa8235bafFdfa1ceD",
  [Mumbai.chainId]: "0xE641E9e196FE91d3C3A0803f5abd0cA0Ff865b0B",
  [Hardhat.chainId]: hardhatTokenStoreAddress,
};

const paymasterAddresses = {
  [Goerli.chainId]: "0x7C10d29cfc9951958d8ffF6d9D9c9697A146bf70", // https://docs.opengsn.org/networks/ethereum/goerli.html
  [Mumbai.chainId]: "0x327BBd6BAc3236BCAcDE0D0f4FCD08b3eDfFbc06", // https://docs.opengsn.org/networks/polygon/mumbai.html
  [Hardhat.chainId]: paymasterAddress,
};

export const useAddresses = () => {
  const { chainId } = useEthers();

  return chainId
    ? {
        multiCallAddress: multiCallAddresses[chainId],
        tokenStoreAddress: tokenStoreAddresses[chainId],
        paymasterAddress: paymasterAddresses[chainId],
      }
    : {};
};
