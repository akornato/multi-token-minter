import dotenv from "dotenv";
dotenv.config();
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY, // process.env.ETHERSCAN_API_KEY
  },
  networks: {
    hardhat: {},
    goerli: {
      url: process.env.ALCHEMY_GOERLI_URL,
      accounts: [process.env.PRIVATE_KEY || ""],
    },
    mumbai: {
      url: process.env.ALCHEMY_MUMBAI_URL,
      accounts: [process.env.PRIVATE_KEY || ""],
    },
  },
};

export default config;
