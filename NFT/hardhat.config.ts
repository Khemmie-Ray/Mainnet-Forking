// import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require("dotenv").config({ path: ".env" });

const { ALCHEMY_MAINNET_API_KEY_URL, ALCHEMY_SEPOLIA_API_KEY_URL, ALCHEMY_MUMBAI_API_KEY_URL, ACCOUNT_PRIVATE_KEY} = process.env;

module.exports = {
  solidity: "0.8.24",
  networks: {
    hardhat: {
      forking: {
        url: ALCHEMY_MAINNET_API_KEY_URL,
      }
    },
    sepolia: {
      url: ALCHEMY_SEPOLIA_API_KEY_URL,
      accounts: [ACCOUNT_PRIVATE_KEY],
    },
    mumbai: {
      url: ALCHEMY_MUMBAI_API_KEY_URL,
      accounts: [ACCOUNT_PRIVATE_KEY],
    }
  },
  lockGasLimit: 200000000000,
  gasPrice: 10000000000,
};