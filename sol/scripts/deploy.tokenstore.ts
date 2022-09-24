import { ethers } from "hardhat";

async function main() {
  const TokenStoreFactory = await ethers.getContractFactory("TokenStore");
  const tokenStore = await TokenStoreFactory.deploy();

  await tokenStore.deployed();

  console.log(`TokenStore deployed to ${tokenStore.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
