'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Search, Filter, TrendingUp, Clock, Flame } from 'lucide-react'
import { TokenCard } from '../../src/components/ui/TokenCard'
import { useMemeStore } from '../../src/stores/memeStore'

export default function ExplorePage() {
  const { 
    tokens, 
    trendingTokens, 
    newestTokens, 
    searchQuery, 
    selectedCategory,
    setSearchQuery,
    setSelectedCategory,
    getFilteredTokens,
    clearDuplicates
  } = useMemeStore()
  
  const [activeTab, setActiveTab] = useState('newest')
  const [localSearchQuery, setLocalSearchQuery] = useState('')

  useEffect(() => {
    setSearchQuery(localSearchQuery)
  }, [localSearchQuery, setSearchQuery])

  const getDisplayTokens = () => {
    switch (activeTab) {
      case 'trending':
        return trendingTokens
      case 'newest':
        return newestTokens.slice().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      case 'all':
        return getFilteredTokens()
      default:
        return newestTokens
    }
  }

  const displayTokens = getDisplayTokens()

  const categories = [
    { id: 'all', name: 'All', icon: '🚀' },
    { id: 'doge', name: 'Doge', icon: '🐕' },
    { id: 'pepe', name: 'Pepe', icon: '🐸' },
    { id: 'chad', name: 'Chad', icon: '💪' },
    { id: 'stonks', name: 'Stonks', icon: '📈' },
    { id: 'custom', name: 'Custom', icon: '🎨' }
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Explore Meme Tokens
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover the hottest meme tokens on Stellar blockchain! 🔥
          </p>
          
          {/* Debug: Clear Duplicates Button */}
          <button
            onClick={clearDuplicates}
            className="mt-4 bg-red-500/20 border border-red-500/40 text-red-400 text-xs px-3 py-1 rounded-lg hover:bg-red-500/30 transition-all"
          >
            🧹 Clear Duplicates (Debug)
          </button>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-4xl mx-auto mb-8"
        >
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              value={localSearchQuery}
              onChange={(e) => setLocalSearchQuery(e.target.value)}
              placeholder="Search tokens by name, symbol, or tags..."
              className="w-full pl-12 pr-4 py-4 bg-black/50 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl border transition-all ${
                  selectedCategory === category.id
                    ? 'bg-primary border-primary text-white'
                    : 'bg-black/30 border-white/20 text-gray-400 hover:border-white/40'
                }`}
              >
                <span>{category.icon}</span>
                <span className="font-medium">{category.name}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div className="flex bg-black/50 border border-white/20 rounded-2xl p-1">
            {[
              { id: 'newest', name: 'Newest', icon: Clock },
              { id: 'trending', name: 'Trending', icon: TrendingUp },
              { id: 'all', name: 'All Tokens', icon: Flame }
            ].map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.name}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Token Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-7xl mx-auto"
        >
          {displayTokens.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayTokens.map((token, index) => (
                <motion.div
                  key={token.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <TokenCard
                    token={token}
                    index={index}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                  <Search className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">No tokens found</h3>
                <p className="text-gray-400 mb-8">
                  {localSearchQuery 
                    ? `No tokens match "${localSearchQuery}". Try a different search term.`
                    : 'No tokens available in this category yet.'
                  }
                </p>
                <button 
                  onClick={() => {
                    setLocalSearchQuery('')
                    setSelectedCategory('all')
                  }}
                  className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-bold py-3 px-8 rounded-xl transition-all"
                >
                  Clear Filters
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-black/50 border border-white/20 rounded-2xl p-6 text-center">
              <h3 className="text-3xl font-bold text-primary mb-2">{tokens.length}</h3>
              <p className="text-gray-400">Total Tokens</p>
            </div>
            <div className="bg-black/50 border border-white/20 rounded-2xl p-6 text-center">
              <h3 className="text-3xl font-bold text-success mb-2">{tokens.filter(t => t.isUserCreated).length}</h3>
              <p className="text-gray-400">User Created</p>
            </div>
            <div className="bg-black/50 border border-white/20 rounded-2xl p-6 text-center">
              <h3 className="text-3xl font-bold text-accent mb-2">{newestTokens.length}</h3>
              <p className="text-gray-400">New This Week</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 