import { PhotographIcon } from '@heroicons/react/outline'
import { useState } from 'react'
import { create } from 'ipfs-http-client'
import { Program, Provider } from '@project-serum/anchor';
import { IDL as idl } from '../types/idl';
import { Keypair, PublicKey, SystemProgram } from '@solana/web3.js';
import Loader from './Loader';
import Tweet from '../types/Tweet';

const client = create({ url: "https://ipfs.infura.io:5001/api/v0" });

const programID = new PublicKey(idl.metadata.address);

interface Props {
  provider: Provider
  setTweets: React.Dispatch<React.SetStateAction<Tweet[]>>
}

const TweetForm: React.FC<Props> = ({ provider, setTweets }) => {
  const [fileUrl, updateFileUrl] = useState(``)
  const [topic, setTopic] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false);
  const MAX_CONTENT_LENGTH = 280;
  const MAX_TOPIC_LENGTH = 50;

  const handleFileInput = async (e: any) => {
    const file = e.target.files[0]
    if (!file) return;
    setLoading(true);
    try {
      const added = await client.add(file)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      updateFileUrl(url)
    } catch (error) {
      alert("Could not upload file to ipfs. Pls try again.")
      console.log('Error uploading file: ', error)
    }
    setLoading(false);
  }

  const sendTweet = async () => {
    if (topic === '' || content === '') {
      alert('Please enter a topic and content');
      return;
    }

    if (topic.length > 50 || content.length > 280) {
      return alert('Topic and content must be less than 50 characters and 280 characters respectively');
    }

    if (!programID) return;

    setLoading(true);
    const baseAccount = Keypair.generate();
    const program = new Program(idl, programID!, provider);
    try {

      await program.rpc.sendTweet(topic, content, fileUrl, {
        accounts: {
          tweet: baseAccount.publicKey,
          author: provider.wallet.publicKey,
          systemProgram: SystemProgram.programId,
        },
        signers: [baseAccount],
      });

      const latestTweet = await program.account.tweet.fetch(baseAccount.publicKey);
      setTweets((prev: Tweet[]) => [new Tweet(baseAccount.publicKey, latestTweet), ...prev]);
      setTopic('');
      setContent('');
      updateFileUrl(``);
    } catch (e) {
      alert("Something went wrong. Pls try again.")
      console.log('Error ->', e);
    }
    setLoading(false);
  }


  return (
    <div className="border border-gray-600 p-3">
      <div className="flex items-center">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAxLx1vo3kyXmWD5l48rJcz_XE      HEw5LcTvXw&usqp=CAU" className="h-12 w-12 rounded-3xl" alt="" />
        <input type="text" value={content} onChange={e => {
          setContent(e.target.value)
          console.log(content.length)
        }} className={`focus:outline-none ml-4 text-lg w-80`} placeholder="What's happening?" />
        <span className="ml-4 text-gray-400">Remain {MAX_CONTENT_LENGTH - content.length}</span>
      </div>

      <div className="flex items-center">
        <input type="text" value={topic} onChange={e => {
          setTopic(e.target.value)
        }} className="focus:outline-none border border-twitter-blue rounded-3xl px-4 bg-light-black py-1 mb-4 ml-12" placeholder="# Topic" />
        <span className="ml-4 text-gray-400 -mt-4">Remain {MAX_TOPIC_LENGTH - topic.length}</span>
      </div>

      <div className="flex justify-center">
        <img src={fileUrl || ""} alt="" className={`${!fileUrl ? "hidden" : "m-3"} rounded-2xl h-72`} />
      </div>
      <div className="flex justify-evenly items-center">
        <div className="relative">
          <input type="file" onChange={handleFileInput} className="opacity-0 w-8" />
          <PhotographIcon className="w-6 -mt-7 cursor-pointer" />
        </div>
        {loading ? <Loader /> : (

          <button onClick={sendTweet} className="bg-twitter-blue rounded-3xl px-16 py-2">Tweet</button>
        )}
      </div>
    </div>
  )
}

export default TweetForm

