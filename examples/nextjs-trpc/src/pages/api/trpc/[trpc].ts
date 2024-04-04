/**
 * This is the API-handler of your app that contains all your API routes.
 * On a bigger app, you will probably want to split this file up into multiple files.
 */
import * as trpcNext from "@trpc/server/adapters/next";
import { publicProcedure, router } from "~/server/trpc";
import { z } from "zod";
import { nftAuth } from "~/server/nft-auth";
import { NftAuth } from "@cuonghx.gu-tech/nft-auth-js";

const appRouter = router({
  getNonce: publicProcedure.query(() => {
    return { nonce: "9999" };
  }),
  login: publicProcedure
    .input(
      z.object({
        signerAddress: z.string(),
        signedMessage: z.string(),
        signedSignature: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const nftAuth = (ctx as any).nftAuth as NftAuth;
      return nftAuth.generateToken(input);
    }),
});

// export only the type definition of the API
// None of the actual implementation is exposed to the client
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => ({
    nftAuth,
  }),
});
