import { create } from 'zustand'
import { MemeCoin, CoinCreationData, MemeTemplate } from '../types/meme'
import { generateMemeId, calculateViralScore } from '../lib/utils'

interface MemeState {
  coins: MemeCoin[]
  templates: MemeTemplate[]
  trendingCoins: MemeCoin[]
  isLoading: boolean
  error: string | null
  
  // Actions
  fetchCoins: () => Promise<void>
  fetchTrendingCoins: () => Promise<void>
  createCoin: (data: CoinCreationData) => Promise<string>
  updateCoinMetrics: (id: string, metrics: Partial<MemeCoin['socialMetrics']>) => void
  searchCoins: (query: string) => MemeCoin[]
  getCoinById: (id: string) => MemeCoin | undefined
}

// Mock data for development
const mockTemplates: MemeTemplate[] = [
  { id: '1', name: 'Doge Wow', image: '/templates/doge.jpg', category: 'Doge', popularity: 95 },
  { id: '2', name: 'Pepe Happy', image: '/templates/pepe.jpg', category: 'Pepe', popularity: 88 },
  { id: '3', name: 'Chad Yes', image: '/templates/chad.jpg', category: 'Chad', popularity: 82 },
  { id: '4', name: 'Stonks Up', image: '/templates/stonks.jpg', category: 'Stonks', popularity: 90 },
]

const mockCoins: MemeCoin[] = [
  {
    id: '1',
    name: 'DogeMax',
    symbol: 'DMAX',
    description: 'Much coin, very moon! 🚀',
    image: '', // Will use emoji fallback
    creator: 'GABC...XYZ',
    createdAt: new Date('2024-01-15'),
    totalSupply: 1000000,
    currentPrice: 0.0042,
    marketCap: 4200,
    holders: 2150,
    viralScore: 1250,
    tags: ['meme', 'doge', 'moon'],
    socialMetrics: {
      likes: 3200,
      shares: 850,
      comments: 420,
      views: 15000,
      trending: true
    }
  },
  {
    id: '2', 
    name: 'PepeCoin',
    symbol: 'PEPE',
    description: 'Feels good man! 🐸',
    image: '', // Will use emoji fallback
    creator: 'GDEF...ABC',
    createdAt: new Date('2024-01-14'),
    totalSupply: 500000,
    currentPrice: 0.0089,
    marketCap: 4450,
    holders: 1890,
    viralScore: 980,
    tags: ['meme', 'pepe', 'feels'],
    socialMetrics: {
      likes: 2800,
      shares: 650,
      comments: 320,
      views: 12000,
      trending: true
    }
  }
]

export const useMemeStore = create<MemeState>((set, get) => ({
  coins: mockCoins,
  templates: mockTemplates,
  trendingCoins: [],
  isLoading: false,
  error: null,

  fetchCoins: async () => {
    set({ isLoading: true, error: null })
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Update viral scores
      const updatedCoins = mockCoins.map(coin => ({
        ...coin,
        viralScore: calculateViralScore({
          likes: coin.socialMetrics.likes,
          shares: coin.socialMetrics.shares,
          comments: coin.socialMetrics.comments,
          views: coin.socialMetrics.views,
          age: (Date.now() - coin.createdAt.getTime()) / (1000 * 60 * 60)
        })
      }))
      
      set({ coins: updatedCoins, isLoading: false })
    } catch (error) {
      set({ error: 'Failed to fetch coins', isLoading: false })
    }
  },

  fetchTrendingCoins: async () => {
    const { coins } = get()
    const trending = coins
      .filter(coin => coin.socialMetrics.trending)
      .sort((a, b) => b.viralScore - a.viralScore)
      .slice(0, 10)
    
    set({ trendingCoins: trending })
  },

  createCoin: async (data: CoinCreationData) => {
    const id = generateMemeId()
    
    const newCoin: MemeCoin = {
      id,
      ...data,
      creator: 'CURRENT_USER', // Replace with actual user
      createdAt: new Date(),
      currentPrice: 0.001,
      marketCap: data.initialSupply * 0.001,
      holders: 1,
      viralScore: 10,
      socialMetrics: {
        likes: 0,
        shares: 0,
        comments: 0,
        views: 0,
        trending: false
      },
      totalSupply: data.initialSupply
    }
    
    set(state => ({
      coins: [newCoin, ...state.coins]
    }))
    
    return id
  },

  updateCoinMetrics: (id: string, metrics: Partial<MemeCoin['socialMetrics']>) => {
    set(state => ({
      coins: state.coins.map(coin => 
        coin.id === id 
          ? { 
              ...coin, 
              socialMetrics: { ...coin.socialMetrics, ...metrics },
              viralScore: calculateViralScore({
                likes: metrics.likes || coin.socialMetrics.likes,
                shares: metrics.shares || coin.socialMetrics.shares,
                comments: metrics.comments || coin.socialMetrics.comments,
                views: metrics.views || coin.socialMetrics.views,
                age: (Date.now() - coin.createdAt.getTime()) / (1000 * 60 * 60)
              })
            }
          : coin
      )
    }))
  },

  searchCoins: (query: string) => {
    const { coins } = get()
    return coins.filter(coin => 
      coin.name.toLowerCase().includes(query.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(query.toLowerCase()) ||
      coin.description.toLowerCase().includes(query.toLowerCase()) ||
      coin.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    )
  },

  getCoinById: (id: string) => {
    const { coins } = get()
    return coins.find(coin => coin.id === id)
  }
})) 