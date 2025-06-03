import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(num: number): string {
  if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B'
  if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M'
  if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K'
  return num.toString()
}

export function formatPrice(price: number): string {
  if (price < 0.01) return price.toFixed(6)
  if (price < 1) return price.toFixed(4)
  return price.toFixed(2)
}

export function calculateViralScore(metrics: {
  likes: number
  shares: number
  comments: number
  views: number
  age: number // in hours
}): number {
  const { likes, shares, comments, views, age } = metrics
  
  // Weight different metrics
  const engagementScore = likes * 1 + shares * 3 + comments * 2
  const viewRatio = views > 0 ? engagementScore / views : 0
  
  // Time decay factor (newer posts get higher scores)
  const timeDecay = Math.max(0.1, 1 / (1 + age / 24))
  
  return Math.round((viewRatio * 1000 + engagementScore / 10) * timeDecay)
}

export function shortenAddress(address: string, chars = 4): string {
  if (!address) return ''
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`
}

export function generateMemeId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

export function getRandomEmoji(): string {
  const emojis = ['🚀', '💎', '🔥', '⚡', '🌙', '💰', '🎯', '⭐', '🎭', '🎪']
  return emojis[Math.floor(Math.random() * emojis.length)]
} 