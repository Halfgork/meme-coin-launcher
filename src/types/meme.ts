export interface MemeCoin {
  id: string;
  name: string;
  symbol: string;
  description: string;
  image: string;
  memeTemplate?: string;
  creator: string;
  createdAt: Date;
  totalSupply: number;
  currentPrice: number;
  marketCap: number;
  holders: number;
  viralScore: number;
  tags: string[];
  socialMetrics: SocialMetrics;
  contractAddress?: string;
}

export interface SocialMetrics {
  likes: number;
  shares: number;
  comments: number;
  views: number;
  trending: boolean;
}

export interface MemeTemplate {
  id: string;
  name: string;
  image: string;
  category: string;
  popularity: number;
}

export interface CoinCreationData {
  name: string;
  symbol: string;
  description: string;
  image: string;
  memeTemplate?: string;
  initialSupply: number;
  tags: string[];
}

export interface Comment {
  id: string;
  user: string;
  content: string;
  timestamp: Date;
  likes: number;
}

export interface Reaction {
  type: 'like' | 'fire' | 'rocket' | 'diamond' | 'ape';
  count: number;
  userReacted: boolean;
} 