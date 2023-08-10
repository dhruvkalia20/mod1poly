// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const tokenContractJSON = require("../artifacts/contracts/MetaToken.sol/MetaToken.json");
require('dotenv').config()

const tokenAddress = "0x177C96958Ecb4154A0Cd7831a53a072299aa6929"; // place your erc20 contract address here
const tokenABI = tokenContractJSON.abi;
const walletAddress = "0x2E186E906947ce61016De91b43118f626E8b87df"; // place your public address for your wallet here

async function main() {

    const token = await hre.ethers.getContractAt(tokenABI, tokenAddress);
    
    const tx = await token.mintWithPrompt(walletAddress,1,"https://gateway.pinata.cloud/ipfs/QmXUjkjnpFWuGEy7BeVvRoi2pSxQuL38V8kVPpKPWNEMu8","nft generated");
    await tx.wait();
    
    console.log("You now have: " + await token.balanceOf(walletAddress) + " tokens");
  }
  
  // We recommend this pattern to be able to use async/await everywhere
  // and properly handle errors.
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });