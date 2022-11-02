import { ethers } from "hardhat";
import fs from "fs-extra";
import { GsnTestEnvironment } from "@opengsn/dev";

async function main() {
  const { paymasterAddress, forwarderAddress } =
    await GsnTestEnvironment.loadDeployment("http://localhost:8545");

  console.log(`Send 1 ether to Paymaster address ${paymasterAddress}`);
  const signers = await ethers.getSigners();
  const tx = await signers[0].sendTransaction({
    to: paymasterAddress,
    value: ethers.utils.parseEther("1.0"),
  });
  await tx.wait();

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

  const multicallFactory = await ethers.getContractFactory("Multicall");
  const multicall = await multicallFactory.deploy();
  await multicall.deployed();
  console.log(`MultiCall deployed to ${multicall.address}`);
  const multicallFilePath = "build/Multicall.json";
  fs.removeSync(multicallFilePath);
  fs.createFileSync(multicallFilePath);
  fs.outputJsonSync(multicallFilePath, { address: multicall.address });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
