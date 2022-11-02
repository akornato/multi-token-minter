import React, { useState, useEffect, useContext, createContext } from "react";
import { RelayProvider, Web3ProviderBaseInterface } from "@opengsn/provider";
import { useAddresses } from "web/hooks/useAddresses";

declare global {
  interface Window {
    ethereum?: Web3ProviderBaseInterface;
  }
}

const GSNContext = createContext<{
  relayProvider?: RelayProvider;
}>(undefined!);

export const GSNProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [relayProvider, setRelayProvider] = useState<RelayProvider>();
  const { paymasterAddress } = useAddresses();

  useEffect(() => {
    const getRelayProvider = async () => {
      if (window.ethereum) {
        const relayProvider = await RelayProvider.newProvider({
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
    <GSNContext.Provider value={{ relayProvider }}>
      {children}
    </GSNContext.Provider>
  );
};

export const useGSN = () => useContext(GSNContext);
