# 🏠 EstateFlow Sepolia Integration Guide

## Overview
This integration adds Sepolia testnet MetaMask transaction functionality to your existing EstateFlow request form. When users submit a request, it triggers a blockchain transaction and immediately updates the dashboard.

## 📁 Files Added

### 1. `src/hooks/useEstateFlowContract.ts`
**Main contract interaction hook**
- Handles Sepolia network detection/switching
- Executes smart contract transactions
- Manages transaction states (loading, success, error)
- Returns formatted request data for UI updates

### 2. `src/components/EstateFlowSubmitHandler.tsx`
**Submit button component with transaction handling**
- Replaces your existing submit button
- Shows loading states during transaction
- Displays success/error messages
- Links to Etherscan for transaction viewing

### 3. `src/hooks/useEstateFlowDashboard.ts`
**Dashboard state management**
- Manages the list of EstateFlow requests
- Adds new requests instantly after transaction success
- Provides stats calculation (total requests, values, etc.)

### 4. `src/components/EstateFlowRequestCard.tsx`
**Enhanced request card component**
- Displays property image, status, and details
- Shows "New" badge for recently created requests
- Handles image errors gracefully

## 🚀 Integration Steps

### Step 1: Install Dependencies
```bash
npm install ethers
# or
pnpm add ethers
```

### Step 2: Configure Your Contract
In `src/hooks/useEstateFlowContract.ts`, update:

```typescript
// Replace with your deployed contract address
const CONTRACT_ADDRESS = '0xYourActualContractAddress';

// Replace with your contract ABI
const CONTRACT_ABI = [
  // Your actual contract ABI here
];

// Add your Infura key for Sepolia RPC
const SEPOLIA_RPC_URL = 'https://sepolia.infura.io/v3/YOUR_INFURA_KEY';
```

### Step 3: Update Your Request Form Component

Replace your existing submit button with the new handler:

```typescript
import EstateFlowSubmitHandler from '@/components/EstateFlowSubmitHandler';
import { useEstateFlowDashboard } from '@/hooks/useEstateFlowDashboard';

function YourRequestForm() {
  const { addNewRequest } = useEstateFlowDashboard();
  const [formData, setFormData] = useState({
    propertyName: '',
    loanAmount: '',
    description: '',
    collateralType: '',
    loanTerm: '',
    yieldPreference: '',
    propertyImage: null as File | null
  });

  const handleSuccess = (newRequest) => {
    console.log('✅ Request created:', newRequest);
    addNewRequest(newRequest);
    
    // Optional: Reset form or redirect
    // setFormData(initialState);
    // navigate('/dashboard/my-requests');
  };

  const handleError = (error) => {
    console.error('❌ Request failed:', error);
    // Handle error (show toast, etc.)
  };

  return (
    <form>
      {/* Your existing form fields */}
      
      {/* Replace your submit button with: */}
      <EstateFlowSubmitHandler
        formData={formData}
        onSuccess={handleSuccess}
        onError={handleError}
        disabled={!formData.propertyName || !formData.loanAmount}
      />
    </form>
  );
}
```

### Step 4: Update Your Dashboard Component

```typescript
import { useEstateFlowDashboard } from '@/hooks/useEstateFlowDashboard';
import EstateFlowRequestCard from '@/components/EstateFlowRequestCard';

function YourDashboard() {
  const { requests, stats } = useEstateFlowDashboard();

  return (
    <div>
      {/* Stats Display */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div>Total Requests: {stats.totalRequests}</div>
        <div>Open: {stats.openRequests}</div>
        <div>Pending: {stats.pendingRequests}</div>
        <div>Total Value: ${stats.totalValue.toLocaleString()}</div>
      </div>

      {/* Requests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {requests.map((request) => (
          <EstateFlowRequestCard
            key={request.id}
            request={request}
            onViewDetails={(id) => console.log('View details:', id)}
          />
        ))}
      </div>
    </div>
  );
}
```

## 🔧 Smart Contract Requirements

Your Solidity contract should have this structure:

```solidity
contract EstateFlowContract {
    struct EstateFlowRequest {
        uint256 id;
        address creator;
        string propertyName;
        uint256 loanAmount;
        string description;
        string collateralType;
        uint256 loanTerm;
        uint256 yieldPreference;
        string imageHash;
        uint256 createdAt;
    }

    event EstateFlowRequestCreated(
        uint256 indexed requestId,
        address indexed creator,
        string propertyName,
        uint256 loanAmount
    );

    function createEstateFlowRequest(
        string memory propertyName,
        uint256 loanAmount,
        string memory description,
        string memory collateralType,
        uint256 loanTerm,
        uint256 yieldPreference,
        string memory imageHash
    ) external returns (uint256) {
        // Your contract logic
    }
}
```

## 🎯 User Flow

1. **Fill Form**: User fills out property details and uploads image
2. **Submit**: Click "Submit Request" button
3. **Network Check**: Automatically switches to Sepolia if needed
4. **Transaction**: MetaMask prompts for transaction signature
5. **Confirmation**: Shows loading spinner while confirming
6. **Success**: New request appears instantly in dashboard with uploaded image
7. **Verification**: Transaction link to Etherscan provided

## 🛠️ Features

### ✅ Network Management
- Auto-detects current network
- Prompts to switch to Sepolia
- Adds Sepolia network if not present

### ✅ Transaction States
- Loading spinner during preparation
- MetaMask signature prompt
- Confirmation waiting with Etherscan link
- Success message with transaction details

### ✅ Error Handling
- User rejection handling
- Network errors
- Contract execution failures
- Form validation

### ✅ UI Updates
- Instant dashboard updates
- Image preview support
- Status badges for new requests
- Responsive card layout

## 🧪 Testing

1. **Connect to Sepolia**: Ensure MetaMask is on Sepolia testnet
2. **Get Test ETH**: Use Sepolia faucet for gas fees
3. **Fill Form**: Complete all required fields
4. **Submit**: Click submit and sign transaction
5. **Verify**: Check dashboard for new request
6. **Etherscan**: Verify transaction on Sepolia Etherscan

## 📝 Customization

- **Styling**: Modify Tailwind classes in components
- **Contract ABI**: Update ABI in `useEstateFlowContract.ts`
- **Image Storage**: Replace demo image handling with IPFS/cloud storage
- **Validation**: Add custom form validation in submit handler
- **Error Messages**: Customize error handling in components

## 🔐 Security Notes

- Always validate form data before contract interaction
- Use proper error handling for all MetaMask interactions
- Implement proper image upload validation
- Consider gas estimation for large transactions
- Add proper loading states to prevent double submissions

This integration provides a complete Web3 transaction flow while maintaining your existing UI structure.

