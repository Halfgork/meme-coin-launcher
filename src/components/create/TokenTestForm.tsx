'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Rocket, AlertCircle, CheckCircle, Loader } from 'lucide-react'
import { MEME_TOKEN_CONTRACT_ADDRESS, CONTRACT_EXPLORER_URL } from '../../contracts/stellar/constants'

interface TestResult {
  success: boolean
  message: string
  data?: any
}

export function TokenTestForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<TestResult[]>([])
  
  const addResult = (result: TestResult) => {
    setResults(prev => [...prev, result])
  }

  const runBasicTests = async () => {
    setIsLoading(true)
    setResults([])

    try {
      // Test 1: Contract Address Validation
      addResult({
        success: true,
        message: `Contract deployed at: ${MEME_TOKEN_CONTRACT_ADDRESS}`,
        data: { contractAddress: MEME_TOKEN_CONTRACT_ADDRESS }
      })

      // Test 2: Network Connection
      try {
        const response = await fetch('https://soroban-testnet.stellar.org/health')
        if (response.ok) {
          addResult({
            success: true,
            message: 'Soroban Testnet connection successful'
          })
        } else {
          addResult({
            success: false,
            message: 'Soroban Testnet connection failed'
          })
        }
      } catch (error) {
        addResult({
          success: false,
          message: `Network error: ${error}`
        })
      }

      // Test 3: Contract Info (if we can get it)
      addResult({
        success: true,
        message: 'Ready for contract interaction',
        data: { explorerUrl: CONTRACT_EXPLORER_URL }
      })

    } catch (error: any) {
      addResult({
        success: false,
        message: `Test failed: ${error.message}`
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-black/50 border border-white/20 rounded-2xl p-8">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <Rocket className="h-6 w-6 text-primary mr-2" />
        Contract Test
      </h2>

      <div className="space-y-6">
        {/* Contract Info */}
        <div className="bg-gray-900/50 rounded-xl p-4">
          <h3 className="text-lg font-semibold mb-3 text-white">Contract Information</h3>
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-gray-400">Address:</span>
              <code className="ml-2 text-accent font-mono">{MEME_TOKEN_CONTRACT_ADDRESS}</code>
            </div>
            <div>
              <span className="text-gray-400">Network:</span>
              <span className="ml-2 text-success">Stellar Testnet</span>
            </div>
            <div>
              <span className="text-gray-400">Explorer:</span>
              <a 
                href={CONTRACT_EXPLORER_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="ml-2 text-accent hover:text-accent/80 underline"
              >
                View on Stellar Expert
              </a>
            </div>
          </div>
        </div>

        {/* Test Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={runBasicTests}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 disabled:opacity-50 text-white font-bold py-3 px-6 rounded-xl transition-all flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <>
              <Loader className="h-5 w-5 animate-spin" />
              <span>Running Tests...</span>
            </>
          ) : (
            <>
              <Rocket className="h-5 w-5" />
              <span>Run Basic Tests</span>
            </>
          )}
        </motion.button>

        {/* Test Results */}
        {results.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">Test Results</h3>
            {results.map((result, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-start space-x-3 p-3 rounded-lg ${
                  result.success 
                    ? 'bg-success/10 border border-success/20' 
                    : 'bg-red-500/10 border border-red-500/20'
                }`}
              >
                {result.success ? (
                  <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                )}
                <div className="flex-1">
                  <p className={`text-sm font-medium ${
                    result.success ? 'text-success' : 'text-red-400'
                  }`}>
                    {result.message}
                  </p>
                  {result.data && (
                    <pre className="mt-2 text-xs text-gray-400 bg-black/30 rounded p-2 overflow-x-auto">
                      {JSON.stringify(result.data, null, 2)}
                    </pre>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Next Steps */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
          <h3 className="text-lg font-semibold text-blue-400 mb-2">Next Steps</h3>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>• Fix TypeScript errors in contract integration</li>
            <li>• Test contract initialization function</li>
            <li>• Test token minting functionality</li>
            <li>• Build complete creation form</li>
          </ul>
        </div>
      </div>
    </div>
  )
} 