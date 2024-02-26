// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./W3b.sol";

contract TokenFactory{
    W3b[] tokenClones;

    mapping (address => mapping (address => uint)) accounts;

    function createToken() external returns (W3b newToken_, uint256 length_) {
        newToken_ = new W3b();

        tokenClones.push(newToken_);

        length_ = tokenClones.length;
    }

    function getTokenClones() external view returns(W3b[] memory) {
        return tokenClones;
    }
}
