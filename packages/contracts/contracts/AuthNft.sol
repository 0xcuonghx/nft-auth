// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AuthNft is ERC721, Ownable {
    uint256 private _nextTokenId;

    modifier onlyIfNotRegistered(address to) {
        require(balanceOf(to) == 0, "ERC721: User already have token");
        _;
    }

    constructor(
        string memory name_,
        string memory symbol_,
        address initialOwner_
    ) ERC721(name_, symbol_) Ownable(initialOwner_) {}

    function register(address to) external onlyOwner onlyIfNotRegistered(to) {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
    }

    function isRegistered(address to) public view returns (bool) {
        return balanceOf(to) != 0;
    }
}
