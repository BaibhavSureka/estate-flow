# MetaMask Integration for EstateFlow

This is a modular MetaMask authentication solution that you can easily integrate into your existing EstateFlow app without rewriting everything.

## What's Included

1. **`useMetaMask` Hook** - Handles all MetaMask logic
2. **`MetaMaskButton` Component** - Ready-to-use connection button
3. **`MetaMaskIntegration` Component** - Example integration pattern
4. **TypeScript Support** - Full type safety

## Quick Integration

### 1. Add to Your Landing Page Header

Replace your existing header buttons with the MetaMask button:

```tsx
// In your home.tsx header section
import MetaMaskButton from "@/components/MetaMaskButton";

// Replace your existing buttons with:
<div className="flex gap-3">
  <MetaMaskButton />
  <Button onClick={handleBuyHouse} variant="outline">
    Buy A House
  </Button>
  <Button onClick={handleOfferEstateFlow}>
    Offer an EstateFlow
  </Button>
</div>
```

### 2. Update Your Get Started Button

Modify your existing "Get Started" button to check wallet connection:

```tsx
// In your home.tsx
import { useMetaMask } from "@/hooks/useMetaMask";

export default function Landing() {
  const navigate = useNavigate();
  const { isConnected, account } = useMetaMask();

  const handleGetStarted = () => {
    if (isConnected && account) {
      navigate("/dashboard/my-requests");
    } else {
      alert("Please connect your MetaMask wallet first!");
    }
  };

  // In your button JSX:
  <Button 
    onClick={handleGetStarted}
    disabled={!isConnected}
    className={`... ${isConnected ? 'enabled-styles' : 'disabled-styles'}`}
  >
    {isConnected ? "Get Started" : "Connect Wallet First"}
  </Button>
}
```

### 3. Add Connection Status Display

Add this below your hero section to show connection status:

```tsx
{/* Wallet Connection Status */}
{!isConnected && (
  <div className="mb-8 p-6 bg-blue-500/20 border border-blue-500/30 rounded-2xl backdrop-blur-sm">
    <div className="flex items-center justify-center gap-3 mb-4">
      <Shield className="w-6 h-6 text-blue-400" />
      <span className="text-blue-300 font-medium">Secure Access Required</span>
    </div>
    <p className="text-blue-200 mb-4">
      Connect your MetaMask wallet to access the EstateFlow platform.
    </p>
    <MetaMaskButton />
  </div>
)}
```

## How It Works

### 1. **MetaMask Detection**
- Automatically checks if MetaMask is installed
- Shows install prompt if not available
- Links to official MetaMask download

### 2. **Wallet Connection**
- User clicks "Connect MetaMask"
- MetaMask popup requests account access
- User approves connection
- Account info is displayed

### 3. **Protected Access**
- "Get Started" button is disabled until connected
- Once connected, user can access the app
- Account address is shown with copy functionality

## Features

- ✅ **Automatic Detection** - Checks for MetaMask on page load
- ✅ **Installation Guide** - Prompts users to install if missing
- ✅ **Connection Management** - Connect/disconnect with proper state
- ✅ **Error Handling** - Graceful handling of rejections and errors
- ✅ **Account Display** - Shows connected account with copy function
- ✅ **Event Listening** - Handles account changes and disconnections
- ✅ **TypeScript Support** - Full type safety throughout

## Customization

### Button Styling
```tsx
<MetaMaskButton 
  size="lg"
  variant="outline"
  className="custom-styles"
/>
```

### Connection Callback
```tsx
<MetaMaskButton 
  onConnect={(account) => {
    console.log("Connected:", account);
    // Your custom logic here
  }}
/>
```

### Custom Error Messages
The hook automatically handles common errors:
- Connection rejected by user
- Request already pending
- MetaMask not installed
- Network issues

## State Management

The `useMetaMask` hook provides:

```tsx
const {
  isInstalled,    // Boolean: MetaMask detected
  isConnected,    // Boolean: Wallet connected
  isConnecting,   // Boolean: Connection in progress
  account,        // String: Connected account address
  error,          // String: Error message if any
  connect,        // Function: Trigger connection
  disconnect,     // Function: Disconnect wallet
  clearError      // Function: Clear error state
} = useMetaMask();
```

## Browser Support

- **Chrome/Edge**: Full support with MetaMask extension
- **Firefox**: Full support with MetaMask extension
- **Safari**: Full support with MetaMask extension
- **Mobile**: MetaMask mobile app integration

## Testing

1. **Without MetaMask**: Should show install prompt
2. **With MetaMask**: Should show connect button
3. **After Connection**: Should show account info and enable "Get Started"
4. **Account Change**: Should update automatically
5. **Disconnect**: Should return to connect state

## Troubleshooting

### Common Issues

1. **"MetaMask not detected"**
   - Ensure MetaMask extension is installed
   - Check if extension is enabled
   - Try refreshing the page

2. **"Connection rejected"**
   - User denied the connection request
   - Check MetaMask popup for pending requests

3. **"Request already pending"**
   - Close MetaMask popup and try again
   - Check MetaMask for pending connection requests

### Development Tips

- Use browser dev tools to check console for errors
- Test with different MetaMask accounts
- Verify network settings in MetaMask
- Check if MetaMask is unlocked

## Next Steps

Once integrated, you can:

1. **Add Route Protection** - Redirect unauthenticated users
2. **Store Connection State** - Persist wallet connection
3. **Add Network Switching** - Support different Ethereum networks
4. **Implement Signing** - Add message signing functionality
5. **Add Transaction Support** - Handle blockchain transactions

---

**That's it!** This solution gives you a complete MetaMask integration that you can drop into your existing app without any major rewrites.
