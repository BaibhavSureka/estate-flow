#!/usr/bin/env node

const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

// Configuration from environment variables
const CONFIG = {
  PRIVATE_KEY: process.env.PRIVATE_KEY,
  SEPOLIA_RPC_URL: process.env.SEPOLIA_RPC_URL,
  ETHERSCAN_API_KEY: process.env.ETHERSCAN_API_KEY || "your_etherscan_api_key_here"
};

// Validate required environment variables
if (!CONFIG.PRIVATE_KEY || !CONFIG.SEPOLIA_RPC_URL) {
  console.error('❌ Missing required environment variables!');
  console.error('Please ensure .env file exists with:');
  console.error('- PRIVATE_KEY=your_private_key');
  console.error('- SEPOLIA_RPC_URL=your_rpc_url');
  process.exit(1);
}

console.log('🏠 EstateFlow Contract Deployment to Sepolia');
console.log('===========================================\n');

async function runCommand(command, cwd = process.cwd()) {
  return new Promise((resolve, reject) => {
    console.log(`📋 Running: ${command}`);
    exec(command, { cwd }, (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ Error: ${error.message}`);
        reject(error);
        return;
      }
      if (stderr) {
        console.log(`⚠️  ${stderr}`);
      }
      console.log(stdout);
      resolve(stdout);
    });
  });
}

async function checkPrerequisites() {
  console.log('🔍 Checking prerequisites...');
  
  try {
    await runCommand('forge --version');
    console.log('✅ Foundry/Forge is installed\n');
  } catch (error) {
    console.log('❌ Foundry not found. Installing...');
    console.log('Please run: curl -L https://foundry.paradigm.xyz | bash && foundryup');
    process.exit(1);
  }
}

async function deployContract() {
  const vlayerPath = path.join(process.cwd(), 'vlayer');
  
  try {
    console.log('📦 Installing OpenZeppelin contracts...');
    await runCommand('forge install OpenZeppelin/openzeppelin-contracts', vlayerPath);
    
    console.log('🔨 Compiling contracts...');
    await runCommand('forge build', vlayerPath);
    
    console.log('🚀 Deploying to Sepolia testnet...');
    
    // Set environment variables
    process.env.PRIVATE_KEY = CONFIG.PRIVATE_KEY;
    process.env.SEPOLIA_RPC_URL = CONFIG.SEPOLIA_RPC_URL;
    process.env.ETHERSCAN_API_KEY = CONFIG.ETHERSCAN_API_KEY;
    
    const deployCommand = `forge script script/Deploy.s.sol:DeployScript \\
      --rpc-url ${CONFIG.SEPOLIA_RPC_URL} \\
      --private-key ${CONFIG.PRIVATE_KEY} \\
      --broadcast \\
      -vvvv`;
    
    const output = await runCommand(deployCommand, vlayerPath);
    
    // Extract contract address from output
    const addressMatch = output.match(/EstateFlowContract deployed to: (0x[a-fA-F0-9]{40})/);
    if (addressMatch) {
      const contractAddress = addressMatch[1];
      console.log(`\n✅ Deployment successful!`);
      console.log(`📍 Contract Address: ${contractAddress}`);
      
      // Update the frontend hook with the contract address
      await updateFrontendConfig(contractAddress);
      
      console.log('\n📋 Next steps:');
      console.log('1. ✅ Contract address updated in useEstateFlowContract.ts');
      console.log('2. 🔗 Test the contract on Sepolia Etherscan');
      console.log('3. 🚀 Test the frontend form submission');
      
    } else {
      console.log('⚠️  Could not extract contract address from output');
    }
    
  } catch (error) {
    console.error('❌ Deployment failed:', error.message);
    process.exit(1);
  }
}

async function updateFrontendConfig(contractAddress) {
  const hookPath = path.join(process.cwd(), 'src/hooks/useEstateFlowContract.ts');
  
  try {
    if (fs.existsSync(hookPath)) {
      let content = fs.readFileSync(hookPath, 'utf8');
      
      // Update contract address
      content = content.replace(
        /const CONTRACT_ADDRESS = ['"].+?['"];/,
        `const CONTRACT_ADDRESS = '${contractAddress}';`
      );
      
      fs.writeFileSync(hookPath, content);
      console.log('✅ Updated CONTRACT_ADDRESS in useEstateFlowContract.ts');
    } else {
      console.log('⚠️  Frontend hook file not found, please update manually');
    }
  } catch (error) {
    console.log('⚠️  Could not update frontend config:', error.message);
  }
}

// Main execution
async function main() {
  try {
    await checkPrerequisites();
    await deployContract();
  } catch (error) {
    console.error('❌ Deployment process failed:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { deployContract, updateFrontendConfig };

