import { ethers } from "hardhat";
import { IFactory } from "../typechain-types";

async function main() {
 
  const tokenFactoryAddress = "0x927C4efB8f87584C84c71C34FdA752498D4aE383";
  const tokenFactoryContract = await ethers.getContractAt("IFactory", tokenFactoryAddress);

  const createTx = tokenFactoryContract.createToken();
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
