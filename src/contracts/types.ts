// Contract-related type definitions
export interface TokenContractParams {
  name: string
  symbol: string
  decimals: number
  initial_supply: bigint
  admin: string
}

export interface TokenInfo {
  name: string
  symbol: string
  decimals: number
  total_supply: bigint
  admin: string
}

export interface ContractCall {
  contractId: string
  method: string
  args: any[]
  source?: string
}

export interface DeploymentResult {
  contractId: string
  transactionHash: string
  status: 'pending' | 'success' | 'failed'
  error?: string
}

export interface ContractState {
  isDeploying: boolean
  deploymentResult?: DeploymentResult
  error?: string
}

// Soroban contract client interface
export interface SorobanContractClient {
  deploy: (params: TokenContractParams) => Promise<DeploymentResult>
  call: (contractCall: ContractCall) => Promise<any>
  getTokenInfo: (contractId: string) => Promise<TokenInfo>
} 