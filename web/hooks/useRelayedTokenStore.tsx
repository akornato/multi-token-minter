import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  createContext,
} from "react";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import { RelayProvider } from "@opengsn/provider";
import { useAddresses } from "web/hooks/useAddresses";
import { abi as tokenStoreAbi } from "web/types/TokenStore";

const RelayedTokenStoreContext = createContext<{
  mintToken: (tokenId: number, amount: number) => void;
  initializeToken: (ipfsPath: string) => void;
}>(undefined!);

export const RelayedTokenStoreProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [relayProvider, setRelayProvider] = useState<RelayProvider>();
  const { tokenStoreAddress, paymasterAddress } = useAddresses();
  const { address } = useAccount();

  const mintToken = useCallback(
    async (tokenId: number, amount: number) => {
      if (relayProvider && tokenStoreAddress && address) {
        // @ts-ignore
        const ethersProvider = new ethers.providers.Web3Provider(relayProvider);
        new ethers.Contract(tokenStoreAddress, tokenStoreAbi)
          ?.connect(ethersProvider.getSigner(address))
          .mint(address, tokenId, amount, []);
      }
    },
    [relayProvider, tokenStoreAddress, address]
  );

  const initializeToken = useCallback(
    async (ipfsPath: string) => {
      if (relayProvider && tokenStoreAddress && address) {
        // @ts-ignore
        const ethersProvider = new ethers.providers.Web3Provider(relayProvider);
        new ethers.Contract(tokenStoreAddress, tokenStoreAbi)
          ?.connect(ethersProvider.getSigner(address))
          .initializeToken(ipfsPath);
      }
    },
    [relayProvider, tokenStoreAddress, address]
  );

  useEffect(() => {
    const getRelayProvider = async () => {
      if (window.ethereum) {
        const relayProvider = await RelayProvider.newProvider({
          // @ts-ignore
          provider: window.ethereum,
          config: {
            paymasterAddress,
            loggerConfiguration: {
              logLevel: "debug",
            },
            requiredVersionRange: "^3.0.0-beta.0",
          },
        }).init();
        setRelayProvider(relayProvider);
      }
    };
    if (paymasterAddress) {
      getRelayProvider();
    }
  }, [paymasterAddress]);

  return (
    <RelayedTokenStoreContext.Provider value={{ mintToken, initializeToken }}>
      {children}
    </RelayedTokenStoreContext.Provider>
  );
};

export const useRelayedTokenStore = () => useContext(RelayedTokenStoreContext);
