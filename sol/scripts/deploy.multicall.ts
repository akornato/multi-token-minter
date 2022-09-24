import { ethers } from "hardhat";
import {
  abi as multiCallAbi,
  bytecode as multiCallBytecode,
} from "../constants/MultiCall.json";

async function main() {
  const MultiCallFactory = new ethers.ContractFactory(
    multiCallAbi,
    multiCallBytecode,
    (await ethers.getSigners())[0]
  );

  const multiCall = await MultiCallFactory.deploy();
  await multiCall.deployed();

  console.log(`MultiCall deployed to ${multiCall.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
