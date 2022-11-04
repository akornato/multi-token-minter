import React, { useState, useEffect, useContext, createContext } from "react";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import { RelayProvider } from "@opengsn/provider";
import { useAddresses } from "web/hooks/useAddresses";
import { TokenStore__factory } from "web/typechain-types/factories/contracts/TokenStore__factory";
import { TokenStore } from "web/typechain-types/contracts/TokenStore";

const RelayedTokenStoreContext = createContext<{
  relayedTokenStoreContract?: TokenStore;
}>(undefined!);

export const RelayedTokenStoreProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [relayProvider, setRelayProvider] = useState<RelayProvider>();
  const { tokenStoreAddress, paymasterAddress } = useAddresses();
  const [relayedTokenStoreContract, setRelayedTokenStoreContract] =
    useState<TokenStore>();
  const { address } = useAccount();

  useEffect(() => {
    if (relayProvider) {
      // @ts-ignore
      const ethersProvider = new ethers.providers.Web3Provider(relayProvider);
      const tokenStoreContract = tokenStoreAddress
        ? (new ethers.Contract(
            tokenStoreAddress,
            TokenStore__factory.abi
          )?.connect(ethersProvider.getSigner(address)) as TokenStore)
        : undefined;
      setRelayedTokenStoreContract(tokenStoreContract);
    }
  }, [relayProvider, tokenStoreAddress, address]);

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
    <RelayedTokenStoreContext.Provider value={{ relayedTokenStoreContract }}>
      {children}
    </RelayedTokenStoreContext.Provider>
  );
};

export const useRelayedTokenStore = () => useContext(RelayedTokenStoreContext);
