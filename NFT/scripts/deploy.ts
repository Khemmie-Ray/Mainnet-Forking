import { ethers } from "hardhat";

async function main() {

  const scapegoat = await ethers.deployContract("ScapeGoat");

  await scapegoat.waitForDeployment();

  console.log(
    `ScapeGoat NFT was deployed to ${scapegoat.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
