import { 
  TransactionBuilder,
  Keypair,
  Address,
  nativeToScVal
} from '@stellar/stellar-sdk'
import { SorobanClient } from './sorobanClient'
import { CURRENT_NETWORK } from './constants'
import { TokenContractParams, TokenInfo, DeploymentResult } from '../types'

export class TokenContract {
  private sorobanClient: SorobanClient

  constructor() {
    this.sorobanClient = new SorobanClient()
  }

  /**
   * Initialize a new token instance
   */
  async initializeToken(
    params: TokenContractParams,
    adminKeypair: Keypair
  ): Promise<DeploymentResult> {
    try {
      const adminAccount = await this.sorobanClient.getServer().getAccount(adminKeypair.publicKey())
      
      const contract = this.sorobanClient.getContract()
      
      const transaction = new TransactionBuilder(adminAccount, {
        fee: '100000',
        networkPassphrase: CURRENT_NETWORK.networkPassphrase,
      })
        .addOperation(
          contract.call(
            'initialize',
            nativeToScVal(params.admin, { type: 'address' }),
            nativeToScVal(params.decimals, { type: 'u32' }),
            nativeToScVal(params.name, { type: 'string' }),
            nativeToScVal(params.symbol, { type: 'string' })
          )
        )
        .setTimeout(30)

      const result = await this.sorobanClient.submitTransaction(transaction, adminKeypair)
      
      return {
        contractId: contract.address().toString(),
        transactionHash: result.hash,
        status: 'success'
      }
    } catch (error: any) {
      console.error('Error initializing token:', error)
      return {
        contractId: '',
        transactionHash: '',
        status: 'failed',
        error: error.message
      }
    }
  }

  /**
   * Mint tokens
   */
  async mintTokens(
    to: string,
    amount: bigint,
    adminKeypair: Keypair
  ): Promise<{ success: boolean; hash?: string; error?: string }> {
    try {
      const adminAccount = await this.sorobanClient.getServer().getAccount(adminKeypair.publicKey())
      
      const contract = this.sorobanClient.getContract()
      
      const transaction = new TransactionBuilder(adminAccount, {
        fee: '100000',
        networkPassphrase: CURRENT_NETWORK.networkPassphrase,
      })
        .addOperation(
          contract.call(
            'mint',
            nativeToScVal(Address.fromString(to), { type: 'address' }),
            nativeToScVal(amount, { type: 'i128' })
          )
        )
        .setTimeout(30)

      const result = await this.sorobanClient.submitTransaction(transaction, adminKeypair)
      
      return {
        success: true,
        hash: result.hash
      }
    } catch (error: any) {
      console.error('Error minting tokens:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  /**
   * Get token balance
   */
  async getBalance(address: string): Promise<bigint> {
    try {
      const result = await this.sorobanClient.callContract('balance', [
        Address.fromString(address)
      ])
      return BigInt(result)
    } catch (error) {
      console.error('Error getting balance:', error)
      return BigInt(0)
    }
  }

  /**
   * Get token info
   */
  async getTokenInfo(): Promise<Partial<TokenInfo>> {
    try {
      const [name, symbol, decimals] = await Promise.all([
        this.sorobanClient.callContract('name').catch(() => ''),
        this.sorobanClient.callContract('symbol').catch(() => ''),
        this.sorobanClient.callContract('decimals').catch(() => 7)
      ])

      return {
        name: name || 'Unknown Token',
        symbol: symbol || 'UNKNOWN',
        decimals: decimals || 7
      }
    } catch (error) {
      console.error('Error getting token info:', error)
      return {
        name: 'Unknown Token',
        symbol: 'UNKNOWN',
        decimals: 7
      }
    }
  }

  /**
   * Transfer tokens
   */
  async transferTokens(
    from: string,
    to: string,
    amount: bigint,
    fromKeypair: Keypair
  ): Promise<{ success: boolean; hash?: string; error?: string }> {
    try {
      const fromAccount = await this.sorobanClient.getServer().getAccount(fromKeypair.publicKey())
      
      const contract = this.sorobanClient.getContract()
      
      const transaction = new TransactionBuilder(fromAccount, {
        fee: '100000',
        networkPassphrase: CURRENT_NETWORK.networkPassphrase,
      })
        .addOperation(
          contract.call(
            'transfer',
            nativeToScVal(Address.fromString(from), { type: 'address' }),
            nativeToScVal(Address.fromString(to), { type: 'address' }),
            nativeToScVal(amount, { type: 'i128' })
          )
        )
        .setTimeout(30)

      const result = await this.sorobanClient.submitTransaction(transaction, fromKeypair)
      
      return {
        success: true,
        hash: result.hash
      }
    } catch (error: any) {
      console.error('Error transferring tokens:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }
} 