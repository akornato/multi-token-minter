import { ethers } from "hardhat";
import fs from "fs-extra";
import { GsnTestEnvironment } from "@opengsn/dev";

async function main() {
  const { forwarderAddress } = await GsnTestEnvironment.loadDeployment(
    "http://localhost:8545"
  );

  if (forwarderAddress) {
    const tokenStoreFactory = await ethers.getContractFactory("TokenStore");
    const tokenStore = await tokenStoreFactory.deploy(forwarderAddress);
    await tokenStore.deployed();
    console.log(`TokenStore deployed to ${tokenStore.address}`);
    const tokenStoreFilePath = "build/TokenStore.json";
    fs.removeSync(tokenStoreFilePath);
    fs.createFileSync(tokenStoreFilePath);
    fs.outputJsonSync(tokenStoreFilePath, {
      address: tokenStore.address,
    });
  } else {
    console.log("TokenStore factory failed, no forwarder address detected!");
    return;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
