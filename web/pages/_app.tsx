import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { WagmiConfig, createClient, configureChains, chain } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { theme } from "web/constants/theme";
import { RelayedTokenStoreProvider } from "web/hooks/useRelayedTokenStore";

const { provider, webSocketProvider } = configureChains(
  [chain.polygonMumbai, chain.hardhat],
  [publicProvider()]
);

const client = createClient({
  provider,
  webSocketProvider,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
      <RelayedTokenStoreProvider>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </RelayedTokenStoreProvider>
    </WagmiConfig>
  );
}

export default MyApp;
