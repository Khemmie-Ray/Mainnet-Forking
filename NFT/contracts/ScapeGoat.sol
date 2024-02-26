// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ScapeGoat is ERC721URIStorage, Ownable {
    mapping(uint256 => uint256) private _tokenPrices;
    mapping(uint256 => address) private _tokenSellers;
    event TokenForSale(uint256 indexed tokenId, uint256 price);
    uint256 private _tokenIdCounter;

    constructor()
        ERC721("ScapeGoat", "SCG")
        Ownable(msg.sender)
    {}

    function mint(address to) external  {
        _safeMint(to, _tokenIdCounter);
        _tokenIdCounter++;
    }

      function buyNFT(uint256 tokenId) external payable {
        require(ownerOf(tokenId) != msg.sender, "You already own this token");
        require(msg.value > 0, "Value sent must be greater than 0");

        address seller = address(this);
        address payable sellerPayable = payable(seller);
        (bool sent, ) = sellerPayable.call{value: msg.value}("");
        require(sent, "Failed to send Ether to the seller");

        _transfer(seller, msg.sender, tokenId);
    }

     function sell(uint256 tokenId, uint256 price) external {
        require(ownerOf(tokenId) == msg.sender, "You don't own this token");
        _transfer(msg.sender, address(this), tokenId);

        emit TokenForSale(tokenId, price);
    }

      function listNFTForSale(uint256 tokenId, uint256 price) external {
        require(price > 0, "Price must be greater than zero");

        _tokenPrices[tokenId] = price;
        _tokenSellers[tokenId] = _msgSender();
    }
}
