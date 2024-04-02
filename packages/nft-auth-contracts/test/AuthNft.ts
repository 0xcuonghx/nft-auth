import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

describe("AuthNft", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployAuthNft() {
    // Contracts are deployed using the first signer/account by default
    const [owner, anyone] = await hre.ethers.getSigners();

    const Contract = await hre.ethers.getContractFactory("AuthNft");
    const contract = await Contract.deploy("AuthNft", "ANFT", owner.address);

    return { contract, owner, anyone };
  }

  describe("Deployment", function () {
    it("Should work properly", async () => {
      const { contract, anyone } = await loadFixture(deployAuthNft);

      expect(await contract.isRegistered(anyone.address)).to.eql(false);
      await contract.register(anyone.address);
      expect(await contract.isRegistered(anyone.address)).to.eql(true);
    });
  });
});
