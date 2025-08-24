// MetaMask Test Utility
// Run this in your browser console to test MetaMask functionality

export const metaMaskTest = {
  // Check if MetaMask is available
  checkAvailability: () => {
    console.log('🔍 MetaMask Availability Check:');
    console.log('window.ethereum exists:', !!window.ethereum);
    console.log('window.ethereum.isMetaMask:', window.ethereum?.isMetaMask);
    console.log('window.ethereum.isConnected:', window.ethereum?.isConnected?.());
    console.log('window.ethereum.selectedAddress:', window.ethereum?.selectedAddress);
    console.log('window.ethereum.networkVersion:', window.ethereum?.networkVersion);
  },

  // Test account request
  testAccountRequest: async () => {
    console.log('🔌 Testing account request...');
    try {
      const accounts = await window.ethereum?.request({
        method: 'eth_requestAccounts'
      });
      console.log('✅ Accounts received:', accounts);
      return accounts;
    } catch (error) {
      console.error('❌ Account request failed:', error);
      return null;
    }
  },

  // Test existing accounts
  testExistingAccounts: async () => {
    console.log('🔍 Testing existing accounts...');
    try {
      const accounts = await window.ethereum?.request({
        method: 'eth_accounts'
      });
      console.log('✅ Existing accounts:', accounts);
      return accounts;
    } catch (error) {
      console.error('❌ Existing accounts check failed:', error);
      return null;
    }
  },

  // Test chain ID
  testChainId: async () => {
    console.log('🔗 Testing chain ID...');
    try {
      const chainId = await window.ethereum?.request({
        method: 'eth_chainId'
      });
      console.log('✅ Chain ID:', chainId);
      return chainId;
    } catch (error) {
      console.error('❌ Chain ID check failed:', error);
      return null;
    }
  },

  // Run all tests
  runAllTests: async () => {
    console.log('🚀 Running all MetaMask tests...\n');
    
    metaMaskTest.checkAvailability();
    console.log('');
    
    await metaMaskTest.testExistingAccounts();
    console.log('');
    
    await metaMaskTest.testChainId();
    console.log('');
    
    console.log('📝 To test connection, run: metaMaskTest.testAccountRequest()');
    console.log('📝 To check availability, run: metaMaskTest.checkAvailability()');
  }
};

// Make it available globally for console testing
if (typeof window !== 'undefined') {
  (window as any).metaMaskTest = metaMaskTest;
}
