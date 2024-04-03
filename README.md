# nft-auth

- Provide method to authorize user using nft + jwt

## F&Q

- How to address user?

we have to have the user sign a message with a provided nonce in some dapps like Opensea because for identify user wallet in the backend.

On the frontend when can using injected wallet extension to prove user actually owner of address (e.g 0xF4CA4e78329226247EBB08E90F05d5e456eAa108).

In the backend we can't using injected wallet extension so we need their signature by sign a message (nonce using for prevent replay-attack, after again we need to sign message again).

- How to check user authorize?

we authorize by checking user has already have a nft for first time and generate jwt token for later use

## Usage

- TBD

## To-dos

- [ ] Update README.md
- [ ] Example
