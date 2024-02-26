// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9; 
import "./W3b.sol";

interface IFactory {
    function createToken() external returns (W3b newToken_, uint256 length_);
}