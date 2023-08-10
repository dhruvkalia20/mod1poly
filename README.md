# NFT Tokens Bridging
This project demonstrates how to use the fxPortal contracts to transfer ERC20 tokens from Goerli .In this project, make an ERC721 contract, deploy it on the Goerli network, and transfer the NFT to the Polygon Mumbai using FxPortal Bridge.

# Desciption
We are going to make an ERC721 contract using openzepplin and goerli network.In our contract we are going to use license identifier and defined the solidity version.We have created a ERC721 token named metatoken under it we have created a constructor for assigning name and symbol for the NFT and initialize the token id variable.Then we have created a mint function named mintWithPrompt to mint the NFT, this function takes three parameters address to which tokens is minted and prompt which is the description and the ipfs hash which will be the address of the NFT image need to minted. We also have a prompt description function which will return the description of the NFT.we will import files and then run the scripts to deploy the contract on the goerli network .

### Steps for Bridging

1. Run npm i to install dependencies
2. Put your private key in the .env.examples file and rename to .env when finished
3. Run npx hardhat run scripts/deploy.js --network goerli to deploy ERC20 contract
4. Paste the newly deployed contract address in the tokenAddress variable for the other scripts
5. Make sure to fill in your public key
6. Run npx hardhat run scripts/mint.js --network goerli to mint tokens to your wallet
7. Run npx hardhat run scripts/approveDeposit.js --network goerli to approve and deposit your tokens to polygon
8. Wait 20-30ish minutes for tokens to show on polygon account
9. Use polyscan.com to check your account for the tokens. Once they arrive, you can click on the transaction to get the contract address for polygon.
10. Use this polygon contract address for your getBalance script's tokenAddress
11. Run npx hardhat run scripts/getBalance.js --network mumbai to see the new polygon balance.

# Execution
-----
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MetaToken is ERC721URIStorage, Ownable {
    mapping(uint256 => string) private _tokenPrompts;

    constructor() ERC721("Dhruv","DUC") {}
    function mintWithPrompt(
        address _to,
        uint256 _tokenId,
        string memory _tokenURI,
        string memory _prompt
    ) external onlyOwner {
        _mint(_to, _tokenId);
        _setTokenURI(_tokenId, _tokenURI);
        _tokenPrompts[_tokenId] = _prompt;
    }
    function promptDescription(uint256 _tokenId) external view returns (string memory) {
        return _tokenPrompts[_tokenId];
    }
    function _baseURI() internal pure override returns (string memory) {
        return "https://gateway.pinata.cloud/ipfs/QmXUjkjnpFWuGEy7BeVvRoi2pSxQuL38V8kVPpKPWNEMu8";
    }
}
                                                                     -----

# Author
Dhruv Kalia

# License
This project is licensed under the MIT License - see the LICENSE.md file for details.
