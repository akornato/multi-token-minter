This demonstrates an ERC1155/ERC2771 meta transactions contract with token metadata stored on IPFS, and a gasless web app to view, mint and initalize new tokens.

Contracts are deployed to Goerli and Mumbai. The web app is deployed at https://multi-token-minter.vercel.app

Tech:

- [OpenZeppelin ERC1155](https://docs.openzeppelin.com/contracts/4.x/api/token/erc1155)
- [OpenZeppelin ERC2771Context](https://docs.openzeppelin.com/contracts/4.x/api/metatx)
- [Gas Station Network](https://opengsn.org)
- [Hardhat](https://hardhat.org/)
- [Next.js](https://nextjs.org/)
- [wagmi](https://wagmi.sh/)
- [ipfs-http-client](https://github.com/ipfs/js-ipfs/tree/master/packages/ipfs-http-client)
- [Infura IPFS gateway](https://infura.io/product/ipfs)

## Local dev

Copy `sol/.env.example` to `sol/.env` and `web/.env.example` to `web/.env` and fill in the missing env vars.

- `yarn sol:node` starts Hardhat Network
- `yarn sol:gsn` deploys GSN contracts, and starts a relay server
- `yarn sol:deploy:localhost` deploys `TokenStore` contract initialized with GSN forwarder address
- `yarn web:dev` starts Next.js app at `http://localhost:3000`
