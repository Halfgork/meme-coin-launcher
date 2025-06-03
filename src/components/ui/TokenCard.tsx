'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { TrendingUp, TrendingDown, Sparkles, Copy, ExternalLink } from 'lucide-react'
import { MemeToken } from '../../stores/memeStore'
import { formatNumber, formatPrice, shortenAddress } from '../../lib/utils'

interface TokenCardProps {
  token: MemeToken
  index?: number
}

export function TokenCard({ token, index = 0 }: TokenCardProps) {
  const getTemplateGradient = (templateId: string): string => {
    const gradients: Record<string, string> = {
      'doge': 'from-yellow-400 to-orange-500',
      'pepe': 'from-green-400 to-emerald-600',
      'chad': 'from-blue-400 to-blue-600',
      'stonks': 'from-primary to-secondary',
      'custom': 'from-purple-400 to-pink-600'
    }
    return gradients[templateId] || 'from-primary to-secondary'
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const formatTimeAgo = (dateString: string): string => {
    const now = new Date()
    const created = new Date(dateString)
    const diffInHours = Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`
    return created.toLocaleDateString()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group"
    >
      <div className="bg-black/50 border border-white/20 rounded-2xl p-6 hover:border-primary/40 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-2">
            {token.isUserCreated && (
              <span className="bg-success/20 text-success px-2 py-1 rounded-full text-xs font-bold">
                ✨ NEW
              </span>
            )}
            <span className="text-xs text-gray-400">{formatTimeAgo(token.createdAt)}</span>
          </div>
          
          {token.priceChange24h !== 0 && (
            <div className={`flex items-center space-x-1 ${
              token.priceChange24h > 0 ? 'text-success' : 'text-red-400'
            }`}>
              {token.priceChange24h > 0 ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <TrendingDown className="h-4 w-4" />
              )}
              <span className="text-sm font-semibold">
                {Math.abs(token.priceChange24h).toFixed(1)}%
              </span>
            </div>
          )}
        </div>

        {/* Token Image/Icon */}
        <div className="relative mb-4 overflow-hidden rounded-xl">
          <div className={`aspect-square bg-gradient-to-br ${getTemplateGradient(token.templateId)} flex items-center justify-center`}>
            <div className="text-6xl">
              {token.image}
            </div>
          </div>
        </div>

        {/* Token Info */}
        <div className="space-y-3">
          <div>
            <h3 className="font-bold text-xl text-white group-hover:text-primary transition-colors">
              {token.name}
            </h3>
            <p className="text-sm text-accent font-mono">${token.symbol}</p>
          </div>

          <p className="text-gray-400 text-sm line-clamp-2">
            {token.description}
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10">
            <div>
              <p className="text-xs text-gray-400">Price</p>
              <p className="font-bold text-primary">${formatPrice(token.price)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Market Cap</p>
              <p className="font-bold text-white">${formatNumber(token.marketCap)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Volume 24h</p>
              <p className="font-bold text-white">${formatNumber(token.volume24h)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Holders</p>
              <p className="font-bold text-white">{formatNumber(token.holders)}</p>
            </div>
          </div>

          {/* Tags */}
          {token.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-2">
              {token.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="flex justify-between items-center pt-3 border-t border-white/10">
            <div className="text-xs text-gray-400">
              by {shortenAddress(token.creator)}
            </div>
            
            <div className="flex items-center space-x-2">
              {token.contractAddress && (
                <>
                  <button
                    onClick={() => copyToClipboard(token.contractAddress!)}
                    className="text-gray-400 hover:text-white transition-colors"
                    title="Copy contract address"
                  >
                    <Copy className="h-3 w-3" />
                  </button>
                  <a
                    href={`https://stellar.expert/explorer/testnet/contract/${token.contractAddress}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-accent transition-colors"
                    title="View on explorer"
                  >
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
} 