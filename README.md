# 🚀 Meme Coin Launcher

**Create and deploy viral meme coins on Stellar blockchain in seconds!** 💎🙌

[![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Stellar](https://img.shields.io/badge/Stellar-Soroban-purple?style=for-the-badge&logo=stellar)](https://stellar.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38BDF8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

## 📖 Overview

Meme Coin Launcher is a comprehensive platform for creating, deploying, and discovering meme tokens on the Stellar blockchain. With an intuitive interface, users can launch their own viral meme coins without any coding knowledge, leveraging the power of Soroban smart contracts.

### ✨ Key Features

- 🎨 **Template-Based Creation**: Choose from popular meme templates (Doge, Pepe, Chad, Stonks)
- ⚡ **Instant Deployment**: Deploy tokens to Stellar Testnet/Mainnet in under 60 seconds
- 🔗 **Wallet Integration**: Seamless connection with Stellar wallets via Stellar Wallets Kit
- 📊 **Token Discovery**: Explore trending and newest meme tokens
- 💰 **Real-time Metrics**: Track price, market cap, holders, and volume
- 🎯 **Smart Contract**: Built with Soroban SDK for secure token operations
- 📱 **Responsive Design**: Beautiful UI that works on all devices
- 🌟 **Social Features**: Built-in viral mechanics and community engagement

## 🛠 Technology Stack

### Frontend
- **Framework**: Next.js 15.3.3 (App Router)
- **Language**: TypeScript 5.0
- **Styling**: TailwindCSS 4.0
- **Animations**: Framer Motion 12.16.0
- **State Management**: Zustand 5.0.5
- **Data Fetching**: TanStack React Query 5.80.1
- **Icons**: Lucide React 0.511.0

### Blockchain
- **Blockchain**: Stellar Network
- **Smart Contracts**: Soroban SDK 22.0.1
- **Wallet Integration**: Stellar Wallets Kit 1.7.3
- **SDK**: Stellar SDK 12.3.0

### Development Tools
- **Build Tool**: Next.js with Turbopack
- **Linting**: ESLint 9
- **Package Manager**: npm

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Halfgork/meme-coin-launcher.git
cd meme-coin-launcher
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

### Soroban Contract Setup

1. **Navigate to contract directory**
```bash
cd soroban-token-contract
```

2. **Build the contract**
```bash
cargo build --target wasm32-unknown-unknown --release
```

3. **Deploy to Stellar Testnet**
```bash
soroban contract deploy \
  --wasm target/wasm32-unknown-unknown/release/soroban_token_contract.wasm \
  --source-account YOUR_SECRET_KEY \
  --network testnet
```

## 📁 Project Structure

```
meme-coin-launcher/
├── app/                          # Next.js App Router
│   ├── create/                   # Token creation pages
│   ├── explore/                  # Token discovery pages
│   ├── coin/                     # Individual token pages
│   ├── profile/                  # User profile pages
│   ├── page.tsx                  # Homepage
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
│
├── src/
│   ├── components/               # React components
│   │   ├── create/              # Token creation flow
│   │   │   ├── TokenCreationForm.tsx
│   │   │   ├── TokenPreview.tsx
│   │   │   └── TokenDeployment.tsx
│   │   ├── ui/                  # Reusable UI components
│   │   ├── layout/              # Layout components
│   │   ├── meme/                # Meme-specific components
│   │   └── shared/              # Shared components
│   │
│   ├── stores/                   # Zustand state management
│   │   ├── memeStore.ts         # Meme token state
│   │   └── walletStore.ts       # Wallet connection state
│   │
│   ├── contracts/               # Contract interactions
│   ├── lib/                     # Utility functions
│   └── types/                   # TypeScript type definitions
│
├── soroban-token-contract/       # Soroban smart contract
│   ├── src/                     # Contract source code
│   │   ├── lib.rs              # Main contract
│   │   ├── contract.rs         # Contract implementation
│   │   ├── admin.rs            # Admin functions
│   │   ├── balance.rs          # Balance management
│   │   ├── allowance.rs        # Token allowances
│   │   ├── metadata.rs         # Token metadata
│   │   └── test.rs             # Contract tests
│   ├── Cargo.toml              # Contract dependencies
│   └── README.md               # Contract documentation
│
├── public/                      # Static assets
├── package.json                 # Dependencies
├── tailwind.config.ts          # TailwindCSS configuration
├── tsconfig.json               # TypeScript configuration
└── next.config.ts              # Next.js configuration
```

## 🎯 Usage Guide

### Creating a Meme Token

1. **Connect Wallet**: Click "Connect Wallet" and choose your Stellar wallet
2. **Choose Template**: Select from Doge, Pepe, Chad, Stonks, or Custom
3. **Fill Details**: 
   - Token name and symbol
   - Description and tags
   - Initial supply and decimals
4. **Preview**: Review your token design and details
5. **Deploy**: Sign the transaction and deploy to Stellar network
6. **Success**: Your token is now live and tradeable!

### Exploring Tokens

- **Newest**: Recently created tokens
- **Trending**: Tokens with high viral scores
- **Filter**: By category (Doge, Pepe, Chad, etc.)
- **Search**: Find specific tokens by name or symbol

### Token Features

Each deployed token includes:
- ✅ **Minting**: Create initial token supply
- ✅ **Transfers**: Send tokens between accounts
- ✅ **Burning**: Reduce token supply
- ✅ **Metadata**: Name, symbol, description
- ✅ **Admin Controls**: Manage token settings
- ✅ **Allowances**: Approve spending limits

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Environment Variables

Create `.env.local` file:

```bash
# Stellar Network Configuration
NEXT_PUBLIC_STELLAR_NETWORK=testnet
NEXT_PUBLIC_STELLAR_HORIZON_URL=https://horizon-testnet.stellar.org

# Contract Addresses
NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS=
```

### Adding New Templates

1. Add template configuration in `src/stores/memeStore.ts`
2. Create template component in `src/components/create/`
3. Add styling in `src/components/ui/TokenCard.tsx`
4. Update template selection in `TokenCreationForm.tsx`

## 🔒 Smart Contract

The Soroban token contract implements the SEP-41 standard with additional features:

### Contract Functions

- `initialize(admin, decimal, name, symbol)` - Initialize token
- `mint(to, amount)` - Mint new tokens
- `transfer(from, to, amount)` - Transfer tokens
- `burn(from, amount)` - Burn tokens
- `balance(id)` - Get account balance
- `approve(from, spender, amount, expiration_ledger)` - Approve spending
- `allowance(from, spender)` - Get allowance
- `set_admin(new_admin)` - Change admin
- `admin()` - Get current admin

### Security Features

- **Admin Controls**: Only admin can mint tokens
- **Safe Math**: Overflow protection
- **Access Control**: Role-based permissions
- **Upgrade Path**: Admin can transfer control

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Use TailwindCSS for styling
- Write tests for new features
- Update documentation
- Follow conventional commit messages

## 📊 Features Roadmap

- [ ] **DeFi Integration**: Liquidity pools and swapping
- [ ] **NFT Avatars**: Custom token mascots
- [ ] **Governance**: Community voting for token decisions
- [ ] **Analytics**: Advanced token metrics and charts
- [ ] **Mobile App**: Native iOS/Android applications
- [ ] **API**: Public API for third-party integrations
- [ ] **Mainnet Launch**: Production deployment

## ⚠️ Disclaimer

This project is for educational and entertainment purposes. Meme tokens can be highly volatile and risky investments. Always do your own research and never invest more than you can afford to lose.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Stellar Development Foundation** for the amazing Stellar blockchain
- **Soroban Team** for the smart contract platform
- **Next.js Team** for the incredible React framework
- **TailwindCSS** for the utility-first CSS framework
- **The Meme Community** for endless inspiration 🚀

---

**Made with ❤️ by [Halfgork](https://github.com/Halfgork)**

*To the moon! 🚀💎🙌*
