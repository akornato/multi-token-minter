import { ethers } from "hardhat";
import fs from "fs-extra";
import { GsnTestEnvironment } from "@opengsn/dev";

async function main() {
  const { forwarderAddress, relayHubAddress } =
    await GsnTestEnvironment.loadDeployment("http://localhost:8545");

  if (forwarderAddress && relayHubAddress) {
    const tokenStoreFactory = await ethers.getContractFactory("TokenStore");
    const tokenStore = await tokenStoreFactory.deploy(forwarderAddress);
    await tokenStore.deployed();
    console.log(`TokenStore deployed to ${tokenStore.address}`);
    fs.outputJsonSync("build/TokenStore.json", {
      address: tokenStore.address,
    });

    const paymasterFactory = await ethers.getContractFactory(
      "WhitelistPaymaster"
    );
    const paymaster = await paymasterFactory.deploy();
    await paymaster.deployed();
    console.log(`WhitelistPaymaster deployed to ${paymaster.address}`);
    await paymaster.setRelayHub(relayHubAddress);
    await paymaster.setTrustedForwarder(forwarderAddress);
    await paymaster.setConfiguration(false, true, false, false);
    await paymaster.whitelistTarget(tokenStore.address, true);
    console.log(`WhitelistPaymaster configured OK`);
    fs.outputJsonSync("build/WhitelistPaymaster.json", {
      address: paymaster.address,
    });

    const signers = await ethers.getSigners();
    const tx = await signers[0].sendTransaction({
      to: paymaster.address,
      value: ethers.utils.parseEther("1.0"),
    });
    await tx.wait();
    console.log("1 ether sent to paymaster");
  } else {
    console.log("Deploy failed, no GSN forwarder address detected!");
    return;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
