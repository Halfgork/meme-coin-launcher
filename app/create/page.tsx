'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { ArrowLeft, Rocket, Sparkles, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { useWalletStore } from '../../src/stores/walletStore'

export default function CreatePage() {
  const { connection } = useWalletStore()
  const [step, setStep] = useState(1) // 1: Form, 2: Preview, 3: Deploy

  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    description: '',
    initialSupply: 1000000,
    decimals: 7,
    image: '',
    tags: [] as string[],
    templateId: ''
  })

  if (!connection.connected) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>

          {/* Wallet Connection Required */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                <AlertCircle className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold mb-4">Wallet Required</h1>
              <p className="text-gray-400 mb-8">
                Connect your Stellar wallet to create and deploy meme tokens on the blockchain.
              </p>
              <button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-bold py-3 px-8 rounded-xl transition-all">
                Connect Wallet
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              Connected: {connection.address?.slice(0, 8)}...
            </div>
          </div>
        </div>

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Create Your Meme Token
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Launch your viral meme token on Stellar blockchain in minutes! 🚀
          </p>
        </motion.div>

        {/* Step Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center mb-12"
        >
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                  step >= stepNum 
                    ? 'bg-gradient-to-r from-primary to-secondary text-white' 
                    : 'bg-gray-800 text-gray-400'
                }`}>
                  {stepNum}
                </div>
                <span className={`ml-2 transition-colors ${
                  step >= stepNum ? 'text-white' : 'text-gray-400'
                }`}>
                  {stepNum === 1 ? 'Details' : stepNum === 2 ? 'Preview' : 'Deploy'}
                </span>
                {stepNum < 3 && (
                  <div className={`w-12 h-0.5 mx-4 transition-colors ${
                    step > stepNum ? 'bg-primary' : 'bg-gray-800'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Content Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          {step === 1 && (
            <div className="bg-black/50 border border-white/20 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Sparkles className="h-6 w-6 text-primary mr-2" />
                Token Details
              </h2>
              
              {/* Form will go here */}
              <div className="text-center py-12 text-gray-400">
                <Rocket className="h-16 w-16 mx-auto mb-4 text-primary" />
                <p>Token creation form coming soon...</p>
                <p className="text-sm mt-2">Contract integration in progress 🚧</p>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="bg-black/50 border border-white/20 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">Preview Your Token</h2>
              <div className="text-center py-12 text-gray-400">
                Preview component coming soon...
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="bg-black/50 border border-white/20 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">Deploy to Stellar</h2>
              <div className="text-center py-12 text-gray-400">
                Deployment interface coming soon...
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
} 