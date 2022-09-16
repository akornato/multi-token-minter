import { ethers } from "hardhat";

async function main() {
  const TokenStore = await ethers.getContractFactory("TokenStore");
  const tokenStore = await TokenStore.deploy();

  await tokenStore.deployed();

  console.log(`TokenStore deployed to ${tokenStore.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
