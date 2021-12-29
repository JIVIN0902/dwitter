use anchor_lang::prelude::*;
use anchor_lang::solana_program::system_program;

declare_id!("7vkKzZfMTSAR2ZaSzxZozJJY8jTuixe8TEyGbDV9yvtt");

#[program]
pub mod solana_twitter {
    use super::*;
    pub fn send_tweet(
        ctx: Context<SendTweet>,
        topic: String,
        content: String,
        image_url: String,
    ) -> ProgramResult {
        let tweet = &mut ctx.accounts.tweet;
        let author = &ctx.accounts.author;
        let clock: Clock = Clock::get().unwrap();

        if topic.chars().count() > 50 {
            return Err(ErrorCode::TopicTooLong.into());
        }

        if content.chars().count() > 280 {
            return Err(ErrorCode::ContentTooLong.into());
        }

        tweet.author = *author.key;
        tweet.timestamp = clock.unix_timestamp;
        tweet.topic = topic;
        tweet.content = content;
        tweet.image_url = image_url;
        tweet.likes = 0;
        tweet.comments = vec![];

        Ok(())
    }

    pub fn like_tweet(ctx: Context<LikeTweet>) -> ProgramResult {
        let tweet = &mut ctx.accounts.tweet;
        tweet.likes += 1;
        Ok(())
    }

    pub fn comment_tweet(ctx: Context<CommentTweet>, comment: String) -> ProgramResult {
        let tweet = &mut ctx.accounts.tweet;
        let comment = Comment {
            comment,
            commenter: ctx.accounts.commenter.key.to_string(),
        };
        tweet.comments.push(comment);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct SendTweet<'info> {
    #[account(init, payer = author, space = Tweet::LEN)]
    pub tweet: Account<'info, Tweet>,
    #[account(mut)]
    pub author: Signer<'info>,
    #[account(address = system_program::ID)]
    pub system_program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct LikeTweet<'info> {
    #[account(mut)]
    pub tweet: Account<'info, Tweet>,
}

#[derive(Accounts)]
pub struct CommentTweet<'info> {
    #[account(mut)]
    pub tweet: Account<'info, Tweet>,
    #[account(mut)]
    pub commenter: Signer<'info>,
}

#[account]
pub struct Tweet {
    pub author: Pubkey,
    pub timestamp: i64,
    pub topic: String,
    pub content: String,
    pub likes: u64,
    pub comments: Vec<Comment>,
    pub image_url: String,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct Comment {
    pub commenter: String,
    pub comment: String,
}

const DISCRIMINATOR_LENGTH: usize = 8;
const PUBLIC_KEY_LENGTH: usize = 32;
const TIMESTAMP_LENGTH: usize = 8;
const STRING_LENGTH_PREFIX: usize = 4; // Stores the size of the string.
const MAX_TOPIC_LENGTH: usize = 50 * 4; // 50 chars max.
const MAX_CONTENT_LENGTH: usize = 280 * 4; // 280 chars max.

// 3. Add a constant on the Tweet account that provides its total size.
impl Tweet {
    const LEN: usize = DISCRIMINATOR_LENGTH
        + PUBLIC_KEY_LENGTH // Author.
        + TIMESTAMP_LENGTH // Timestamp.
        + STRING_LENGTH_PREFIX + MAX_TOPIC_LENGTH // Topic.
        + STRING_LENGTH_PREFIX + MAX_CONTENT_LENGTH; // Content.
}

#[error]
pub enum ErrorCode {
    #[msg("The provided topic should be 50 characters long maximum.")]
    TopicTooLong,

    #[msg("The provided content should be 280 characters long maximum.")]
    ContentTooLong,
}
