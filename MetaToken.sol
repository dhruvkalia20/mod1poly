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
