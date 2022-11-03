import { chain as chains, useNetwork } from "wagmi";
import { address as hardhatTokenStoreAddress } from "sol/build/TokenStore.json";
import { address as paymasterAddress } from "sol/build/gsn/Paymaster.json";

const tokenStoreAddresses = {
  [chains.goerli.id]: "0xb1Af5338A8173676EA628D3Fa8235bafFdfa1ceD",
  [chains.polygonMumbai.id]: "0xE641E9e196FE91d3C3A0803f5abd0cA0Ff865b0B",
  [chains.hardhat.id]: hardhatTokenStoreAddress,
};

const paymasterAddresses = {
  [chains.goerli.id]: "0x7C10d29cfc9951958d8ffF6d9D9c9697A146bf70", // https://docs.opengsn.org/networks/ethereum/goerli.html
  [chains.polygonMumbai.id]: "0x327BBd6BAc3236BCAcDE0D0f4FCD08b3eDfFbc06", // https://docs.opengsn.org/networks/polygon/mumbai.html
  [chains.hardhat.id]: paymasterAddress,
};

export const useAddresses = () => {
  const { chain } = useNetwork();

  return chain
    ? {
        tokenStoreAddress: tokenStoreAddresses[chain.id],
        paymasterAddress: paymasterAddresses[chain.id],
      }
    : {};
};
