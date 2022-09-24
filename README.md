This is a simple yarn monorepo: `sol` workspace with ERC1155 based `TokenStore` contract, and `web` workspace with the UI to add metadata to IPFS and mint the tokens.

- [OpenZeppelin ERC1155](https://docs.openzeppelin.com/contracts/3.x/erc1155)
- [Hardhat](https://hardhat.org/)
- [Next.js](https://nextjs.org/)
- [IPFS](https://ipfs.io/)

## Local dev

This starts Next.js app at `http://localhost:3000`, the Hardhat network, and deploys the `TokenStore` contract:

```bash
yarn dev
```