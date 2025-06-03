'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Search, Filter, TrendingUp, Clock, Users, Zap } from 'lucide-react'
import { TrendingBoard } from '../../src/components/meme/TrendingBoard'
import { CoinCard } from '../../src/components/meme/CoinCard'
import { useMemeStore } from '../../src/stores/memeStore'

export default function ExplorePage() {
  const { coins, fetchCoins, searchCoins, isLoading } = useMemeStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredCoins, setFilteredCoins] = useState(coins)
  const [sortBy, setSortBy] = useState('viral') // viral, newest, holders

  useEffect(() => {
    fetchCoins()
  }, [fetchCoins])

  useEffect(() => {
    let result = searchQuery ? searchCoins(searchQuery) : coins
    
    // Sort results
    switch (sortBy) {
      case 'viral':
        result = [...result].sort((a, b) => b.viralScore - a.viralScore)
        break
      case 'newest':
        result = [...result].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case 'holders':
        result = [...result].sort((a, b) => b.holders - a.holders)
        break
    }
    
    setFilteredCoins(result)
  }, [searchQuery, coins, sortBy, searchCoins])

  const sortOptions = [
    { value: 'viral', label: 'Viral Score', icon: Zap },
    { value: 'newest', label: 'Newest', icon: Clock },
    { value: 'holders', label: 'Most Holders', icon: Users },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Explore Meme Coins
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover the hottest meme coins, track viral trends, and find your next moonshot! 🚀
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col md:flex-row gap-4 mb-6"
        >
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search coins by name, symbol, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gradient-card border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-primary/40 focus:outline-none transition-all"
            />
          </div>

          {/* Sort Options */}
          <div className="flex gap-2">
            {sortOptions.map((option) => (
              <motion.button
                key={option.value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSortBy(option.value)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-xl border transition-all ${
                  sortBy === option.value
                    ? 'bg-primary border-primary text-white'
                    : 'bg-gradient-card border-white/10 text-gray-300 hover:border-primary/40'
                }`}
              >
                <option.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{option.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Trending Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <TrendingBoard />
        </motion.div>

        {/* All Coins Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">
              All Coins ({filteredCoins.length})
            </h2>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Clear search
              </button>
            )}
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gradient-card border border-white/10 rounded-2xl p-6 h-96">
                    <div className="h-4 bg-white/10 rounded mb-4"></div>
                    <div className="aspect-square bg-white/10 rounded-xl mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-6 bg-white/10 rounded"></div>
                      <div className="h-4 bg-white/10 rounded w-2/3"></div>
                      <div className="h-16 bg-white/10 rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredCoins.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCoins.map((coin, index) => (
                <CoinCard key={coin.id} coin={coin} index={index} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-white mb-2">
                {searchQuery ? 'No coins found' : 'No coins available'}
              </h3>
              <p className="text-gray-400 mb-6">
                {searchQuery 
                  ? `Try adjusting your search terms or explore trending coins above.`
                  : 'Be the first to create a meme coin!'
                }
              </p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="bg-gradient-button hover:opacity-90 rounded-xl px-6 py-3 font-medium transition-all"
                >
                  Clear Search
                </button>
              )}
            </motion.div>
          )}
        </motion.div>

        {/* Load More (Future implementation) */}
        {filteredCoins.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12 pb-12"
          >
            <button className="bg-black border-2 border-white/20 hover:border-primary/40 rounded-xl px-8 py-3 font-medium transition-all">
              Load More Coins
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
} 