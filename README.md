This demonstrates an ERC1155 contract with token metadata stored on IPFS, and a web app to view, mint and initalize new tokens.

The `sol` yarn workspace has Hardhat Solidity stuff, and `web` is the Next.js app.

Tech:

- [OpenZeppelin ERC1155](https://docs.openzeppelin.com/contracts/3.x/erc1155)
- [Hardhat](https://hardhat.org/)
- [Next.js](https://nextjs.org/)
- [useDapp](https://usedapp.io/)
- [ipfs-http-client](https://github.com/ipfs/js-ipfs/tree/master/packages/ipfs-http-client)
- [Infura IPFS gateway](https://infura.io/product/ipfs)

The web app is deployed at https://multi-token-minter.vercel.app

## Local dev

Copy `sol/.env.example` to `sol/.env` and `web/.env.example` to `web/.env` and fill in the missing env vars.

- `yarn web:dev` starts Next.js app at `http://localhost:3000`
- `yarn sol:node` starts Hardhat Network
- `yarn sol:deploy:localhost` deploys MakerDAO's [MultiCall](https://github.com/makerdao/multicall/blob/master/src/Multicall.sol) contract, required by useDapp, and `TokenStore` contract
