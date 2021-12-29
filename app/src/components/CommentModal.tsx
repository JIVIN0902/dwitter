import { XIcon } from '@heroicons/react/outline'
import { Program, Provider } from '@project-serum/anchor';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import React, { useState } from 'react'
import { IDL as idl } from '../types/idl';
import Tweet from '../types/Tweet';
import Loader from './Loader';

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  tweet: Tweet;
  provider: Provider;
  setComments: React.Dispatch<React.SetStateAction<number>>;
}

const programID = new PublicKey(idl.metadata.address);

export const CommentModal: React.FC<Props> = ({ open, setOpen, tweet, provider, setComments }) => {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const wallet = useWallet();
  const program = new Program(idl, programID, provider);
  const commentTweet = async () => {
    try {

      setLoading(true);
      if (!wallet.adapter?.publicKey) return;

      await program.rpc.commentTweet("comment", {
        accounts: {
          tweet: tweet.publicKey,
          commenter: provider.wallet?.publicKey,
        },
      });
      setComment("");
      setComments((prev: number) => prev + 1);

    } catch (e) {
      alert("Something went wrong. Pls try again.")
    }
    setLoading(false);
  }

  return (
    <div className={`fixed opacity-90 z-10 inset-0 overflow-y-auto ${!open ? "hidden" : ""}`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-start min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-modal-bg transition-opacity" aria-hidden="true"></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div style={{ marginTop: "-200px" }} className="inline-block opacity-100 z-10 align-bottom bg-black rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="p-3"><XIcon onClick={() => setOpen(false)} className="cursor-pointer w-6" /></div>
          <hr className="h-px bg-gray-600 border-none" />
          <div className="p-2 flex items-center">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAxLx1vo3kyXmWD5l48rJcz_XE      HEw5LcTvXw&usqp=CAU" className="h-6 w-6 mr-2 rounded-3xl" alt="" />
            <h5 className="text-sm text-gray-400">{tweet.author.toString()}</h5>
          </div>
          <div className="px-8">{tweet.content}</div>
          <h4 className="text-sm ml-8 mt-3">Replying to <span className="text-twitter-blue text-sm">@{tweet.author.toString().substring(0, 20) + "..."}</span></h4>

          <div className="bg-black px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 bg-black flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAxLx1vo3kyXmWD5l48rJcz_XE      HEw5LcTvXw&usqp=CAU" className="w-16 mr-2 rounded-3xl" alt="" />
              </div>

              <div className="mt-3 bg-black text-center sm:mt-0 sm:ml-4 sm:text-left">
                {
                  loading ? <Loader /> :
                    <input type="text" value={comment} onChange={e => setComment(e.target.value)} className="focus:outline-none p-2 text-lg" placeholder="Tweet Your Reply" />
                }
              </div>
            </div>
          </div>

          <div className="bg-black px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button type="button" className="w-full inline-flex justify-center rounded-full border border-transparent shadow-sm px-8 py-2 text-base font-medium text-white hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm bg-twitter-blue" onClick={commentTweet}>
              Reply
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

