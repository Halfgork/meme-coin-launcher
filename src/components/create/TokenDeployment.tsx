'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  CheckCircle, 
  XCircle, 
  Loader, 
  Rocket, 
  ExternalLink, 
  Copy,
  ArrowLeft,
  AlertTriangle
} from 'lucide-react'

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

interface DeploymentStep {
  id: string
  title: string
  description: string
  status: 'pending' | 'loading' | 'success' | 'error'
  errorMessage?: string
  transactionHash?: string
}

interface TokenDeploymentProps {
  formData: TokenFormData
  onStartOver: () => void
}

export function TokenDeployment({ formData, onStartOver }: TokenDeploymentProps) {
  const [deploymentSteps, setDeploymentSteps] = useState<DeploymentStep[]>([
    {
      id: 'validation',
      title: 'Validating Token Data',
      description: 'Checking token parameters and wallet connection',
      status: 'pending'
    },
    {
      id: 'transaction',
      title: 'Building Transaction',
      description: 'Creating token initialization transaction',
      status: 'pending'
    },
    {
      id: 'signing',
      title: 'Signing Transaction',
      description: 'Waiting for wallet signature',
      status: 'pending'
    },
    {
      id: 'deployment',
      title: 'Deploying Token',
      description: 'Submitting to Stellar network',
      status: 'pending'
    },
    {
      id: 'minting',
      title: 'Minting Initial Supply',
      description: 'Creating initial token supply',
      status: 'pending'
    }
  ])

  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [deploymentComplete, setDeploymentComplete] = useState(false)
  const [deploymentError, setDeploymentError] = useState<string | null>(null)
  const [contractAddress, setContractAddress] = useState('')

  useEffect(() => {
    // Start deployment process
    startDeployment()
  }, [])

  const updateStepStatus = (stepId: string, status: DeploymentStep['status'], errorMessage?: string, transactionHash?: string) => {
    setDeploymentSteps(prev => prev.map(step => 
      step.id === stepId 
        ? { ...step, status, errorMessage, transactionHash }
        : step
    ))
  }

  const startDeployment = async () => {
    try {
      // Step 1: Validation
      setCurrentStepIndex(0)
      updateStepStatus('validation', 'loading')
      await sleep(1000)
      
      // Simulate validation
      if (!formData.name || !formData.symbol) {
        throw new Error('Missing required token data')
      }
      
      updateStepStatus('validation', 'success')
      setCurrentStepIndex(1)

      // Step 2: Transaction Building
      updateStepStatus('transaction', 'loading')
      await sleep(1500)
      
      // TODO: Replace with actual transaction building
      updateStepStatus('transaction', 'success')
      setCurrentStepIndex(2)

      // Step 3: Signing
      updateStepStatus('signing', 'loading')
      await sleep(2000)
      
      // TODO: Replace with actual wallet signing
      updateStepStatus('signing', 'success')
      setCurrentStepIndex(3)

      // Step 4: Deployment
      updateStepStatus('deployment', 'loading')
      await sleep(2500)
      
      // TODO: Replace with actual deployment
      const mockTxHash = 'abc123def456'
      updateStepStatus('deployment', 'success', undefined, mockTxHash)
      setCurrentStepIndex(4)

      // Step 5: Minting
      updateStepStatus('minting', 'loading')
      await sleep(2000)
      
      // TODO: Replace with actual minting
      updateStepStatus('minting', 'success')
      
      // Set mock contract address
      setContractAddress('CDC5RY5NHDYL4KCRP2OPAU6XL3GNR4L3P3R2PJTPV4PVUJBAFAUMVDN7')
      setDeploymentComplete(true)

    } catch (error: any) {
      setDeploymentError(error.message)
      updateStepStatus(deploymentSteps[currentStepIndex].id, 'error', error.message)
    }
  }

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const getStepIcon = (step: DeploymentStep) => {
    switch (step.status) {
      case 'success':
        return <CheckCircle className="h-6 w-6 text-success" />
      case 'error':
        return <XCircle className="h-6 w-6 text-red-400" />
      case 'loading':
        return <Loader className="h-6 w-6 text-primary animate-spin" />
      default:
        return <div className="h-6 w-6 rounded-full border-2 border-gray-600" />
    }
  }

  if (deploymentError) {
    return (
      <div className="text-center space-y-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8"
        >
          <XCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-red-400 mb-4">Deployment Failed</h2>
          <p className="text-gray-300 mb-6">{deploymentError}</p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.location.reload()}
              className="bg-red-500/20 border border-red-500/40 text-red-400 font-semibold py-3 px-6 rounded-xl transition-all flex items-center justify-center space-x-2"
            >
              <Rocket className="h-5 w-5" />
              <span>Try Again</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onStartOver}
              className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-xl transition-all flex items-center justify-center space-x-2 border border-white/20"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Start Over</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    )
  }

  if (deploymentComplete) {
    return (
      <div className="text-center space-y-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="space-y-6"
        >
          <CheckCircle className="h-24 w-24 text-success mx-auto" />
          <h2 className="text-4xl font-bold text-white">🎉 Token Deployed!</h2>
          <p className="text-xl text-gray-300">
            Your meme token <strong>{formData.name}</strong> is now live on Stellar Testnet!
          </p>
        </motion.div>

        {/* Token Info Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-black/50 border border-white/20 rounded-2xl p-8 max-w-2xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Token Details</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Name:</span>
              <span className="text-white font-semibold">{formData.name}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Symbol:</span>
              <span className="text-white font-semibold">${formData.symbol}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Initial Supply:</span>
              <span className="text-success font-semibold">{formData.initialSupply.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Contract Address:</span>
              <div className="flex items-center space-x-2">
                <code className="text-accent font-mono text-sm bg-black/30 px-2 py-1 rounded">
                  {contractAddress.substring(0, 20)}...
                </code>
                <button
                  onClick={() => copyToClipboard(contractAddress)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mt-8">
            <a
              href={`https://stellar.expert/explorer/testnet/contract/${contractAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-blue-500/20 border border-blue-500/40 text-blue-400 font-semibold py-3 px-6 rounded-xl transition-all flex items-center justify-center space-x-2 hover:bg-blue-500/30"
            >
              <ExternalLink className="h-5 w-5" />
              <span>View on Explorer</span>
            </a>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onStartOver}
              className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-bold py-3 px-6 rounded-xl transition-all flex items-center justify-center space-x-2"
            >
              <Rocket className="h-5 w-5" />
              <span>Create Another Token</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Deploying Your Token</h2>
        <p className="text-gray-300">Please wait while we deploy <strong>{formData.name}</strong> to Stellar Testnet</p>
      </div>

      {/* Progress Steps */}
      <div className="space-y-6">
        {deploymentSteps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-start space-x-4 p-4 rounded-xl border ${
              step.status === 'success' 
                ? 'bg-success/5 border-success/20' 
                : step.status === 'error'
                ? 'bg-red-500/5 border-red-500/20'
                : step.status === 'loading'
                ? 'bg-primary/5 border-primary/20'
                : 'bg-gray-900/30 border-gray-700'
            }`}
          >
            {getStepIcon(step)}
            <div className="flex-1">
              <h3 className={`font-semibold ${
                step.status === 'success' ? 'text-success' :
                step.status === 'error' ? 'text-red-400' :
                step.status === 'loading' ? 'text-primary' :
                'text-gray-400'
              }`}>
                {step.title}
              </h3>
              <p className="text-sm text-gray-400 mt-1">{step.description}</p>
              {step.errorMessage && (
                <p className="text-sm text-red-400 mt-2">{step.errorMessage}</p>
              )}
              {step.transactionHash && (
                <div className="flex items-center space-x-2 mt-2">
                  <span className="text-xs text-gray-400">TX:</span>
                  <code className="text-xs text-accent font-mono">{step.transactionHash}</code>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Warning */}
      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-gray-300">
              Do not close this page during deployment. The process may take a few minutes.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 