import { NftAuth } from "@cuonghx.gu-tech/nft-auth-js";

const globalForNftAuth = (global as unknown) as { nftAuth: NftAuth };

export const nftAuth =
  globalForNftAuth.nftAuth ||
  new NftAuth({
    rpcUrl: "https://rpc-1.testnet.japanopenchain.org:8545",
    contractAddress: "0xf229A381c00680CD49f4a77179FAf8F3265c5A5F",
    options: {
      jwtSecretKey: "very_secret_key",
      jwtExpiresIn: "1d",
    },
  });

if (process.env.NODE_ENV !== "production") globalForNftAuth.nftAuth = nftAuth;
