require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

const SEPOLIA_URL = process.env.SEPOLIA_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  paths:{
    artifacts:'./front-end/src/artifacts'
  },
  networks:{
    sepolia:{
      url: SEPOLIA_URL,
      accounts: [PRIVATE_KEY],
      chainId: 11155111,
    },
  },
};
//0xB12B26934e5B9D554BEaBFCf09D10Bc7a2c0a8c9