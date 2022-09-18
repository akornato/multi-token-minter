import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { TokenStore } from "../typechain-types";

describe("TokenStore", function () {
  async function deployFixture() {
    const [owner, accountA, accountB] = await ethers.getSigners();

    const TokenStoreFactory = await ethers.getContractFactory("TokenStore");
    const tokenStore: TokenStore = await TokenStoreFactory.deploy();

    return { tokenStore, owner, accountA, accountB };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { tokenStore, owner } = await loadFixture(deployFixture);

      expect(await tokenStore.owner()).to.equal(owner.address);
    });

    it("Should token minter approvals work", async function () {
      const { tokenStore, accountA, accountB } = await loadFixture(
        deployFixture
      );

      await tokenStore.connect(accountA).mint(accountA.address, 1, 1, []);
      expect(await tokenStore.balanceOf(accountA.address, 1)).to.equal(1);
      expect(
        await tokenStore.isTokenMinterApproved(1, accountA.address)
      ).to.equal(true);
      await expect(
        tokenStore.connect(accountB).mint(accountB.address, 1, 1, [])
      ).to.be.revertedWith("TokenStore: Minter not approved for this token ID");
      await expect(
        tokenStore
          .connect(accountA)
          .setTokenMinterApproval(1, accountB.address, true)
      )
        .to.emit(tokenStore, "TokenMinterApproval")
        .withArgs(1, accountB.address, true);
      expect(
        await tokenStore.isTokenMinterApproved(1, accountB.address)
      ).to.equal(true);
      await tokenStore.connect(accountB).mint(accountB.address, 1, 1, []);
      expect(await tokenStore.balanceOf(accountB.address, 1)).to.equal(1);
    });
  });
});
