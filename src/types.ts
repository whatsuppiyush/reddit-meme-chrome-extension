export interface Meme {
  id: string;
  title: string;
  url: string;
  author: string;
  subreddit: string;
  permalink: string;
}

export interface UserPreferences {
  subreddits: string[];
}