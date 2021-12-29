import { PublicKey } from "@solana/web3.js";

class Tweet {

  publicKey: PublicKey;
  author: PublicKey;
  content: string;
  topic: string;
  imageUrl: string;
  timestamp: string;
  likes: string;
  comments: string[];


  constructor(publicKey: PublicKey, accountData: any) {
    this.publicKey = publicKey;
    this.author = accountData.author.toString();
    this.timestamp = accountData.timestamp.toString();
    this.topic = accountData.topic;
    this.content = accountData.content;
    this.imageUrl = accountData.imageUrl;
    this.likes = accountData.likes.toString();
    this.comments = accountData.comments;
  }

}

export default Tweet;
