import { Provider } from "@project-serum/anchor";
import { useWallet } from "@solana/wallet-adapter-react";
import { clusterApiUrl, Connection } from "@solana/web3.js";
import { createContext } from "react";

export const ProviderContext = createContext<Provider | undefined>(undefined);

const opts = {
  preflightCommitment: "processed"
}
const ProviderContextProvider: React.FC = ({ children }) => {

  const wallet = useWallet();
  const getProvider = () => {
    /* create the provider and return it to the caller */
    /* network set to local network for now */
    const network = clusterApiUrl("devnet");
    const connection = new Connection(network);

    const provider = new Provider(
      connection, wallet as any, opts.preflightCommitment as any,
    );
    return provider;
  }

  return (
    <ProviderContext.Provider value={getProvider()}>
      {children}
    </ProviderContext.Provider>
  )
}

export default ProviderContextProvider;
