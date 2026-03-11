# 🔐 ZKLogin Demo for Sui Blockchain

> **Educational Demo Project** - Interactive step-by-step demonstration of ZKLogin implementation on Sui blockchain

## 📖 Overview

This is a **fully implemented demo application** that demonstrates the complete ZKLogin authentication flow on the Sui blockchain. This project serves as a reference implementation and working example of ZKLogin integration.

ZKLogin enables users to authenticate using familiar OAuth providers (Google, Facebook, etc.) while maintaining privacy through zero-knowledge proofs. This demo provides a complete, working implementation that you can run, study, and use as a reference for your own projects.

## 🎯 Purpose

- **Reference Implementation**: Complete, working ZKLogin implementation
- **Interactive Demo**: Fully functional ZKLogin flow demonstration
- **Code Study**: Learn from a complete, production-ready implementation
- **Best Practices**: See proper project structure and React patterns in action

## ✨ Features

### Interactive 4-Step Demo

1. **Step 1**: Ephemeral Keypair Generation & App Configuration
2. **Step 2**: OAuth Authentication (Google/Facebook/etc.)
3. **Step 3**: ZK Proof Generation
4. **Step 4**: Wallet Creation & Live Transaction

### Educational Components

- 📊 **Debug Panel**: Real-time state inspection
- 🔍 **Step-by-step Explanations**: Detailed descriptions of each process
- 📱 **Responsive UI**: Modern, accessible interface
- 🎨 **Visual Progress**: Clear progress indicators and status updates

## 🛠️ Tech Stack

### Frontend Framework

- **React 19** - Latest React with modern hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server

### Blockchain Integration

- **@mysten/sui** - Official Sui SDK for blockchain interactions
- **ZKLogin** - Zero-knowledge authentication system

### Styling & UI

- **TailwindCSS 4** - Utility-first CSS framework
- **React Icons** - Icon library
- **CSS Variables** - Dynamic theming system

### State Management

- **React Context** - Global state management
- **Custom Hooks** - Modular business logic

### Additional Tools

- **jwt-decode** - JWT token parsing
- **react-toastify** - User notifications
- **react-router** - Client-side routing

## 🏗️ Project Structure

### Core Architecture

```
src/
├── components/           # React components
│   ├── ZkLogin/         # Step-by-step components
│   │   ├── Step1.tsx    # Ephemeral keypair generation
│   │   ├── Step2.tsx    # OAuth authentication
│   │   ├── Step3.tsx    # ZK proof generation
│   │   └── Step4.tsx    # Wallet & transaction
│   ├── DebugPanel.tsx   # State inspection tool
│   └── Header.tsx       # App header
├── hooks/               # Custom React hooks
│   ├── steps/          # Step-specific logic
│   └── [utility hooks] # Reusable business logic
├── contexts/           # React Context providers
├── pages/             # Route components
├── utils/             # Helper functions
└── config/            # App configuration
```

### Hook Structure

The application uses a modular hook architecture:

#### Step Hooks (`src/hooks/steps/`)

- `useStep1.tsx` - Ephemeral keypair & app config
- `useStep2.tsx` - OAuth flow management
- `useStep3.tsx` - ZK proof generation
- `useStep4.tsx` - Wallet creation & transactions

#### Utility Hooks (`src/hooks/`)

- `useAppConfig.tsx` - App configuration management
- `useEphemeral.ts` - Ephemeral keypair operations
- `useOauthConfig.tsx` - OAuth provider configuration
- `useOauthLogin.tsx` - OAuth authentication flow
- `useWallet.ts` - Wallet address derivation
- `useZkProof.ts` - Zero-knowledge proof generation
- `useLiveTransaction.tsx` - Transaction execution

#### Context (`src/contexts/`)

- `AppContext.tsx` - Global application state management

## ✅ Implementation Status

### 🎉 Fully Implemented!

This version contains complete implementations of all ZKLogin functionality:

#### 1. App Configuration (`src/hooks/useAppConfig.tsx`)

- ✅ Complete app configuration setup
- ✅ Proper CONFIG object initialization
- ✅ Environment variable handling

#### 2. Ephemeral Key Generation (`src/hooks/useEphemeral.ts`)

- ✅ Ed25519 keypair generation
- ✅ Nonce derivation from keypair
- ✅ Proper randomness and security

#### 3. OAuth Configuration (`src/hooks/useOauthConfig.tsx`)

- ✅ OAuth provider setup (Google, Facebook, etc.)
- ✅ Client ID configuration
- ✅ Redirect URI handling

#### 4. Wallet Address Derivation (`src/hooks/useWallet.ts`)

- ✅ Address derivation from JWT tokens
- ✅ Address seed generation
- ✅ OAuth identity to blockchain address mapping

#### 5. ZK Proof Generation (`src/hooks/useZkProof.ts`)

- ✅ Complete ZK proof payload preparation
- ✅ Integration with all components
- ✅ Proper proof generation flow

#### 6. Write Client Imeplemntation (`src/services/sui/writeClient.ts`)

- ✅ Complete buildAndSignTransfer function
- ✅ Complete executeZkLoginTransaction function

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm
- Google Cloud account (for OAuth configuration)

### Installation

1. **Clone and install dependencies**

   ```bash
   cd zklogin-demo-sui
   npm install
   # or
   yarn install
   ```

2. **Set up environment variables**
   Create a `.env` file in the root directory:

   ```typescript
   Check the `.env.example` file for the required environment variables
   ```

3. **Start development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📝 Implementation Reference

This fully implemented version contains complete code for all ZKLogin functionality:

### Core Implementation Files

1. **`src/hooks/useAppConfig.tsx`** - Complete app configuration setup
2. **`src/hooks/useEphemeral.ts`** - Full ephemeral keypair generation
3. **`src/hooks/useOauthConfig.tsx`** - Complete OAuth provider configuration
4. **`src/hooks/useWallet.ts`** - Full wallet address derivation
5. **`src/hooks/useZkProof.ts`** - Complete ZK proof payload preparation

### Supporting Files

- **`src/utils/zk.ts`** - ZK proof utilities and helpers
- **`src/utils/oauth.tsx`** - OAuth helper functions
- **`src/config/index.ts`** - Configuration constants
- **`src/contexts/AppContext.tsx`** - Global state management

### Environment Configuration

- **`.env`** - Environment variables (create this file based on .env.example)

## 🎓 Study Guide

### Recommended Study Order

1. **Study App Config** (`useAppConfig.tsx`)

   - Examine configuration setup patterns
   - Understand the CONFIG object structure
   - Learn environment variable handling

2. **Analyze OAuth Config** (`useOauthConfig.tsx`)

   - Study OAuth provider setup
   - Understand client ID configuration
   - Learn redirect URI patterns

3. **Examine Ephemeral Keys** (`useEphemeral.ts`)

   - Study Ed25519 keypair generation
   - Understand nonce derivation
   - Learn Sui SDK cryptography usage

4. **Study Wallet Derivation** (`useWallet.ts`)

   - Examine address derivation from JWT
   - Understand address seed generation
   - Learn OAuth identity to blockchain address mapping

5. **Analyze ZK Proof** (`useZkProof.ts`)

   - Study component integration
   - Understand payload preparation
   - Learn zero-knowledge proof concepts

6. **Study Write Client** (`src/services/sui/writeClient.ts`)
   - Examine transaction building and signing flow
   - Understand coin splitting and recipient transfer operations
   - Review gRPC-based zkLogin transaction execution

## 🔧 Development Tips

### Debugging

- Use the **Debug Panel** to inspect application state
- Check browser console for detailed error messages
- Use React DevTools for component inspection

### Testing

- Run the complete ZKLogin flow using the interactive demo
- Monitor state changes in the Debug Panel
- Test OAuth flow with real providers
- Verify transaction execution on Sui devnet

## 📚 Resources

### Sui Documentation

- [Sui ZKLogin Guide](https://docs.sui.io/guides/developer/cryptography/zklogin-integration)
- [Sui SDK Documentation](https://sdk.mystenlabs.com/)

### ZKLogin Resources

- [ZKLogin Overview](https://docs.sui.io/concepts/cryptography/zklogin)
- [OAuth Integration](https://docs.sui.io/guides/developer/cryptography/zklogin-integration#oauth-flow)

## 🤝 Contributing

This is an educational project. Feel free to:

- Submit improvements to the learning experience
- Add more detailed explanations
- Enhance the UI/UX
- Add additional OAuth providers

## 📄 License

```code
MIT
```

---

**Happy Learning! 🎉**

Explore the complete ZKLogin implementation and see how all the pieces work together!
