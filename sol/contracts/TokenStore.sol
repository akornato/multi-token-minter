// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

contract TokenStore is ERC1155, Ownable {
    // Mapping from token ID to minter approvals
    mapping(uint256 => mapping(address => bool)) private _tokenMinterApprovals;

    // Mapping from token ID to URI
    mapping(uint256 => string) private _tokenURIs;

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    /**
     * @dev Emitted when `account` grants or revokes permission to `minter`.
     */
    event TokenMinterApproval(
        uint256 indexed id,
        address indexed account,
        address indexed minter,
        bool approved
    );

    constructor() ERC1155("") {}

    function initializeToken(string memory uri_) external {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _tokenURIs[newTokenId] = uri_;
        _tokenMinterApprovals[newTokenId][_msgSender()] = true;
    }

    function uri(uint256 id) public view override returns (string memory) {
        return _tokenURIs[id];
    }

    function mint(
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) external {
        if (_tokenMinterApprovals[id][_msgSender()]) {
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
            _tokenMinterApprovals[id][_msgSender()],
            "TokenStore: sender needs to be token minter approved"
        );
        _tokenMinterApprovals[id][minter] = approved;
        emit TokenMinterApproval(id, _msgSender(), minter, approved);
    }

    function isTokenMinterApproved(uint256 id, address minter)
        external
        view
        returns (bool)
    {
        return _tokenMinterApprovals[id][minter];
    }
}
