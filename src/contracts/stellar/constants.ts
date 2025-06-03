// Deployed contract information
export const MEME_TOKEN_CONTRACT_ADDRESS = 'CDC5RY5NHDYL4KCRP2OPAU6XL3GNR4L3P3R2PJTPV4PVUJBAFAUMVDN7'

// Network configuration
export const STELLAR_NETWORKS = {
  TESTNET: {
    name: 'testnet',
    networkPassphrase: 'Test SDF Network ; September 2015',
    horizonUrl: 'https://horizon-testnet.stellar.org',
    sorobanUrl: 'https://soroban-testnet.stellar.org'
  },
  MAINNET: {
    name: 'mainnet', 
    networkPassphrase: 'Public Global Stellar Network ; September 2015',
    horizonUrl: 'https://horizon.stellar.org',
    sorobanUrl: 'https://soroban.stellar.org'
  }
} as const

// Current network (change to MAINNET for production)
export const CURRENT_NETWORK = STELLAR_NETWORKS.TESTNET

// Contract explorer URL
export const CONTRACT_EXPLORER_URL = `https://stellar.expert/explorer/${CURRENT_NETWORK.name}/contract/${MEME_TOKEN_CONTRACT_ADDRESS}` 