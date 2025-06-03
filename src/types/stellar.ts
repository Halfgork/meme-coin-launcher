export interface StellarNetwork {
  name: string;
  networkPassphrase: string;
  horizonUrl: string;
  sorobanRpcUrl: string;
}

export interface TokenContract {
  contractId: string;
  symbol: string;
  name: string;
  decimals: number;
  totalSupply: string;
}

export interface Transaction {
  id: string;
  hash: string;
  type: 'mint' | 'transfer' | 'swap';
  from: string;
  to?: string;
  amount: string;
  timestamp: Date;
  status: 'pending' | 'success' | 'failed';
  fee: string;
}

export interface ContractDeployment {
  contractId: string;
  deployerAddress: string;
  deployedAt: Date;
  initParams: Record<string, any>;
  status: 'deploying' | 'deployed' | 'failed';
} 