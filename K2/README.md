# 🔐 ZKLogin Demo for Sui Blockchain

> **Educational Demo Project** - Interactive step-by-step demonstration of ZKLogin implementation on Sui blockchain

## 📖 Overview

This is an **educational demo application** that demonstrates the ZKLogin authentication flow on the Sui blockchain. The project is designed for learning purposes and contains **intentionally unimplemented functions** that students need to complete as part of the learning process.

ZKLogin enables users to authenticate using familiar OAuth providers (Google, Facebook, etc.) while maintaining privacy through zero-knowledge proofs. This demo walks through the complete flow interactively, showing each step of the process.

## 🎯 Purpose

- **Educational Tool**: Learn ZKLogin implementation step-by-step
- **Interactive Demo**: Visual walkthrough of the entire ZKLogin flow
- **Hands-on Learning**: Complete the missing implementations yourself
- **Best Practices**: See proper project structure and React patterns

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

## 🚧 Implementation Status

### ❌ Not Implemented (Your Tasks!)

The following functions contain placeholder implementations that you need to complete:

#### 1. App Configuration (`src/hooks/useAppConfig.tsx`)
```typescript
`src/hooks/useAppConfig.tsx`
```

#### 2. Ephemeral Key Generation (`src/hooks/useEphemeral.ts`)
```typescript
`src/hooks/useEphemeral.ts`
```

#### 3. OAuth Configuration
```typescript
`src/hooks/useOauthConfig.tsx`
```

#### 4. Wallet Address Derivation
```typescript
`src/hooks/useWallet.ts`
```

#### 5. ZK Proof Payload
```typescript
`src/hooks/useZkProof.ts`
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm
- Google Cloud account (for OAuth configuration)

### Installation

1. **Clone and install dependencies**
   ```bash
   cd zklogin-demo-sui-unimplemented
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

## 📝 Files to Edit

To complete the implementation, you'll need to edit these key files:

### Primary Implementation Files
1. **`src/hooks/useAppConfig.tsx`** - App configuration setup
2. **`src/hooks/useEphemeral.ts`** - Ephemeral keypair generation
3. **`src/hooks/useOauthConfig.tsx`** - OAuth provider configuration
4. **`src/hooks/useWallet.ts`** - Wallet address derivation
5. **`src/hooks/useZkProof.ts`** - ZK proof payload preparation

### Helper Files (Reference)
- **`src/utils/zk.ts`** - ZK proof utilities (already implemented)
- **`src/utils/oauth.tsx`** - OAuth helper functions
- **`src/config/index.ts`** - Configuration constants

### Environment Configuration
- **`.env`** - Environment variables (create this file)

## 🎓 Learning Path

### Recommended Implementation Order

1. **Start with App Config** (`useAppConfig.tsx`)
   - Simple configuration setup
   - Understand the CONFIG object structure

2. **Implement OAuth Config** (`useOauthConfig.tsx`)
   - Learn OAuth provider setup
   - Understand client ID configuration

3. **Generate Ephemeral Keys** (`useEphemeral.ts`)
   - Learn Ed25519 keypair generation
   - Understand nonce derivation
   - Work with Sui SDK cryptography

4. **Derive Wallet Address** (`useWallet.ts`)
   - Learn address derivation from JWT
   - Understand address seed generation
   - Connect OAuth identity to blockchain address

5. **Complete ZK Proof** (`useZkProof.ts`)
   - Integrate all previous components
   - Prepare payload for proof generation
   - Understand zero-knowledge proof concepts

## 🔧 Development Tips

### Debugging
- Use the **Debug Panel** to inspect application state
- Check browser console for detailed error messages
- Use React DevTools for component inspection

### Testing
- Test each step individually using the interactive demo
- Verify state changes in the Debug Panel
- Test OAuth flow with real providers

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

Complete the implementations step by step and watch the ZKLogin flow come to life!
