import type { Meme } from '../types';

const isValidImageUrl = (url: string): boolean => {
  return (
    url.match(/\.(jpg|jpeg|png|gif)$/i) !== null &&
    !url.includes('gallery') &&
    !url.includes('v.redd.it') &&
    !url.includes('gfycat.com')
  );
};

export async function fetchMemes(subreddits: string[]): Promise<Meme[]> {
  try {
    const randomSubreddit = subreddits[Math.floor(Math.random() * subreddits.length)];
    const response = await fetch(
      `https://www.reddit.com/r/${randomSubreddit}/hot.json?limit=50`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    const validMemes = data.data.children
      .map((post: any): Meme | null => {
        const { data } = post;
        if (!isValidImageUrl(data.url)) {
          return null;
        }

        return {
          id: data.id,
          title: data.title,
          url: data.url,
          author: data.author,
          subreddit: data.subreddit,
          permalink: data.permalink,
        };
      })
      .filter((meme: Meme | null): meme is Meme => meme !== null);

    // Shuffle and return memes
    return validMemes
      .sort(() => Math.random() - 0.5)
      .slice(0, 2);
  } catch (error) {
    console.error('Error fetching memes:', error);
    return [];
  }
}