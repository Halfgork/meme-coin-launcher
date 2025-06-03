import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { MemeCoin, CoinCreationData, MemeTemplate } from '../types/meme'
import { generateMemeId, calculateViralScore } from '../lib/utils'

export interface MemeToken {
  id: string
  name: string
  symbol: string
  description: string
  image: string
  price: number
  priceChange24h: number
  marketCap: number
  volume24h: number
  holders: number
  createdAt: string
  creator: string
  contractAddress?: string
  initialSupply: number
  decimals: number
  tags: string[]
  templateId: string
  isUserCreated?: boolean
}

interface MemeState {
  coins: MemeCoin[]
  templates: MemeTemplate[]
  trendingCoins: MemeCoin[]
  isLoading: boolean
  error: string | null
  tokens: MemeToken[]
  trendingTokens: MemeToken[]
  newestTokens: MemeToken[]
  userCreatedTokens: MemeToken[]
  searchQuery: string
  selectedCategory: string
  
  // Actions
  fetchCoins: () => Promise<void>
  fetchTrendingCoins: () => Promise<void>
  createCoin: (data: CoinCreationData) => Promise<string>
  updateCoinMetrics: (id: string, metrics: Partial<MemeCoin['socialMetrics']>) => void
  searchCoins: (query: string) => MemeCoin[]
  getCoinById: (id: string) => MemeCoin | undefined
  setTokens: (tokens: MemeToken[]) => void
  setTrendingTokens: (tokens: MemeToken[]) => void
  setNewestTokens: (tokens: MemeToken[]) => void
  addUserCreatedToken: (token: Omit<MemeToken, 'id' | 'createdAt' | 'isUserCreated'>) => void
  setSearchQuery: (query: string) => void
  setSelectedCategory: (category: string) => void
  getFilteredTokens: () => MemeToken[]
  clearDuplicates: () => void
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

// Mock data - same as before but with new fields
const mockTokens: MemeToken[] = [
  {
    id: '1',
    name: 'DogeMax',
    symbol: 'DMAX',
    description: 'The ultimate doge experience with maximum wow factor! 🐕',
    image: '🐕',
    price: 0.000234,
    priceChange24h: 156.7,
    marketCap: 2340000,
    volume24h: 890000,
    holders: 12459,
    createdAt: '2024-01-15T10:30:00Z',
    creator: 'GABC...DEF123',
    initialSupply: 1000000000,
    decimals: 7,
    tags: ['doge', 'meme', 'wow'],
    templateId: 'doge'
  },
  {
    id: '2', 
    name: 'PepeCoin',
    symbol: 'PEPE',
    description: 'Feels good man! The rarest pepe on Stellar 🐸',
    image: '🐸',
    price: 0.000456,
    priceChange24h: -23.4,
    marketCap: 1890000,
    volume24h: 567000,
    holders: 8934,
    createdAt: '2024-01-14T15:45:00Z',
    creator: 'GXYZ...ABC789',
    initialSupply: 500000000,
    decimals: 7,
    tags: ['pepe', 'rare', 'feels'],
    templateId: 'pepe'
  },
  {
    id: '3',
    name: 'ShibaMax',
    symbol: 'SMAX',
    description: 'To the moon with Shiba power! 🚀🐕',
    image: '🐕‍🦺',
    price: 0.000123,
    priceChange24h: 89.2,
    marketCap: 3450000,
    volume24h: 1200000,
    holders: 15678,
    createdAt: '2024-01-13T08:20:00Z',
    creator: 'GDEF...XYZ456',
    initialSupply: 2000000000,
    decimals: 7,
    tags: ['shiba', 'moon', 'rocket'],
    templateId: 'doge'
  }
]

export const useMemeStore = create<MemeState>()(
  persist(
    (set, get) => ({
      coins: mockCoins,
      templates: mockTemplates,
      trendingCoins: [],
      isLoading: false,
      error: null,
      tokens: mockTokens,
      trendingTokens: mockTokens.slice(0, 2),
      newestTokens: mockTokens,
      userCreatedTokens: [],
      searchQuery: '',
      selectedCategory: 'all',
      
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
      },

      setTokens: (tokens) => set({ tokens }),
      setTrendingTokens: (tokens) => set({ trendingTokens: tokens }),
      setNewestTokens: (tokens) => set({ newestTokens: tokens }),
      
      addUserCreatedToken: (tokenData) => {
        const newToken: MemeToken = {
          ...tokenData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          isUserCreated: true,
          // Default values for new tokens
          price: 0.000001,
          priceChange24h: 0,
          marketCap: tokenData.initialSupply * 0.000001,
          volume24h: 0,
          holders: 1
        }
        
        // Check for duplicates by name and symbol
        const isDuplicate = (state: MemeState) => 
          state.tokens.some(token => 
            token.name === newToken.name && 
            token.symbol === newToken.symbol &&
            token.creator === newToken.creator
          )
        
        set((state) => {
          if (isDuplicate(state)) {
            console.log('Duplicate token prevented:', newToken.name)
            return state // Don't add if duplicate exists
          }
          
          return {
            userCreatedTokens: [newToken, ...state.userCreatedTokens],
            newestTokens: [newToken, ...state.newestTokens],
            tokens: [newToken, ...state.tokens]
          }
        })
      },
      
      setSearchQuery: (query) => set({ searchQuery: query }),
      setSelectedCategory: (category) => set({ selectedCategory: category }),
      
      getFilteredTokens: () => {
        const state = get()
        let filtered = state.tokens
        
        if (state.searchQuery) {
          filtered = filtered.filter(token => 
            token.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
            token.symbol.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
            token.tags.some(tag => tag.toLowerCase().includes(state.searchQuery.toLowerCase()))
          )
        }
        
        if (state.selectedCategory !== 'all') {
          filtered = filtered.filter(token => 
            token.tags.includes(state.selectedCategory) ||
            token.templateId === state.selectedCategory
          )
        }
        
        return filtered
      },

      clearDuplicates: () => {
        set((state) => {
          const uniqueTokens = state.tokens.filter((token, index, arr) => 
            index === arr.findIndex(t => 
              t.name === token.name && 
              t.symbol === token.symbol && 
              t.creator === token.creator
            )
          )
          
          return {
            tokens: uniqueTokens,
            newestTokens: uniqueTokens.filter(t => t.isUserCreated || 
              state.newestTokens.some(nt => nt.id === t.id)
            ),
            userCreatedTokens: uniqueTokens.filter(t => t.isUserCreated)
          }
        })
      }
    }),
    {
      name: 'meme-store',
      partialize: (state) => ({ 
        userCreatedTokens: state.userCreatedTokens,
        tokens: state.tokens.filter(token => token.isUserCreated)
      })
    }
  )
) 