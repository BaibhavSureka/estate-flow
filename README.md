# EstateFlow

A decentralized P2P real estate lending platform that connects crypto holders with nominee purchasers to facilitate home buying through credit swaps.

## 🏠 What is EstateFlow?

EstateFlow is a platform that enables crypto holders to purchase real estate through a unique credit swap mechanism. Instead of traditional mortgages, users can leverage their crypto assets to buy homes through nominee purchasers who take loans on their behalf.

## 👥 User Roles

### Asset Holder (AH)
- **Who**: Crypto holders who want to buy real estate
- **What they do**: 
  - Create requests for property purchases
  - Review and accept loan proposals
  - Monitor loan fulfillment and proof submissions
  - Manage their real estate investments

### Nominee Purchaser (PB)  
- **Who**: Individuals who take loans to buy properties on behalf of Asset Holders
- **What they do**:
  - Browse available property requests
  - Submit competitive loan proposals
  - Fulfill loans and upload proof documents
  - Manage property purchases and loan repayments

## 🚀 Key Features

- **P2P Lending**: Direct connection between crypto holders and borrowers
- **Credit Swaps**: Innovative mechanism for real estate financing
- **Proof Management**: Transparent tracking of loan fulfillment
- **Real-time Monitoring**: Live updates on loan status and payments
- **Secure Transactions**: Blockchain-based verification and proof system

## 🛠️ Technology Stack

- **Frontend**: React + TypeScript + Tailwind CSS
- **Routing**: React Router for navigation
- **UI Components**: Radix UI primitives with custom styling
- **State Management**: React Context for user role management
- **Build Tool**: Vite for fast development and building

## 📱 Platform Features

### For Asset Holders
- Create property purchase requests
- Review loan proposals from multiple borrowers
- Accept the best loan terms
- Monitor loan fulfillment progress
- Track proof submissions and payments

### For Nominee Purchasers
- Browse available property requests
- Submit competitive loan proposals
- Manage accepted loans
- Upload proof documents (loan acceptance, monthly payments)
- Track loan status and completion

## 🔄 How It Works

1. **Request Creation**: Asset Holder creates a property purchase request
2. **Proposal Submission**: Nominee Purchasers submit loan proposals
3. **Proposal Selection**: Asset Holder reviews and accepts the best proposal
4. **Loan Fulfillment**: Nominee Purchaser takes the loan and buys the property
5. **Proof Management**: Regular proof submissions track loan progress
6. **Completion**: Loan is fulfilled and property ownership is transferred

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd estate-flow
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. **Build for production**
   ```bash
   npm run build
   # or
   pnpm build
   ```

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
├── contexts/           # React context providers
├── dashboard/          # Main application views
│   ├── home.tsx       # Landing page
│   ├── my-requests.tsx # Asset Holder dashboard
│   ├── my-deals.tsx   # Nominee Purchaser dashboard
│   └── ...            # Other dashboard components
├── lib/               # Utility functions and configurations
└── App.tsx           # Main application component
```

## 🔧 Development

- **TypeScript**: Full type safety throughout the application
- **ESLint**: Code quality and consistency
- **Tailwind CSS**: Utility-first CSS framework
- **Responsive Design**: Mobile-first approach

## 📄 License

This project is private and proprietary.

---

**EstateFlow** - Revolutionizing real estate financing through decentralized P2P lending and credit swaps.