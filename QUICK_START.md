# 🚀 Quick Start - MetaMask Integration

Your EstateFlow app now has full MetaMask wallet authentication! Here's how to test it:

## 🏃‍♂️ **Run the App**

```bash
cd estate-flow
pnpm run dev
```

Open your browser to `http://localhost:5173`

## 🧪 **Testing the Integration**

### 1. **Without MetaMask (Installation Test)**
- Open the app in a browser without MetaMask
- You should see a yellow "MetaMask not detected" message
- Click "Install MetaMask" to go to the official site

### 2. **With MetaMask (Connection Test)**
- Install MetaMask extension
- Refresh the page
- You should see a blue "Connect MetaMask" button
- Click it to connect your wallet

### 3. **After Connection (Success Test)**
- Once connected, you'll see:
  - Green "Connected" status in header
  - Your account address displayed
  - "Get Started" button becomes enabled
  - Success message below hero section

## 🔍 **Debug Console**

Open browser dev tools (F12) and check the console for detailed logs:

- 🔍 MetaMask detection logs
- 🔌 Connection process logs
- ✅ Success/failure messages
- ❌ Error details

### **Test Commands**
In the browser console, you can run:

```javascript
// Run all tests
metaMaskTest.runAllTests()

// Check MetaMask availability
metaMaskTest.checkAvailability()

// Test connection
metaMaskTest.testAccountRequest()

// Check existing accounts
metaMaskTest.testExistingAccounts()
```

## 🎯 **What You'll See**

### **Header Changes**
- **Before Connection**: "Connect MetaMask" button
- **After Connection**: Green "Connected" status with account info

### **Hero Section Changes**
- **Before Connection**: Blue "Secure Access Required" message
- **After Connection**: Green "Wallet Connected Successfully!" message

### **Button States**
- **Get Started**: Disabled until wallet connected
- **Buy A House**: Shows alert if not connected
- **Offer EstateFlow**: Shows alert if not connected

## 🐛 **Troubleshooting**

### **Common Issues**

1. **"MetaMask not detected"**
   - Ensure MetaMask extension is installed and enabled
   - Check if extension is unlocked
   - Try refreshing the page

2. **"Connection rejected"**
   - Check MetaMask popup for pending requests
   - Ensure MetaMask is unlocked
   - Try disconnecting and reconnecting

3. **"Request already pending"**
   - Close any open MetaMask popups
   - Wait a few seconds and try again

### **Console Errors**
- Check browser console for detailed error messages
- Look for the emoji-prefixed logs (🔍, 🔌, ✅, ❌)
- Use `metaMaskTest.runAllTests()` to diagnose issues

## 🎉 **Success Indicators**

When everything works correctly:

- ✅ MetaMask button shows "Connected" status
- ✅ Account address is displayed in header
- ✅ "Get Started" button is enabled
- ✅ Success message appears below hero
- ✅ All navigation buttons work properly
- ✅ Console shows successful connection logs

## 🔄 **Testing Different Scenarios**

1. **Switch Accounts**: Change accounts in MetaMask
2. **Disconnect**: Use the disconnect button
3. **Reconnect**: Connect again after disconnecting
4. **Network Change**: Switch networks in MetaMask
5. **Page Refresh**: Verify connection persists

## 📱 **Mobile Testing**

- Test with MetaMask mobile app
- Ensure responsive design works
- Check touch interactions

---

**🎯 You're all set!** Run `pnpm run dev` and test the MetaMask integration. The console logs will help you debug any issues.
