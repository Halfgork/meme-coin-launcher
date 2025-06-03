'use client'

import { motion } from 'framer-motion'
import { Wallet, ChevronDown, LogOut, Zap } from 'lucide-react'
import { useWalletStore } from '../../stores/walletStore'
import { shortenAddress } from '../../lib/utils'
import { useState, useEffect } from 'react'

export function ConnectWallet() {
  const { connection, isConnecting, connect, disconnect, initializeKit, error } = useWalletStore()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  // Initialize the wallet kit on component mount
  useEffect(() => {
    initializeKit()
  }, [initializeKit])

  const handleConnect = async () => {
    try {
      await connect()
    } catch (error) {
      console.error('Connection failed:', error)
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('[data-wallet-dropdown]')) {
        setIsDropdownOpen(false)
      }
    }

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropdownOpen])

  if (connection.connected) {
    return (
      <div className="relative" data-wallet-dropdown>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center space-x-2 bg-gradient-card border border-primary/20 rounded-xl px-4 py-2 hover:border-primary/40 transition-all"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">
            {shortenAddress(connection.address || '')}
          </span>
          <span className="text-xs text-gray-400">
            {connection.balance?.toFixed(2)} XLM
          </span>
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </motion.button>

        {isDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute right-0 top-full mt-2 bg-black border border-white/20 rounded-xl p-4 w-64 z-[60] shadow-2xl"
          >
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-400">Wallet Address</p>
                <p className="text-sm font-mono break-all text-white">{connection.address}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Balance</p>
                <div className="flex items-center space-x-2">
                  <p className="text-sm text-white">{connection.balance?.toFixed(4)} XLM</p>
                  <div className="flex items-center text-xs text-accent">
                    <Zap className="h-3 w-3 mr-1" />
                    Stellar
                  </div>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-400">Network</p>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <p className="text-sm capitalize text-white">{connection.network}</p>
                </div>
              </div>
              <hr className="border-white/10" />
              <button
                onClick={() => {
                  disconnect()
                  setIsDropdownOpen(false)
                }}
                className="flex items-center space-x-2 w-full p-2 rounded-lg hover:bg-red-500/10 text-red-400 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Disconnect</span>
              </button>
            </div>
          </motion.div>
        )}
        
        {/* Connection overlay for outside clicks */}
        {isDropdownOpen && (
          <div 
            className="fixed inset-0 z-[55] bg-transparent" 
            onClick={() => setIsDropdownOpen(false)}
          />
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col items-end space-y-2">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={isConnecting}
        onClick={handleConnect}
        className="flex items-center space-x-2 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold rounded-xl px-6 py-2.5 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed border border-primary/20"
      >
        <Wallet className="h-4 w-4" />
        <span>{isConnecting ? 'Connecting...' : 'Connect Wallet'}</span>
        {isConnecting && (
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
        )}
      </motion.button>
      
      {/* Error message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-1 max-w-64"
        >
          {error}
        </motion.div>
      )}
    </div>
  )
} 