export interface User {
  id: string;
  walletAddress: string;
  username?: string;
  avatar?: string;
  bio?: string;
  joinedAt: Date;
  stats: UserStats;
  socialLinks?: SocialLinks;
}

export interface UserStats {
  coinsCreated: number;
  totalViralScore: number;
  followers: number;
  following: number;
  totalLikes: number;
  portfolioValue: number;
}

export interface SocialLinks {
  twitter?: string;
  discord?: string;
  telegram?: string;
  website?: string;
}

export interface WalletConnection {
  connected: boolean;
  address?: string;
  balance?: number;
  network?: string;
} 