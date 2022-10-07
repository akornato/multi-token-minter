import { ethers } from "hardhat";
import { Goerli } from "@usedapp/core";

async function main() {
  const tokenStoreFactory = await ethers.getContractFactory("TokenStore");
  const tokenStore = await tokenStoreFactory.deploy();
  await tokenStore.deployed();
  console.log(`TokenStore deployed to ${tokenStore.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
