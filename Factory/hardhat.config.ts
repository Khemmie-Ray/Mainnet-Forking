import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require("dotenv").config();

const { ALCHEMY_MUMBAI_API_KEY_URL, ACCOUNT_PRIVATE_KEY} = process.env;

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    mumbai: {
      url: ALCHEMY_MUMBAI_API_KEY_URL,
      accounts: [`0x${ACCOUNT_PRIVATE_KEY}`]
    }
  },
};

export default config;