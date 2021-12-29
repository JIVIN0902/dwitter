import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

const Welcome = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="">
        <h1 className="text-4xl text-center font-bold">Welcome to Dwitter!</h1>
        <h4 className="text-xl text-center font-normal">Decentralized Twitter on the solana blockchain</h4>

        <div className="flex justify-center">
          <img src="https://help.twitter.com/content/dam/help-twitter/brand/logo.png" alt="twitter logo" className="w-12 md:w-20 md:-ml-2" />
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
          <WalletMultiButton />
        </div>
      </div>
    </div>

  )
}

export default Welcome

