'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Heart, Share2, MessageCircle, TrendingUp, Users, Zap } from 'lucide-react'
import { MemeCoin } from '../../types/meme'
import { formatNumber, formatPrice, shortenAddress } from '../../lib/utils'
import { VIRAL_THRESHOLDS } from '../../lib/constants'

interface CoinCardProps {
  coin: MemeCoin
  index?: number
}

export function CoinCard({ coin, index = 0 }: CoinCardProps) {
  const getViralBadge = () => {
    if (coin.viralScore >= VIRAL_THRESHOLDS.legendary) {
      return { label: 'LEGENDARY', color: 'text-yellow-400 bg-yellow-400/20', emoji: '👑' }
    }
    if (coin.viralScore >= VIRAL_THRESHOLDS.viral) {
      return { label: 'VIRAL', color: 'text-purple-400 bg-purple-400/20', emoji: '🔥' }
    }
    if (coin.viralScore >= VIRAL_THRESHOLDS.hot) {
      return { label: 'HOT', color: 'text-red-400 bg-red-400/20', emoji: '🚀' }
    }
    if (coin.viralScore >= VIRAL_THRESHOLDS.trending) {
      return { label: 'TRENDING', color: 'text-accent bg-accent/20', emoji: '📈' }
    }
    return { label: 'NEW', color: 'text-gray-400 bg-gray-400/20', emoji: '✨' }
  }

  const viralBadge = getViralBadge()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group"
    >
      <Link href={`/coin/${coin.id}`}>
        <div className="bg-gradient-card border border-white/10 rounded-2xl p-6 hover:border-primary/40 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10">
          {/* Header with Badge */}
          <div className="flex justify-between items-start mb-4">
            <div className={`px-3 py-1 rounded-full text-xs font-bold ${viralBadge.color}`}>
              {viralBadge.emoji} {viralBadge.label}
            </div>
            {coin.socialMetrics.trending && (
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-primary"
              >
                <TrendingUp className="h-5 w-5" />
              </motion.div>
            )}
          </div>

          {/* Coin Image */}
          <div className="relative mb-4 overflow-hidden rounded-xl">
            <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              {coin.image ? (
                <img 
                  src={coin.image} 
                  alt={coin.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    const img = e.currentTarget as HTMLImageElement
                    const fallback = img.nextElementSibling as HTMLElement
                    img.style.display = 'none'
                    if (fallback) fallback.style.display = 'flex'
                  }}
                />
              ) : null}
              <div className={`text-8xl ${coin.image ? 'hidden' : 'flex'} items-center justify-center w-full h-full`}>
                {coin.name.toLowerCase().includes('doge') ? '🐕' :
                 coin.name.toLowerCase().includes('pepe') ? '🐸' :
                 coin.symbol.toLowerCase().includes('doge') ? '🐕' :
                 coin.symbol.toLowerCase().includes('pepe') ? '🐸' :
                 '🎭'}
              </div>
            </div>
            <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1">
              <span className="text-xs font-bold text-accent">#{coin.id}</span>
            </div>
          </div>

          {/* Coin Info */}
          <div className="space-y-3">
            <div>
              <h3 className="font-bold text-xl text-white group-hover:text-primary transition-colors">
                {coin.name}
              </h3>
              <p className="text-sm text-accent font-mono">${coin.symbol}</p>
            </div>

            <p className="text-gray-400 text-sm line-clamp-2">
              {coin.description}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10">
              <div>
                <p className="text-xs text-gray-400">Price</p>
                <p className="font-bold text-primary">${formatPrice(coin.currentPrice)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Market Cap</p>
                <p className="font-bold text-white">${formatNumber(coin.marketCap)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Holders</p>
                <p className="font-bold text-white">{formatNumber(coin.holders)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Viral Score</p>
                <div className="flex items-center space-x-1">
                  <Zap className="h-3 w-3 text-yellow-400" />
                  <p className="font-bold text-yellow-400">{formatNumber(coin.viralScore)}</p>
                </div>
              </div>
            </div>

            {/* Social Metrics */}
            <div className="flex justify-between items-center pt-3 border-t border-white/10">
              <div className="flex items-center space-x-4 text-gray-400">
                <div className="flex items-center space-x-1">
                  <Heart className="h-4 w-4" />
                  <span className="text-xs">{formatNumber(coin.socialMetrics.likes)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Share2 className="h-4 w-4" />
                  <span className="text-xs">{formatNumber(coin.socialMetrics.shares)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MessageCircle className="h-4 w-4" />
                  <span className="text-xs">{formatNumber(coin.socialMetrics.comments)}</span>
                </div>
              </div>
              
              <div className="text-xs text-gray-400">
                by {shortenAddress(coin.creator)}
              </div>
            </div>

            {/* Tags */}
            {coin.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 pt-2">
                {coin.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-white/5 rounded-full text-xs text-gray-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
} 