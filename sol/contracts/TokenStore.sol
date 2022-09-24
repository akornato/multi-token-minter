// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract TokenStore is ERC1155, Ownable {
    // Mapping from token ID to minter approvals
    mapping(uint256 => mapping(address => bool)) public tokenMinterApprovals;

    // Mapping from token ID to URI
    mapping(uint256 => string) public tokenURIs;

    uint256 public nextTokenId;

    /**
     * @dev Emitted when `account` grants or revokes permission to `minter`.
     */
    event TokenMinterApproval(
        uint256 indexed id,
        address indexed account,
        address indexed minter,
        bool approved
    );

    constructor() ERC1155("") {
        nextTokenId = 0;
    }

    function initializeToken(string memory uri_) external {
        tokenURIs[nextTokenId] = uri_;
        tokenMinterApprovals[nextTokenId][_msgSender()] = true;
        nextTokenId++;
    }

    function uri(uint256 id) public view override returns (string memory) {
        return tokenURIs[id];
    }

    function mint(
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) external {
        if (tokenMinterApprovals[id][_msgSender()]) {
            _mint(to, id, amount, data);
        } else {
            revert("TokenStore: Minter not approved for this token ID");
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
            tokenMinterApprovals[id][_msgSender()],
            "TokenStore: sender needs to be token minter approved"
        );
        tokenMinterApprovals[id][minter] = approved;
        emit TokenMinterApproval(id, _msgSender(), minter, approved);
    }

    function isTokenMinterApproved(uint256 id, address minter)
        external
        view
        returns (bool)
    {
        return tokenMinterApprovals[id][minter];
    }
}
