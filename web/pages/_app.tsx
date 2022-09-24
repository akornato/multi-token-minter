import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { Mainnet, DAppProvider, Config, Goerli, ChainId } from "@usedapp/core";
import { getDefaultProvider } from "ethers";
import { theme } from "web/constants/theme";

const config: Config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: getDefaultProvider("mainnet"),
    [Goerli.chainId]: getDefaultProvider("goerli"),
    [ChainId.Hardhat]: "http://localhost:8545",
  },
  multicallAddresses: {
    [ChainId.Hardhat]: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
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
