/**
 * Instagram reels for the homepage gallery.
 * Add more by dropping a thumbnail in /public/assets/images/reel/
 * and adding an entry with type:'reel' + embedPath.
 */

export interface InstagramPost {
  id: number;
  image: string;
  caption: string;
  postUrl: string;
  type?: 'post' | 'reel';
  embedPath?: string;
}

export const instagramPosts: InstagramPost[] = [
  {
    id: 1,
    image: '/assets/images/reel/reel1.png',
    caption: 'A space transformed — watch the full reveal.',
    postUrl: 'https://www.instagram.com/reel/DTpusvRkuUj/',
    type: 'reel',
    embedPath: 'reel/DTpusvRkuUj',
  },
  {
    id: 2,
    image: '/assets/images/reel/reel2.png',
    caption: 'Crafting elegance from scratch — design in motion.',
    postUrl: 'https://www.instagram.com/reel/DTNkA24kpAY/',
    type: 'reel',
    embedPath: 'reel/DTNkA24kpAY',
  },
  {
    id: 3,
    image: '/assets/images/reel/reel3.png',
    caption: 'Every detail considered, every corner curated.',
    postUrl: 'https://www.instagram.com/reel/DSxkREmkgQk/',
    type: 'reel',
    embedPath: 'reel/DSxkREmkgQk',
  },
];
