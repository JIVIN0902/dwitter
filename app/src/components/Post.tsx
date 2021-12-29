import { ChatAltIcon, HeartIcon } from '@heroicons/react/outline'
import { Program, Provider } from '@project-serum/anchor';
import { PublicKey } from '@solana/web3.js';
import React, { useState } from 'react'
import { IDL } from '../types/idl';
import Tweet from '../types/Tweet';
import { CommentModal } from './CommentModal'
import Loader from './Loader';

interface Props {
  tweet: Tweet;
  provider: Provider;
}

const programID = new PublicKey(IDL.metadata.address);
const Post: React.FC<Props> = ({ tweet, provider }) => {

  const [loading, setLoading] = useState(false);
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const [likes, setLikes] = useState(parseInt(tweet.likes));
  const [comments, setComments] = useState(tweet.comments.length);

  const program = new Program(IDL, programID, provider);
  const likeTweet = async () => {
    try {

      setLoading(true);
      await program.rpc.likeTweet({
        accounts: {
          tweet: tweet.publicKey,
        }
      });
      setLikes(likes + 1);

    } catch (e) {
      alert("Something went wrong. Pls try again!");
    }
    setLoading(false);
  }

  return (
    <div className="border-gray-600 border p-3">

      <div className="flex">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAxLx1vo3kyXmWD5l48rJcz_XE      HEw5LcTvXw&usqp=CAU" className="h-9 w-9 rounded-3xl" alt="" />
        <div className="px-2">
          <h1 className="text-sm">
            <span className="text-gray-400">@{tweet.author.toString()}</span>
          </h1>
          <p>{tweet.content}</p>
        </div>
      </div>

      <div className="text-twitter-blue ml-11">
        {tweet.topic.split(" ").map(topic => `#${topic} `)}
      </div>

      <div>
        <img src={tweet.imageUrl} alt="" className={tweet.imageUrl !== "" ? `w-80 mx-auto m-3 rounded-lg border border-gray-500` : ""} />
      </div>

      <div className="mt-2 flex justify-around">
        <div className="flex items-center">
          <span className="text-sm mr-1">{comments < 1 ? "" : comments}</span>
          <ChatAltIcon onClick={() => setCommentModalOpen(true)} className="w-4 h-4 text-blue-400 cursor-pointer" />
        </div>

        <div className="flex items-center">
          {loading ? <Loader /> :
            <>
              <span className="text-sm mr-1">{likes < 1 ? "" : likes}</span>
              <HeartIcon onClick={likeTweet} className="w-4 h-4 text-gray-400 cursor-pointe cursor-pointer" />
            </>
          }
        </div>
      </div>

      <CommentModal setComments={setComments} provider={provider} tweet={tweet} open={commentModalOpen} setOpen={setCommentModalOpen} />
    </div>
  )
}

export default Post

