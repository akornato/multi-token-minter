This is a simple Yarn v3 monorepo: `sol` workspace with ERC1155 based `TokenStore` contract, and `web` workspace with the UI to add metadata to IPFS and mint the tokens.

- [OpenZeppelin ERC1155](https://docs.openzeppelin.com/contracts/3.x/erc1155)
- [Hardhat](https://hardhat.org/)
- [Next.js](https://nextjs.org/)
- [ipfs-http-client](https://github.com/ipfs/js-ipfs/tree/master/packages/ipfs-http-client)
- [Infura IPFS gateway](https://infura.io/product/ipfs)

`TokenStore` contract is deployed to Goerli network at [this address](https://goerli.etherscan.io/address/0x22448d0D2a0685c713e568272de1aFc7F8BEE644) and the app at https://multi-token-minter.vercel.app

## Local dev

Copy `sol/.env.example` to `sol/.env` and `web/.env.example` to `web/.env` and fill in the missing env vars. The following script starts Next.js app at `http://localhost:3000`, the Hardhat network, and deploys both useDapp's [MultiCall](https://github.com/TrueFiEng/useDApp/blob/master/packages/core/src/constants/abi/MultiCall.json) and `TokenStore` contracts:

```bash
yarn dev
```
