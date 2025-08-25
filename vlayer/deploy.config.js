// Sepolia Testnet Configuration
// Note: Sensitive values are now loaded from environment variables
require('dotenv').config({ path: '../.env' });

module.exports = {
  PRIVATE_KEY: process.env.PRIVATE_KEY,
  SEPOLIA_RPC_URL: process.env.SEPOLIA_RPC_URL,
  ETHERSCAN_API_KEY: process.env.ETHERSCAN_API_KEY || "your_etherscan_api_key_here", // Get from https://etherscan.io/apis
  
  // Network Configuration
  CHAIN_ID: 11155111, // Sepolia chain ID
  GAS_LIMIT: 3000000,
  GAS_PRICE: "20000000000", // 20 gwei
  
  // Contract Configuration
  CONTRACT_NAME: "EstateFlowContract",
  INITIAL_OWNER: "0x0000000000000000000000000000000000000000" // Will be set to deployer address
};