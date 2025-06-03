'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { ArrowLeft, Rocket, Sparkles, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { useWalletStore } from '../../src/stores/walletStore'
import { TokenTestForm } from '../../src/components/create/TokenTestForm'
import { TokenCreationForm } from '../../src/components/create/TokenCreationForm'
import { TokenPreview } from '../../src/components/create/TokenPreview'
import { TokenDeployment } from '../../src/components/create/TokenDeployment'

export default function CreatePage() {
  const { connection } = useWalletStore()
  const [step, setStep] = useState(1) // 1: Form, 2: Preview, 3: Deploy
  const [isDeploying, setIsDeploying] = useState(false)

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

  const handleFormSubmit = (data: any) => {
    setFormData(data)
    setStep(2) // Move to preview
  }

  const handleEdit = () => {
    setStep(1) // Back to form
  }

  const handleDeploy = async () => {
    setIsDeploying(true)
    setStep(3) // Move to deploy
  }

  const handleStartOver = () => {
    setStep(1)
    setIsDeploying(false)
    setFormData({
      name: '',
      symbol: '',
      description: '',
      initialSupply: 1000000,
      decimals: 7,
      image: '',
      tags: [] as string[],
      templateId: ''
    })
  }

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

        {/* Connected - Show creation interface */}
        <div className="max-w-4xl mx-auto">
          {/* Step Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-8">
              {[1, 2, 3].map((stepNum) => (
                <div key={stepNum} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 font-semibold ${
                    step === stepNum 
                      ? 'bg-primary border-primary text-white' 
                      : step > stepNum 
                      ? 'bg-success border-success text-white'
                      : 'border-gray-600 text-gray-400'
                  }`}>
                    {step > stepNum ? '✓' : stepNum}
                  </div>
                  <span className={`ml-3 font-medium ${
                    step === stepNum ? 'text-primary' : step > stepNum ? 'text-success' : 'text-gray-400'
                  }`}>
                    {stepNum === 1 ? 'Create' : stepNum === 2 ? 'Preview' : 'Deploy'}
                  </span>
                  {stepNum < 3 && (
                    <div className={`w-16 h-0.5 ml-8 ${
                      step > stepNum ? 'bg-success' : 'bg-gray-600'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {step === 1 && (
            <div className="bg-black/50 border border-white/20 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Sparkles className="h-6 w-6 text-primary mr-2" />
                Token Details
              </h2>
              
              <TokenCreationForm onSubmit={handleFormSubmit} />
            </div>
          )}

          {step === 2 && (
            <div className="bg-black/50 border border-white/20 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">Preview Your Token</h2>
              <TokenPreview 
                formData={formData} 
                onEdit={handleEdit}
                onDeploy={handleDeploy}
                isLoading={isDeploying}
              />
            </div>
          )}

          {step === 3 && (
            <div className="bg-black/50 border border-white/20 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">Deploy to Stellar</h2>
              <TokenDeployment 
                formData={formData}
                onStartOver={handleStartOver}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 