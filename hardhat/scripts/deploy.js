const { ethers, artifacts } = require("hardhat");
const fs = require("fs");

function saveJsonFilesToClientFolder(name, contract) {
  const contractsDir = `${__dirname}/../../client/src/contracts`;

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  const data = {
    address: contract.address,
    abi: JSON.parse(contract.interface.format("json")),
  };

  fs.writeFileSync(
    `${__dirname}/../../client/src/contracts/${name}.json`,
    JSON.stringify(data),
  );
}

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(`Deploying contracts with the account: ${deployer.address}`);

  const balance = await deployer.getBalance();
  console.log(`Account balance: ${balance.toString()}`);

  const StakingToken = await ethers.getContractFactory("ERC20");
  const stakingToken = await StakingToken.deploy();
  console.log(`StakingToken address: ${stakingToken.address}`);

  const RewardToken = await ethers.getContractFactory("ERC20");
  const rewardToken = await RewardToken.deploy();
  console.log(`RewardToken address: ${rewardToken.address}`);

  const StakingContract = await ethers.getContractFactory("Staking");
  const stakingContract = await StakingContract.deploy(
    stakingToken.address,
    rewardToken.address,
  );
  console.log(`StakingContract address: ${stakingContract.address}`);

  saveJsonFilesToClientFolder("stakingToken", stakingToken);
  saveJsonFilesToClientFolder("rewardToken", rewardToken);
  saveJsonFilesToClientFolder("stakingContract", stakingContract);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.emit(1);
  });
