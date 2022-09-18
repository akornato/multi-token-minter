// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract TokenStore is ERC1155, Ownable {
    // Mapping from token ID to minter approvals
    mapping(uint256 => mapping(address => bool)) private _tokenMinterApprovals;

    // Mapping from token ID to boolean
    mapping(uint256 => bool) private _tokenMinted;

    /**
     * @dev Emitted when `account` grants or revokes permission to `operator` to transfer their tokens, according to
     * `approved`.
     */
    event TokenMinterApproval(
        uint256 indexed id,
        address indexed minter,
        bool approved
    );

    constructor() ERC1155("https://some.example/api/item/{id}.json") {}

    function mint(
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) external {
        if (_tokenMinted[id]) {
            if (_tokenMinterApprovals[id][_msgSender()]) {
                _mint(to, id, amount, data);
            } else {
                revert("TokenStore: Minter not approved for this token ID");
            }
        } else {
            _tokenMinted[id] = true;
            _tokenMinterApprovals[id][_msgSender()] = true;
            _mint(to, id, amount, data);
        }
    }

    function setTokenMinterApproval(
        uint256 id,
        address minter,
        bool approved
    ) external {
        require(
            minter != _msgSender(),
            "TokenStore: setting token minter approval status for self"
        );
        require(
            _tokenMinterApprovals[id][_msgSender()],
            "TokenStore: sender needs to be token minter approved"
        );
        _tokenMinterApprovals[id][minter] = approved;
        emit TokenMinterApproval(id, minter, approved);
    }

    function isTokenMinterApproved(uint256 id, address minter)
        external
        view
        returns (bool)
    {
        return _tokenMinterApprovals[id][minter];
    }
}
