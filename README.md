# nft-auth

- Provide method to authorize user using nft + jwt

## F&Q

1. How to address user?

- we have to have the user sign a message with a provided nonce in some dapps like Opensea because for identify user wallet in the backend.
- On the frontend when can using injected wallet extension to prove user actually owner of address (e.g 0xF4CA4e78329226247EBB08E90F05d5e456eAa108).
- In the backend we can't using injected wallet extension so we need their signature by sign a message (nonce using for prevent replay-attack, after again we need to sign message again).

2. How to check user authorize?

- we authorize by checking user has already have a nft for first time and generate jwt token for later use

## Install

```sh
npm install @cuonghx.gu-tech/nft-auth-js
```

## Usage

```js
import { NftAuth } from "@cuonghx.gu-tech/nft-auth-js";

const nftAuth = new NftAuth({
  rpcUrl: "https://rpc2.sepolia.org",
  contractAddress: "deployed_nft_auth_contract_address",
  options: {
    jwtSecretKey: "very_secret_key",
    jwtExpiresIn: "1d",
  },
});
```

1. `/nonce` api: return nonce
2. User signed message with nonce
3. `/login` api: return jwt token after checking user has nft auth

```js
const jwtToken = await nftAuth.generateToken({
  signerAddress: "signer_address",
  signedMessage: "message_nonce",
  signedSignature: "message_signed",
});
```

4. Using with authenticate guard

```js
const isAuthenticate = nftAuth.verify(jwtToken);
```
