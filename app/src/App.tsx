import Home from './Home'
import './App.css';
import { getPhantomWallet } from '@solana/wallet-adapter-wallets';
import { useWallet, WalletProvider, ConnectionProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';
import Welcome from './components/Welcome';
import ProviderContextProvider from './state/providerContext';
import { clusterApiUrl } from '@solana/web3.js';

const endpoint = clusterApiUrl("devnet")

const App = () => {

  const wallet = useWallet();

  if (!wallet.connected) {
    return (
      <Welcome />
    )
  }
  else {
    return (
      <Home />
    );
  }
}

const AppWithProvider = () => {
  const wallets = [getPhantomWallet()];

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <ProviderContextProvider>
            <App />
          </ProviderContextProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>

  )
};

export default AppWithProvider;
