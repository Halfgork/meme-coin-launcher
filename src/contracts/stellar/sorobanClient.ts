import { 
  SorobanRpc, 
  TransactionBuilder, 
  Networks, 
  Keypair,
  Contract,
  Address,
  nativeToScVal,
  scValToNative,
  xdr,
  Transaction
} from '@stellar/stellar-sdk'
import { CURRENT_NETWORK, MEME_TOKEN_CONTRACT_ADDRESS } from './constants'

export class SorobanClient {
  private server: SorobanRpc.Server
  private contract: Contract

  constructor() {
    this.server = new SorobanRpc.Server(CURRENT_NETWORK.sorobanUrl)
    this.contract = new Contract(MEME_TOKEN_CONTRACT_ADDRESS)
  }

  /**
   * Get contract info
   */
  async getContractInfo() {
    try {
      const response = await this.server.getContractData(
        MEME_TOKEN_CONTRACT_ADDRESS,
        xdr.ScVal.scvLedgerKeyContractInstance()
      )
      return response
    } catch (error) {
      console.error('Error getting contract info:', error)
      throw error
    }
  }

  /**
   * Call contract method (read-only)
   */
  async callContract(method: string, args: any[] = [], source?: string) {
    try {
      const sourceAccount = source || "GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF"
      
      const account = await this.server.getAccount(sourceAccount)
      
      const transaction = new TransactionBuilder(account, {
        fee: '100',
        networkPassphrase: CURRENT_NETWORK.networkPassphrase,
      })
        .addOperation(
          this.contract.call(method, ...args.map(arg => nativeToScVal(arg)))
        )
        .setTimeout(30)
        .build()

      const response = await this.server.simulateTransaction(transaction)
      
      if (SorobanRpc.Api.isSimulationSuccess(response)) {
        return scValToNative(response.result!.retval)
      } else {
        throw new Error(`Contract call failed: ${response.error}`)
      }
    } catch (error) {
      console.error(`Error calling contract method ${method}:`, error)
      throw error
    }
  }

  /**
   * Submit transaction (write operations)
   */
  async submitTransaction(transactionBuilder: TransactionBuilder, keypair: Keypair) {
    try {
      // Build the transaction
      const transaction = transactionBuilder.build()
      
      // Simulate first
      const simResponse = await this.server.simulateTransaction(transaction)
      
      if (!SorobanRpc.Api.isSimulationSuccess(simResponse)) {
        throw new Error(`Simulation failed: ${simResponse.error}`)
      }

      // Prepare transaction - using any to avoid complex typing issues
      const preparedTransaction: any = SorobanRpc.assembleTransaction(
        transaction,
        simResponse
      )

      // Sign transaction
      preparedTransaction.sign(keypair)

      // Submit transaction
      const submitResponse = await this.server.sendTransaction(preparedTransaction)
      
      if (submitResponse.status === 'PENDING') {
        // Poll for result
        let getResponse = await this.server.getTransaction(submitResponse.hash)
        
        while (getResponse.status === SorobanRpc.Api.GetTransactionStatus.NOT_FOUND) {
          await new Promise(resolve => setTimeout(resolve, 1000))
          getResponse = await this.server.getTransaction(submitResponse.hash)
        }

        if (getResponse.status === SorobanRpc.Api.GetTransactionStatus.SUCCESS) {
          return {
            hash: submitResponse.hash,
            result: getResponse.returnValue ? scValToNative(getResponse.returnValue) : null
          }
        } else {
          throw new Error(`Transaction failed: ${getResponse.resultMetaXdr}`)
        }
      } else {
        throw new Error(`Submit failed: ${submitResponse.errorResult}`)
      }
    } catch (error) {
      console.error('Error submitting transaction:', error)
      throw error
    }
  }

  /**
   * Get server instance
   */
  getServer() {
    return this.server
  }

  /**
   * Get contract instance
   */
  getContract() {
    return this.contract
  }
} 