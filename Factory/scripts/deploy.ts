import { ethers } from "hardhat";

async function main() {
 
  const tokenFactory = await ethers.deployContract("TokenFactory");

  await tokenFactory.waitForDeployment();
  

  console.log(
    `TokenFactory was deployed to ${tokenFactory.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
