export const COLORS = {
  primary: '#FF6B35',
  secondary: '#7209B7', 
  accent: '#00D9FF',
  success: '#32D74B',
  background: {
    from: '#000000',
    to: '#111111'
  }
} as const

export const NETWORKS = {
  testnet: {
    name: 'Testnet',
    networkPassphrase: 'Test SDF Network ; September 2015',
    horizonUrl: 'https://horizon-testnet.stellar.org',
    sorobanRpcUrl: 'https://soroban-testnet.stellar.org'
  },
  mainnet: {
    name: 'Mainnet', 
    networkPassphrase: 'Public Global Stellar Network ; September 2015',
    horizonUrl: 'https://horizon.stellar.org',
    sorobanRpcUrl: 'https://soroban-mainnet.stellar.org'
  }
} as const

export const MEME_CATEGORIES = [
  'Doge',
  'Pepe', 
  'Chad',
  'Wojak',
  'Stonks',
  'This is Fine',
  'Drake',
  'Galaxy Brain',
  'Distracted Boyfriend',
  'Custom'
] as const

export const VIRAL_THRESHOLDS = {
  trending: 100,
  hot: 500,
  viral: 1000,
  legendary: 5000
} as const

export const MAX_COIN_NAME_LENGTH = 32
export const MAX_SYMBOL_LENGTH = 8
export const MAX_DESCRIPTION_LENGTH = 280
export const DEFAULT_INITIAL_SUPPLY = 1000000

export const REACTION_EMOJIS = {
  like: '❤️',
  fire: '🔥', 
  rocket: '🚀',
  diamond: '💎',
  ape: '🦍'
} as const 