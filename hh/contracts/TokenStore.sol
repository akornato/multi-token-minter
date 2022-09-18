// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract TokenStore is ERC1155, Ownable {
    // Mapping from token ID to minter approvals
    mapping(uint256 => mapping(address => bool)) private _minterApprovals;

    // Mapping from token ID to boolean
    mapping(uint256 => bool) private _tokenMinted;

    constructor() ERC1155("https://some.example/api/item/{id}.json") {}

    function mint(
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) external {
        if (_tokenMinted[id]) {
            if (_minterApprovals[id][to]) {
                _mint(to, id, amount, data);
            } else {
                revert("TokenStore: Minter not approved for this token ID");
            }
        } else {
            _tokenMinted[id] = true;
            _minterApprovals[id][to] = true;
            _mint(to, id, amount, data);
        }
    }
}
