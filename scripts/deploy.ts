import { ethers } from 'hardhat';

async function main() {
  console.log({ ethers });
  const MyNFT = await ethers.getContractFactory("NFTMarketplace");

  // Start deployment, returning a promise that resolves to a contract object
  const myNFT = await MyNFT.deploy();
  await myNFT.deployed();
  console.log("Contract deployed to address:", myNFT.address);
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })

