# 🚀 EstateFlow Smart Contract Deployment Guide

## Prerequisites

1. **Foundry** - Install if not already installed:
   ```bash
   curl -L https://foundry.paradigm.xyz | bash
   foundryup
   ```

2. **Sepolia ETH** - Your wallet should have Sepolia testnet ETH for gas fees
   - Get from: https://sepoliafaucet.com/

3. **Etherscan API Key** (Optional, for verification):
   - Get from: https://etherscan.io/apis

## 🎯 Quick Deployment

### Option 1: Using Node.js Script (Recommended)
```bash
# Deploy contract and auto-update frontend
npm run deploy-contract
```

### Option 2: Using Bash Script
```bash
# Deploy using Foundry directly
npm run deploy:sepolia
```

### Option 3: Manual Deployment
```bash
cd vlayer

# Install dependencies
forge install OpenZeppelin/openzeppelin-contracts --no-commit

# Compile contracts
forge build

# Deploy to Sepolia
forge script script/Deploy.s.sol:DeployScript \
  --rpc-url $SEPOLIA_RPC_URL \
  --private-key $PRIVATE_KEY \
  --broadcast \
  -vvvv
```

## 📋 What Gets Deployed

### EstateFlowContract Features:
- ✅ Create estate flow requests
- ✅ Store property details on-chain
- ✅ Track request status (Open, Pending, Completed, Cancelled)
- ✅ User request management
- ✅ Owner controls and emergency functions

### Contract Functions:
- `createEstateFlowRequest()` - Create new requests
- `getRequest()` - Get request details
- `getUserRequests()` - Get user's requests
- `updateRequestStatus()` - Update request status
- `getTotalRequests()` - Get total count

## 🔧 After Deployment

1. **Contract Address**: Copy from deployment output
2. **Update Frontend**: The Node.js script auto-updates `useEstateFlowContract.ts`
3. **Verify on Etherscan**: Visit the contract address on Sepolia Etherscan
4. **Test Integration**: Try submitting a request from your frontend

## 📁 File Structure

```
vlayer/
├── src/
│   └── EstateFlowContract.sol     # Main contract
├── script/
│   └── Deploy.s.sol               # Deployment script
├── deploy.config.js               # Configuration
├── deploy.sh                      # Bash deployment script
└── foundry.toml                   # Foundry config

deploy-contract.js                 # Node.js deployment script
```

## 🔍 Verification

After deployment, verify the contract works:

1. **Check on Etherscan**:
   ```
   https://sepolia.etherscan.io/address/YOUR_CONTRACT_ADDRESS
   ```

2. **Test Contract Functions**:
   - Call `getTotalRequests()` - should return 0
   - Call `owner()` - should return your wallet address

3. **Frontend Integration**:
   - Submit a test request from your form
   - Check that MetaMask prompts for transaction
   - Verify new request appears in dashboard

## 🛠️ Troubleshooting

### Common Issues:

1. **"Insufficient funds"**:
   - Get more Sepolia ETH from faucet
   
2. **"Invalid private key"**:
   - Check private key format (remove 0x prefix if present)
   
3. **"RPC URL not responding"**:
   - Verify Alchemy endpoint is correct
   
4. **"Contract verification failed"**:
   - Add Etherscan API key to config
   - Contracts will still work without verification

### Debug Steps:

1. Check wallet balance:
   ```bash
   cast balance 0xYourWalletAddress --rpc-url $SEPOLIA_RPC_URL
   ```

2. Test RPC connection:
   ```bash
   cast block-number --rpc-url $SEPOLIA_RPC_URL
   ```

3. Verify contract compilation:
   ```bash
   cd vlayer && forge build
   ```

## 🎉 Success Indicators

✅ **Successful deployment shows**:
- "EstateFlowContract deployed to: 0x..."
- Transaction hash
- Contract verification (if API key provided)
- Frontend hook automatically updated

✅ **Ready for testing when**:
- Contract address in `useEstateFlowContract.ts` is updated
- Frontend form connects to MetaMask
- Transactions appear on Sepolia Etherscan
- New requests show up in dashboard

## 🔗 Useful Links

- **Sepolia Faucet**: https://sepoliafaucet.com/
- **Sepolia Etherscan**: https://sepolia.etherscan.io/
- **Foundry Docs**: https://book.getfoundry.sh/
- **OpenZeppelin**: https://docs.openzeppelin.com/

---

**Ready to deploy? Run `npm run deploy-contract` and let's get your EstateFlow contract live! 🚀**

