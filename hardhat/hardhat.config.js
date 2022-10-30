/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

const { GOERLI_URL, MUMBAI_URL, PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.13",
  networks: {
    goerli: {
      url: GOERLI_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    mumbai: {
      url: MUMBAI_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
};
