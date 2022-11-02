import { ethers } from "hardhat";

async function main() {
  const tokenStoreFactory = await ethers.getContractFactory("TokenStore");
  const tokenStore = await tokenStoreFactory.deploy(
    "0x7A95fA73250dc53556d264522150A940d4C50238"
  );
  await tokenStore.deployed();
  console.log(`TokenStore deployed to ${tokenStore.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
