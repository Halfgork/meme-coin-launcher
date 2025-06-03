'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Upload, Hash, DollarSign, FileText, Tag } from 'lucide-react'

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

interface TokenCreationFormProps {
  onSubmit: (data: TokenFormData) => void
  isLoading?: boolean
}

export function TokenCreationForm({ onSubmit, isLoading = false }: TokenCreationFormProps) {
  const [formData, setFormData] = useState<TokenFormData>({
    name: '',
    symbol: '',
    description: '',
    initialSupply: 1000000,
    decimals: 7,
    image: '',
    tags: [],
    templateId: ''
  })

  const [tagInput, setTagInput] = useState('')
  const [errors, setErrors] = useState<Partial<TokenFormData>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<TokenFormData> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Token name is required'
    } else if (formData.name.length < 3) {
      newErrors.name = 'Token name must be at least 3 characters'
    }

    if (!formData.symbol.trim()) {
      newErrors.symbol = 'Symbol is required'
    } else if (formData.symbol.length < 2 || formData.symbol.length > 12) {
      newErrors.symbol = 'Symbol must be 2-12 characters'
    } else if (!/^[A-Z0-9]+$/.test(formData.symbol)) {
      newErrors.symbol = 'Symbol must contain only uppercase letters and numbers'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters'
    }

    if (formData.initialSupply <= 0) {
      newErrors.initialSupply = 'Initial supply must be greater than 0' as any
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const handleInputChange = (field: keyof TokenFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim()) && formData.tags.length < 5) {
      handleInputChange('tags', [...formData.tags, tagInput.trim().toLowerCase()])
      setTagInput('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    handleInputChange('tags', formData.tags.filter(tag => tag !== tagToRemove))
  }

  const templates = [
    { id: 'doge', name: '🐕 Doge Template', description: 'Much wow, very meme!' },
    { id: 'pepe', name: '🐸 Pepe Template', description: 'Feels good man' },
    { id: 'chad', name: '💪 Chad Template', description: 'Gigachad energy' },
    { id: 'stonks', name: '📈 Stonks Template', description: 'Number go up!' },
    { id: 'custom', name: '🎨 Custom', description: 'Create your own design' }
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Template Selection */}
      <div>
        <label className="block text-lg font-semibold text-white mb-4">
          Choose Template
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map((template) => (
            <motion.button
              key={template.id}
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleInputChange('templateId', template.id)}
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                formData.templateId === template.id
                  ? 'border-primary bg-primary/10'
                  : 'border-white/20 hover:border-white/40'
              }`}
            >
              <h3 className="font-semibold text-white mb-2">{template.name}</h3>
              <p className="text-sm text-gray-400">{template.description}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Token Name */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            <Sparkles className="h-4 w-4 inline mr-1" />
            Token Name *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="e.g., DogeMax"
            className={`w-full px-4 py-3 bg-black/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
              errors.name ? 'border-red-500 focus:ring-red-500' : 'border-white/20 focus:ring-primary'
            }`}
          />
          {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
        </div>

        {/* Token Symbol */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            <Hash className="h-4 w-4 inline mr-1" />
            Symbol *
          </label>
          <input
            type="text"
            value={formData.symbol}
            onChange={(e) => handleInputChange('symbol', e.target.value.toUpperCase())}
            placeholder="e.g., DMAX"
            maxLength={12}
            className={`w-full px-4 py-3 bg-black/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
              errors.symbol ? 'border-red-500 focus:ring-red-500' : 'border-white/20 focus:ring-primary'
            }`}
          />
          {errors.symbol && <p className="mt-1 text-sm text-red-400">{errors.symbol}</p>}
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">
          <FileText className="h-4 w-4 inline mr-1" />
          Description *
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Tell everyone about your amazing meme token... 🚀"
          rows={4}
          className={`w-full px-4 py-3 bg-black/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all resize-none ${
            errors.description ? 'border-red-500 focus:ring-red-500' : 'border-white/20 focus:ring-primary'
          }`}
        />
        {errors.description && <p className="mt-1 text-sm text-red-400">{errors.description}</p>}
        <p className="mt-1 text-xs text-gray-400">{formData.description.length}/500 characters</p>
      </div>

      {/* Supply and Decimals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Initial Supply */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            <DollarSign className="h-4 w-4 inline mr-1" />
            Initial Supply *
          </label>
          <input
            type="number"
            value={formData.initialSupply}
            onChange={(e) => handleInputChange('initialSupply', parseInt(e.target.value) || 0)}
            min={1}
            max={1000000000}
            className={`w-full px-4 py-3 bg-black/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
              errors.initialSupply ? 'border-red-500 focus:ring-red-500' : 'border-white/20 focus:ring-primary'
            }`}
          />
          {errors.initialSupply && <p className="mt-1 text-sm text-red-400">{errors.initialSupply}</p>}
          <p className="mt-1 text-xs text-gray-400">Total tokens to create initially</p>
        </div>

        {/* Decimals */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Decimals
          </label>
          <select
            value={formData.decimals}
            onChange={(e) => handleInputChange('decimals', parseInt(e.target.value))}
            className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          >
            {[0, 2, 4, 6, 7, 8, 18].map(dec => (
              <option key={dec} value={dec} className="bg-black">{dec} decimals</option>
            ))}
          </select>
          <p className="mt-1 text-xs text-gray-400">Stellar tokens typically use 7 decimals</p>
        </div>
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">
          <Tag className="h-4 w-4 inline mr-1" />
          Tags (Optional)
        </label>
        <div className="flex flex-wrap gap-2 mb-3">
          {formData.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center bg-primary/20 text-primary px-3 py-1 rounded-full text-sm"
            >
              #{tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="ml-2 text-primary/70 hover:text-primary"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
            placeholder="Add a tag..."
            className="flex-1 px-4 py-2 bg-black/50 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          />
          <button
            type="button"
            onClick={addTag}
            disabled={!tagInput.trim() || formData.tags.length >= 5}
            className="px-4 py-2 bg-primary/20 border border-primary/40 rounded-xl text-primary hover:bg-primary/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Add
          </button>
        </div>
        <p className="mt-1 text-xs text-gray-400">Maximum 5 tags ({5 - formData.tags.length} remaining)</p>
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 disabled:opacity-50 text-white font-bold py-4 px-8 rounded-xl transition-all flex items-center justify-center space-x-2"
      >
        <Sparkles className="h-5 w-5" />
        <span>{isLoading ? 'Creating Token...' : 'Preview Token'}</span>
      </motion.button>
    </form>
  )
} 