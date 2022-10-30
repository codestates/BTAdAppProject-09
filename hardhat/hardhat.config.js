/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

const { INFURA_URL } = process.env;
const { PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.13",
  networks: {
    goerli: {
      url: INFURA_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
};
