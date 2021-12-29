export type SolanaTwitter = {
  "version": "0.0.0",
  "name": "solana_twitter",
  "instructions": [
    {
      "name": "sendTweet",
      "accounts": [
        {
          "name": "tweet",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "author",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "topic",
          "type": "string"
        },
        {
          "name": "content",
          "type": "string"
        },
        {
          "name": "imageUrl",
          "type": "string"
        }
      ]
    },
    {
      "name": "likeTweet",
      "accounts": [
        {
          "name": "tweet",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "commentTweet",
      "accounts": [
        {
          "name": "tweet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "commenter",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "comment",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "tweet",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "author",
            "type": "publicKey"
          },
          {
            "name": "timestamp",
            "type": "i64"
          },
          {
            "name": "topic",
            "type": "string"
          },
          {
            "name": "content",
            "type": "string"
          },
          {
            "name": "likes",
            "type": "u64"
          },
          {
            "name": "comments",
            "type": {
              "vec": {
                "defined": "Comment"
              }
            }
          },
          {
            "name": "imageUrl",
            "type": "string"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "Comment",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "commenter",
            "type": "string"
          },
          {
            "name": "comment",
            "type": "string"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 300,
      "name": "TopicTooLong",
      "msg": "The provided topic should be 50 characters long maximum."
    },
    {
      "code": 301,
      "name": "ContentTooLong",
      "msg": "The provided content should be 280 characters long maximum."
    }
  ],
  "metadata": {
    "address": "7vkKzZfMTSAR2ZaSzxZozJJY8jTuixe8TEyGbDV9yvtt"
  }
};

export const IDL: SolanaTwitter = {
  "version": "0.0.0",
  "name": "solana_twitter",
  "instructions": [
    {
      "name": "sendTweet",
      "accounts": [
        {
          "name": "tweet",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "author",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "topic",
          "type": "string"
        },
        {
          "name": "content",
          "type": "string"
        },
        {
          "name": "imageUrl",
          "type": "string"
        }
      ]
    },
    {
      "name": "likeTweet",
      "accounts": [
        {
          "name": "tweet",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "commentTweet",
      "accounts": [
        {
          "name": "tweet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "commenter",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "comment",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "tweet",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "author",
            "type": "publicKey"
          },
          {
            "name": "timestamp",
            "type": "i64"
          },
          {
            "name": "topic",
            "type": "string"
          },
          {
            "name": "content",
            "type": "string"
          },
          {
            "name": "likes",
            "type": "u64"
          },
          {
            "name": "comments",
            "type": {
              "vec": {
                "defined": "Comment"
              }
            }
          },
          {
            "name": "imageUrl",
            "type": "string"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "Comment",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "commenter",
            "type": "string"
          },
          {
            "name": "comment",
            "type": "string"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 300,
      "name": "TopicTooLong",
      "msg": "The provided topic should be 50 characters long maximum."
    },
    {
      "code": 301,
      "name": "ContentTooLong",
      "msg": "The provided content should be 280 characters long maximum."
    }
  ],
  "metadata": {
    "address": "7vkKzZfMTSAR2ZaSzxZozJJY8jTuixe8TEyGbDV9yvtt"
  }
};
