import { BellIcon, BookmarkIcon, HashtagIcon, HomeIcon, MailIcon, PlusIcon, UserIcon } from '@heroicons/react/outline'
import TabOption from './TabOption'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

const Options = () => {
  return (
    <div className="col-span-3">
      <div className="flex border-r-1 md:border-none border-r relative w-2/5 md:w-full h-screen flex-col items-center">

        <div className="flex justify-start md:w-1/2">
          <img src="https://help.twitter.com/content/dam/help-twitter/brand/logo.png" alt="twitter logo" className="w-12 md:w-16 md:-ml-2" />
        </div>

        <TabOption Icon={HomeIcon} name="Home" />
        <TabOption Icon={HashtagIcon} name="Explore" />
        <TabOption Icon={BellIcon} name="Notifications" />
        <TabOption Icon={MailIcon} name="Messages" />
        <TabOption Icon={BookmarkIcon} name="Bookmarks" />
        <TabOption Icon={UserIcon} name="Profile" />

        <button className="bg-twitter-blue md:hidden font-bold mt-8 text-white h-10 flex justify-center items-center rounded-3xl w-1/2">
          <PlusIcon className="w-5 h-5 font-bold bg-transparent" />
        </button>
        <button className="bg-twitter-blue hidden lg:block font-bold mt-8 text-white py-3 px-16 rounded-3xl w-1/2">Tweet</button>

        <WalletMultiButton style={{ backgroundColor: "#1DA1F2", borderRadius: "35px", marginTop: "30px", width: "200px", padding: "25px" }} />

      </div>
    </div>
  )
}

export default Options

