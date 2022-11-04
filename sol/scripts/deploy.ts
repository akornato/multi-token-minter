import { ethers } from "hardhat";

const relayHubAddress = "0x3a1Df71d11774F25B9d8a35DF4aF1918bff41681";
const forwarderAddress = "0x7A95fA73250dc53556d264522150A940d4C50238";

async function main() {
  const tokenStoreFactory = await ethers.getContractFactory("TokenStore");
  const tokenStore = await tokenStoreFactory.deploy(forwarderAddress);
  await tokenStore.deployed();
  console.log(`TokenStore deployed to ${tokenStore.address}`);

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

  const signers = await ethers.getSigners();
  const tx = await signers[0].sendTransaction({
    to: paymaster.address,
    value: ethers.utils.parseEther("0.1"),
  });
  await tx.wait();
  console.log("0.1 ether sent to paymaster");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
