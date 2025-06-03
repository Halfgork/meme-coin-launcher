import { create } from 'zustand'
import { WalletConnection } from '../types/user'

// Stellar Wallets Kit imports
let StellarWalletsKit: any = null
let WalletNetwork: any = null
let XBULL_ID: any = null
let FREIGHTER_ID: any = null
let allowAllModules: any = null

// Dynamic import for client-side only
if (typeof window !== 'undefined') {
  import('@creit.tech/stellar-wallets-kit').then((module) => {
    StellarWalletsKit = module.StellarWalletsKit
    WalletNetwork = module.WalletNetwork
    XBULL_ID = module.XBULL_ID
    FREIGHTER_ID = module.FREIGHTER_ID
    allowAllModules = module.allowAllModules
  })
}

interface WalletState {
  connection: WalletConnection
  isConnecting: boolean
  error: string | null
  kit: any
  
  // Actions
  connect: () => Promise<void>
  disconnect: () => void
  setConnection: (connection: Partial<WalletConnection>) => void
  setError: (error: string | null) => void
  initializeKit: () => void
}

export const useWalletStore = create<WalletState>((set, get) => ({
  connection: {
    connected: false,
    address: undefined,
    balance: undefined,
    network: 'testnet'
  },
  isConnecting: false,
  error: null,
  kit: null,

  initializeKit: () => {
    if (typeof window !== 'undefined' && StellarWalletsKit && !get().kit) {
      const kit = new StellarWalletsKit({
        network: WalletNetwork.TESTNET,
        selectedWalletId: FREIGHTER_ID,
        modules: allowAllModules()
      })
      
      set({ kit })
    }
  },

  connect: async () => {
    const { kit, initializeKit } = get()
    
    if (!kit) {
      initializeKit()
    }
    
    set({ isConnecting: true, error: null })
    
    try {
      const { kit: currentKit } = get()
      
      if (!currentKit) {
        throw new Error('Wallet kit not initialized')
      }

      // Open wallet selection modal
      await currentKit.openModal({
        onWalletSelected: async (option: any) => {
          try {
            // Set the selected wallet
            currentKit.setWallet(option.id)
            
            // Connect to the wallet
            const { address } = await currentKit.getAddress()
            
            // Get balance (simplified for demo)
            let balance = 0
            try {
              // You would implement actual balance fetching here
              // const server = new StellarSdk.Horizon.Server('https://horizon-testnet.stellar.org')
              // const account = await server.loadAccount(address)
              // balance = account.balances.find(b => b.asset_type === 'native')?.balance || '0'
              balance = Math.random() * 1000 // Mock balance for now
            } catch (e) {
              console.warn('Could not fetch balance:', e)
            }

            set({
              connection: {
                connected: true,
                address,
                balance,
                network: 'testnet'
              },
              isConnecting: false,
              error: null
            })
            
            console.log('✅ Wallet connected:', address)
            
          } catch (error: any) {
            console.error('❌ Wallet connection error:', error)
            set({ 
              error: error.message || 'Failed to connect wallet',
              isConnecting: false 
            })
          }
        },
        onClosed: () => {
          set({ isConnecting: false })
        }
      })
      
    } catch (error: any) {
      console.error('❌ Wallet kit error:', error)
      set({ 
        error: error.message || 'Failed to initialize wallet connection',
        isConnecting: false 
      })
    }
  },

  disconnect: () => {
    const { kit } = get()
    
    try {
      // Close any open modals and reset wallet
      if (kit) {
        kit.setWallet('')
      }
      
      set({
        connection: {
          connected: false,
          address: undefined,
          balance: undefined,
          network: 'testnet'
        },
        error: null
      })
      
      console.log('✅ Wallet disconnected')
      
    } catch (error) {
      console.warn('Warning during disconnect:', error)
    }
  },

  setConnection: (connectionUpdate) => {
    set(state => ({
      connection: { ...state.connection, ...connectionUpdate }
    }))
  },

  setError: (error) => {
    set({ error })
  }
})) 