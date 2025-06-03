'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Rocket, Edit, Eye, DollarSign, Hash, FileText, Tag, Sparkles } from 'lucide-react'

interface TokenFormData {
  name: string
  symbol: string
  description: string
  initialSupply: number
  decimals: number
  image: string
  tags: string[]
  templateId: string
}

interface TokenPreviewProps {
  formData: TokenFormData
  onEdit: () => void
  onDeploy: () => void
  isLoading?: boolean
}

export function TokenPreview({ formData, onEdit, onDeploy, isLoading = false }: TokenPreviewProps) {
  const formatSupply = (supply: number): string => {
    if (supply >= 1e9) return `${(supply / 1e9).toFixed(1)}B`
    if (supply >= 1e6) return `${(supply / 1e6).toFixed(1)}M`
    if (supply >= 1e3) return `${(supply / 1e3).toFixed(1)}K`
    return supply.toString()
  }

  const getTemplateEmoji = (templateId: string): string => {
    const templates: Record<string, string> = {
      'doge': '🐕',
      'pepe': '🐸',
      'chad': '💪',
      'stonks': '📈',
      'custom': '🎨'
    }
    return templates[templateId] || '🚀'
  }

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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mb-6"
        >
          <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br ${getTemplateGradient(formData.templateId)} text-4xl mb-4`}>
            {getTemplateEmoji(formData.templateId)}
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">{formData.name}</h1>
          <p className="text-xl text-gray-300">${formData.symbol}</p>
        </motion.div>
      </div>

      {/* Main Card */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-black/50 border border-white/20 rounded-2xl p-8"
      >
        {/* Description */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
            <FileText className="h-5 w-5 text-primary mr-2" />
            Description
          </h3>
          <p className="text-gray-300 leading-relaxed">{formData.description}</p>
        </div>

        {/* Token Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Initial Supply */}
          <div className="bg-gray-900/50 rounded-xl p-6">
            <div className="flex items-center mb-3">
              <DollarSign className="h-6 w-6 text-success mr-2" />
              <h4 className="text-lg font-semibold text-white">Initial Supply</h4>
            </div>
            <div className="text-3xl font-bold text-success">
              {formatSupply(formData.initialSupply)}
            </div>
            <div className="text-sm text-gray-400 mt-1">
              {formData.initialSupply.toLocaleString()} tokens
            </div>
          </div>

          {/* Decimals */}
          <div className="bg-gray-900/50 rounded-xl p-6">
            <div className="flex items-center mb-3">
              <Hash className="h-6 w-6 text-accent mr-2" />
              <h4 className="text-lg font-semibold text-white">Decimals</h4>
            </div>
            <div className="text-3xl font-bold text-accent">
              {formData.decimals}
            </div>
            <div className="text-sm text-gray-400 mt-1">
              Precision level
            </div>
          </div>
        </div>

        {/* Tags */}
        {formData.tags.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Tag className="h-5 w-5 text-primary mr-2" />
              Tags
            </h3>
            <div className="flex flex-wrap gap-3">
              {formData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Technical Info */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-blue-400 mb-4">Technical Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Blockchain:</span>
              <span className="ml-2 text-white">Stellar Network</span>
            </div>
            <div>
              <span className="text-gray-400">Standard:</span>
              <span className="ml-2 text-white">Soroban Token</span>
            </div>
            <div>
              <span className="text-gray-400">Template:</span>
              <span className="ml-2 text-white">
                {getTemplateEmoji(formData.templateId)} {formData.templateId || 'Custom'}
              </span>
            </div>
            <div>
              <span className="text-gray-400">Network:</span>
              <span className="ml-2 text-success">Testnet</span>
            </div>
          </div>
        </div>

        {/* Warning */}
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 mb-8">
          <div className="flex items-start space-x-3">
            <Sparkles className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-yellow-400 font-semibold mb-1">Deploy to Testnet</h4>
              <p className="text-sm text-gray-300">
                This token will be deployed to Stellar Testnet. Make sure your wallet is connected and has testnet XLM for fees.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onEdit}
            className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-semibold py-4 px-6 rounded-xl transition-all flex items-center justify-center space-x-2 border border-white/20"
          >
            <Edit className="h-5 w-5" />
            <span>Edit Details</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onDeploy}
            disabled={isLoading}
            className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 disabled:opacity-50 text-white font-bold py-4 px-8 rounded-xl transition-all flex items-center justify-center space-x-2"
          >
            <Rocket className="h-5 w-5" />
            <span>{isLoading ? 'Deploying...' : 'Deploy Token'}</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Preview Card - How it will look on the platform */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-black/30 border border-white/10 rounded-2xl p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Eye className="h-5 w-5 text-primary mr-2" />
          How it will appear on the platform
        </h3>
        
        {/* Mock coin card */}
        <div className="bg-black/50 border border-white/20 rounded-xl p-4 max-w-sm">
          <div className="flex items-center space-x-3 mb-3">
            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${getTemplateGradient(formData.templateId)} flex items-center justify-center text-xl`}>
              {getTemplateEmoji(formData.templateId)}
            </div>
            <div>
              <h4 className="font-bold text-white">{formData.name}</h4>
              <p className="text-sm text-gray-400">${formData.symbol}</p>
            </div>
          </div>
          <p className="text-sm text-gray-300 mb-3 line-clamp-2">
            {formData.description.length > 60 
              ? formData.description.substring(0, 60) + '...' 
              : formData.description
            }
          </p>
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-400">Supply: {formatSupply(formData.initialSupply)}</span>
            <span className="text-success">New!</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 