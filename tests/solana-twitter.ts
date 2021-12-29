import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { SolanaTwitter } from '../target/types/solana_twitter';
import * as assert from 'assert'
import { bs58 } from '@project-serum/anchor/dist/cjs/utils/bytes';

describe('solana-twitter', () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  const program = anchor.workspace.SolanaTwitter as Program<SolanaTwitter>;
  //let _tweet;

  it('can send a new tweet', async () => {
    const tweet = anchor.web3.Keypair.generate();
    await program.rpc.sendTweet('veganism', 'Hummus, am I right?', 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/golden-retriever-royalty-free-image-506756303-1560962726.jpg?crop=0.672xw:1.00xh;0.166xw,0&resize=640:*', {
      accounts: {
        tweet: tweet.publicKey,
        author: program.provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      },
      signers: [tweet],
    });

    const tweetAccount = await program.account.tweet.fetch(tweet.publicKey);
    const tweetAccounts = await program.account.tweet.all();
    console.log(tweetAccounts);

    // Ensure it has the right data.
    assert.equal(tweetAccount.author.toBase58(), program.provider.wallet.publicKey.toBase58());
    assert.equal(tweetAccount.topic, 'veganism');
    assert.equal(tweetAccount.content, 'Hummus, am I right?');
    assert.ok(tweetAccount.timestamp);
    assert.equal(tweetAccount.imageUrl, "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/golden-retriever-royalty-free-image-506756303-1560962726.jpg?crop=0.672xw:1.00xh;0.166xw,0&resize=640:*");
  });

  it('can add likes to a tweet', async () => {
    const tweetAccounts = await program.account.tweet.all();

    const tweetToLike = tweetAccounts[0];
    await program.rpc.likeTweet({
      accounts: {
        tweet: tweetToLike.publicKey,
      }
    });
    const tweetAccount = await program.account.tweet.fetch(tweetToLike.publicKey);

    // Ensure it has the right data.
    assert.equal(tweetAccount.likes.toString(), '1');

  });

  //it('can add a comment to a tweet', async () => {
  //const commenter = anchor.web3.Keypair.generate();
  //const tweetAccounts = await program.account.tweet.all();

  //const tweetToComment = tweetAccounts[10];
  ////console.log(tweetToComment.account.comments);

  //await program.rpc.commentTweet("my comment", {
  //accounts: {
  //tweet: tweetToComment.publicKey,
  //commenter: commenter.publicKey,
  //},
  //signers: [commenter]
  //});

  //const tweetAccount = await program.account.tweet.fetch(tweetToComment.publicKey);

  //////Ensure it has the right data.
  //console.log(commenter.publicKey.toString());
  //console.log("comments -> ", tweetAccount.comments);
  //assert.equal(tweetAccount.comments[6].commenter, commenter.publicKey.toString());

  //});


  //it('can send a tweet without a topic', async () => {
  //const tweet = anchor.web3.Keypair.generate();

  //await program.rpc.sendTweet('', 'gm', {
  //accounts: {
  //tweet: tweet.publicKey,
  //author: program.provider.wallet.publicKey,
  //systemProgram: anchor.web3.SystemProgram.programId,
  //},
  //signers: [tweet],
  //});

  //// Fetch the account details of the created tweet.
  //const tweetAccount = await program.account.tweet.fetch(tweet.publicKey);

  //// Ensure it has the right data.
  //assert.equal(tweetAccount.author.toBase58(), program.provider.wallet.publicKey.toBase58());
  //assert.equal(tweetAccount.topic, '');
  //assert.equal(tweetAccount.content, 'gm');
  //assert.ok(tweetAccount.timestamp);

  //})

  //it('can send a new tweet from a different author', async () => {
  //// Generate another user and airdrop them some SOL.
  //const otherUser = anchor.web3.Keypair.generate();

  //const signature = await program.provider.connection.requestAirdrop(otherUser.publicKey, 1000000000);
  //await program.provider.connection.confirmTransaction(signature);
  //// Call the "SendTweet" instruction on behalf of this other user.
  //const tweet = anchor.web3.Keypair.generate();
  //await program.rpc.sendTweet('veganism', 'Yay Tofu!', {
  //accounts: {
  //tweet: tweet.publicKey,
  //author: otherUser.publicKey,
  //systemProgram: anchor.web3.SystemProgram.programId,
  //},
  //signers: [otherUser, tweet],
  //});

  //// Fetch the account details of the created tweet.
  //const tweetAccount = await program.account.tweet.fetch(tweet.publicKey);

  //// Ensure it has the right data.
  //assert.equal(tweetAccount.author.toBase58(), otherUser.publicKey.toBase58());
  //assert.equal(tweetAccount.topic, 'veganism');
  //assert.equal(tweetAccount.content, 'Yay Tofu!');
  //assert.ok(tweetAccount.timestamp);
  //});

  //it('cannot provide a topic with more than 50 characters', async () => {
  //try {
  //const tweet = anchor.web3.Keypair.generate();
  //const topicWith51Chars = 'x'.repeat(51);
  //await program.rpc.sendTweet(topicWith51Chars, 'Hummus, am I right?', {
  //accounts: {
  //tweet: tweet.publicKey,
  //author: program.provider.wallet.publicKey,
  //systemProgram: anchor.web3.SystemProgram.programId,
  //},
  //signers: [tweet],
  //});
  //} catch (error) {
  //assert.equal(error.msg, 'The provided topic should be 50 characters long maximum.');
  //return;
  //}

  //assert.fail('The instruction should have failed with a 51-character topic.');
  //});

});
