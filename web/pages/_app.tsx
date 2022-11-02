import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { DAppProvider, Config, Goerli, Mumbai, Hardhat } from "@usedapp/core";
import { getDefaultProvider } from "ethers";
import { theme } from "web/constants/theme";
import { multiCallAddresses } from "web/hooks/useAddresses";
import { GSNProvider } from "web/hooks/useGSN";

const config: Config = {
  networks: [Goerli, Mumbai, Hardhat],
  readOnlyUrls: {
    [Goerli.chainId]: getDefaultProvider("goerli"),
    [Mumbai.chainId]: "https://matic-mumbai.chainstacklabs.com",
    [Hardhat.chainId]: "http://localhost:8545",
  },
  multicallAddresses: {
    [Goerli.chainId]: multiCallAddresses[Goerli.chainId],
    [Mumbai.chainId]: multiCallAddresses[Mumbai.chainId],
    [Hardhat.chainId]: multiCallAddresses[Hardhat.chainId],
  },
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DAppProvider config={config}>
      <GSNProvider>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </GSNProvider>
    </DAppProvider>
  );
}

export default MyApp;
