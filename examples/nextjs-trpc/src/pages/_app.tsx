import type { AppType } from 'next/app';
import { trpc } from '../utils/trpc';
import { createConfig, http, WagmiProvider } from 'wagmi';
import {  sepolia } from 'wagmi/chains'

const config = createConfig({
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(),
  },
})


const MyApp: AppType = ({ Component, pageProps }) => {
  return <WagmiProvider config={config}>
    <Component {...pageProps} />
  </WagmiProvider>;
};

export default trpc.withTRPC(MyApp);
