import { SearchIcon } from '@heroicons/react/outline'
import Event from './Event'

const Happening = () => {
  return (
    <div className="col-span-3">
      <div className="flex items-center rounded-3xl bg-light-black mx-auto mt-2 focus:border-twitter-blue focus:border px-1 py-2 w-4/5">
        <SearchIcon className="h-5 w-5 mr-3 bg-transparent" />
        <input type="text" placeholder="Search Dwitter" className="bg-transparent focus:outline-none flex-1" />
      </div>

      <div className="w-4/5 mx-auto mt-4 bg-light-black rounded-xl p-3">
        <h1 className="text-xl font-bold bg-transparent">What's Happening</h1>
        <Event content="Omicron variant of COVID-19: Two cases detected in Karnataka, Centre-states meet to review guidelines" heading="COVID-19 Live" tags={["OmnicronVariant", "Covid19"]} />
        <Event content="Bitcoin has been hitting the limelight again" heading="Bitcoin Plummets" tags={["Bitcoin", "Crypto"]} />
        <Event content="Is solana the eth killer" heading="Solana surges" tags={["Solana", "Crypto"]} />
      </div>
    </div>
  )
}

export default Happening

