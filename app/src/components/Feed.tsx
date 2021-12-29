import { SparklesIcon } from '@heroicons/react/outline'
import "../App.css";
import { Program } from '@project-serum/anchor';
import { PublicKey } from '@solana/web3.js';
import { useCallback, useContext, useEffect, useState } from 'react';
import { IDL as idl } from '../types/idl';
import Post from './Post'
import TweetForm from './TweetForm';
import Tweet from '../types/Tweet';
import { ProviderContext } from '../state/providerContext';

const programID = new PublicKey(idl.metadata.address);

const Feed = () => {
  const provider = useContext(ProviderContext);

  const [tweets, setTweets] = useState<Tweet[]>([]);


  const fetchTweets = useCallback(async () => {
    const program = new Program(idl, programID, provider);
    const tweetAccounts = await program.account.tweet.all();
    const formattedTweets = tweetAccounts.map(({ publicKey, account }) => {
      return new Tweet(publicKey, account);
    });
    setTweets(formattedTweets);
  }, [provider, setTweets]);

  useEffect(() => {
    fetchTweets();
  }, [fetchTweets])

  return (
    <div className="col-span-4">
      <div className="flex -mt-1 justify-between border border-gray-600 p-3">
        <h1 className="text-xl font-semibold">Home</h1>
        <SparklesIcon className="w-5" />
      </div>

      <TweetForm provider={provider!} setTweets={setTweets} />

      {
        tweets?.map((tweet: Tweet, index: number) => (
          <Post key={index} tweet={tweet} provider={provider!} />
        ))
      }
    </div>
  )
}

export default Feed
