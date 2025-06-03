'use client'

import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { TrendingUp, Crown, Flame, Rocket, Star } from 'lucide-react'
import { useMemeStore } from '../../stores/memeStore'
import { CoinCard } from './CoinCard'
import { formatNumber } from '../../lib/utils'

export function TrendingBoard() {
  const { trendingCoins, fetchTrendingCoins, isLoading } = useMemeStore()

  useEffect(() => {
    fetchTrendingCoins()
  }, [fetchTrendingCoins])

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0: return <Crown className="h-5 w-5 text-yellow-400" />
      case 1: return <Flame className="h-5 w-5 text-orange-400" />
      case 2: return <Rocket className="h-5 w-5 text-red-400" />
      default: return <Star className="h-4 w-4 text-gray-400" />
    }
  }

  const getRankBg = (index: number) => {
    switch (index) {
      case 0: return 'bg-gradient-to-r from-yellow-500/20 to-yellow-400/20 border-yellow-400/30'
      case 1: return 'bg-gradient-to-r from-orange-500/20 to-orange-400/20 border-orange-400/30'
      case 2: return 'bg-gradient-to-r from-red-500/20 to-red-400/20 border-red-400/30'
      default: return 'bg-gradient-card border-white/10'
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <TrendingUp className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">🔥 Trending Coins</h2>
        </div>
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
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center space-x-3">
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <TrendingUp className="h-6 w-6 text-primary" />
          </motion.div>
          <h2 className="text-2xl font-bold">🔥 Trending Coins</h2>
        </div>
        
        <div className="hidden md:flex items-center space-x-2 text-sm text-gray-400">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          <span>Updated every 5 minutes</span>
        </div>
      </motion.div>

      {/* Trending Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
      >
        <div className="bg-gradient-card border border-white/10 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-primary">{trendingCoins.length}</div>
          <div className="text-sm text-gray-400">Trending Now</div>
        </div>
        <div className="bg-gradient-card border border-white/10 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-accent">
            {formatNumber(trendingCoins.reduce((sum, coin) => sum + coin.socialMetrics.views, 0))}
          </div>
          <div className="text-sm text-gray-400">Total Views</div>
        </div>
        <div className="bg-gradient-card border border-white/10 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-success">
            {formatNumber(trendingCoins.reduce((sum, coin) => sum + coin.holders, 0))}
          </div>
          <div className="text-sm text-gray-400">Total Holders</div>
        </div>
        <div className="bg-gradient-card border border-white/10 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-yellow-400">
            {trendingCoins.length > 0 ? Math.round(trendingCoins.reduce((sum, coin) => sum + coin.viralScore, 0) / trendingCoins.length) : 0}
          </div>
          <div className="text-sm text-gray-400">Avg Viral Score</div>
        </div>
      </motion.div>

      {/* Trending Coins Grid */}
      {trendingCoins.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingCoins.map((coin, index) => (
            <motion.div
              key={coin.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {/* Rank Badge */}
              <div className={`absolute -top-2 -left-2 z-10 ${getRankBg(index)} border rounded-full p-2`}>
                <div className="flex items-center space-x-1">
                  {getRankIcon(index)}
                  <span className="text-xs font-bold">#{index + 1}</span>
                </div>
              </div>
              
              <CoinCard coin={coin} index={index} />
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-6xl mb-4">📈</div>
          <h3 className="text-xl font-bold text-white mb-2">No Trending Coins Yet</h3>
          <p className="text-gray-400">Be the first to create a viral meme coin!</p>
        </motion.div>
      )}

      {/* View All Button */}
      {trendingCoins.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center pt-8"
        >
          <a
            href="/explore"
            className="inline-flex items-center space-x-2 bg-gradient-button hover:opacity-90 rounded-xl px-8 py-3 font-medium transition-all shadow-lg hover:shadow-xl"
          >
            <span>Explore All Coins</span>
            <Rocket className="h-4 w-4" />
          </a>
        </motion.div>
      )}
    </div>
  )
} 