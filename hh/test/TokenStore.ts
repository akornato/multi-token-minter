import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("TokenStore", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployOneYearLockFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const TokenStore = await ethers.getContractFactory("TokenStore");
    const tokenStore = await TokenStore.deploy();

    return { tokenStore, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { tokenStore, owner } = await loadFixture(deployOneYearLockFixture);
      
      expect(await tokenStore.owner()).to.equal(owner.address);
    });
  });
});
