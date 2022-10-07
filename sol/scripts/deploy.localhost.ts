import { ethers } from "hardhat";
import fs from "fs-extra";
import forwarder from "sol/build/gsn/Forwarder.json";

async function main() {
  const multicallFactory = await ethers.getContractFactory("Multicall");
  const multicall = await multicallFactory.deploy();
  await multicall.deployed();
  console.log(`MultiCall deployed to ${multicall.address}`);
  const multicallFilePath = "build/Multicall.json";
  fs.removeSync(multicallFilePath);
  fs.createFileSync(multicallFilePath);
  fs.outputJsonSync(multicallFilePath, { address: multicall.address });

  const tokenStoreFactory = await ethers.getContractFactory("TokenStore");
  const tokenStore = await tokenStoreFactory.deploy(forwarder.address);
  await tokenStore.deployed();
  console.log(`TokenStore deployed to ${tokenStore.address}`);
  const tokenStoreFilePath = "build/TokenStore.json";
  fs.removeSync(tokenStoreFilePath);
  fs.createFileSync(tokenStoreFilePath);
  fs.outputJsonSync(tokenStoreFilePath, {
    address: tokenStore.address,
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
