import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { DAppProvider, Config, Goerli, Hardhat } from "@usedapp/core";
import { getDefaultProvider } from "ethers";
import { theme } from "web/constants/theme";
import { multiCallAddresses } from "web/constants/addresses";

const config: Config = {
  networks: [Goerli, Hardhat],
  readOnlyChainId: Goerli.chainId,
  readOnlyUrls: {
    [Goerli.chainId]: getDefaultProvider("goerli"),
    [Hardhat.chainId]: "http://localhost:8545",
  },
  multicallAddresses: {
    [Goerli.chainId]: multiCallAddresses[Goerli.chainId],
    [Hardhat.chainId]: multiCallAddresses[Hardhat.chainId],
  },
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DAppProvider config={config}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </DAppProvider>
  );
}

export default MyApp;
