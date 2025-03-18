# Base L2 Token Monitor

A comprehensive token monitoring dashboard for the Base L2 blockchain network. This application provides real-time analytics, AI-powered insights, and comprehensive monitoring tools for tokens on the Base L2 network.

## Features

### User Authentication
- Connect crypto wallets (MetaMask, WalletConnect)
- Secure session management
- Base L2 network authentication

### Token Registration System
- Add tokens by contract address
- Automated metadata fetching
- Custom alerts and thresholds
- Token management interface

### Monitoring Dashboard
- Real-time price tracking
- Historical price charts
- Transaction volume visualization
- Liquidity pool analysis
- Market cap and token metrics

### AI-Powered Analysis
- Automated report generation
- Sentiment analysis from social media
- Price movement pattern recognition
- Risk assessment scoring
- Trading volume anomaly detection
- Export options (PDF/CSV)

## Technology Stack

- **Frontend**: Next.js 14+, React 19, TypeScript
- **Design**: Tailwind CSS, ShadCn UI components
- **Blockchain Integration**: Ethers.js, viem, wagmi
- **State Management**: Zustand
- **Charts**: Chart.js, react-chartjs-2
- **AI Analysis**: Custom NLP processing, time-series analysis

## Project Structure

```
src/
├── app/                  # Next.js App Router
│   ├── auth/             # Authentication pages
│   ├── dashboard/        # Dashboard section
│   │   ├── analytics/    # Analytics pages
│   │   ├── insights/     # AI insights pages
│   │   ├── reports/      # Report generation
│   │   ├── settings/     # User settings
│   │   └── tokens/       # Token management
│   └── api/              # API routes
├── components/           # Shared React components
│   ├── ui/               # UI components from ShadCn
│   ├── charts/           # Chart components
│   ├── forms/            # Form components
│   └── token/            # Token-specific components
├── lib/                  # Shared utility functions
│   ├── blockchain/       # Blockchain integration
│   ├── api/              # API client functions
│   └── ai/               # AI analysis functions
└── store/                # State management
```

## Getting Started

### Prerequisites

- Node.js 18+
- Yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/base-l2-token-monitor.git
   cd base-l2-token-monitor
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Start the development server:
   ```bash
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Data Flow

1. User connects wallet (auth)
2. Registered tokens are stored and associated with user account
3. Dashboard pulls data from Base L2 blockchain RPC endpoints
4. AI analysis processes on-chain data and external sources
5. Visualizations are updated in real-time

## License

MIT

---

Built with ❤️ for the Base L2 ecosystem
