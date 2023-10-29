require('@nomiclabs/hardhat-waffle');
require('hardhat-deploy');
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

const fs = require('fs');
let credentials = require('./credentials.example.json');
if (fs.existsSync('./credentials.json')) {
  credentials = require('./credentials.json');
}

module.exports = {
  networks: {
    hardhat: {
      chainId: 1337, // This is the default chainId for the local Hardhat Network
      // You can add other configurations here, like:
      gas: 12000000,
      loggingEnabled: true,
    },
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
      chainId: 11155111,
    },
    goerli: {
      url: process.env.GOERLI_RPC_URL,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
      chainId: 5,
    },
    // ... other networks
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    }
  },
  // ... other Hardhat configurations
};