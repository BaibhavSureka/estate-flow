import { useWalletNavigation } from "@/hooks/useWalletNavigation";
import MetaMaskButton from "./MetaMaskButton";
import { Shield, CheckCircle } from "lucide-react";

export default function WalletConnectionStatus() {
  const { isConnected, account } = useWalletNavigation();

  if (isConnected && account) {
    return (
      <div className="mb-8 p-6 bg-green-500/20 border border-green-500/30 rounded-2xl backdrop-blur-sm">
        <div className="flex items-center justify-center gap-3 mb-4">
          <CheckCircle className="w-6 h-6 text-green-400" />
          <span className="text-green-300 font-medium">Wallet Connected Successfully!</span>
        </div>
        <p className="text-green-200 mb-4 text-center">
          You're all set! Your MetaMask wallet is connected and you can now access the EstateFlow platform.
        </p>
        <div className="flex items-center justify-center gap-2 bg-gray-800/50 border border-gray-700/50 text-gray-300 px-4 py-2 rounded-lg">
          <span className="text-sm font-mono">{account}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8 p-6 bg-blue-500/20 border border-blue-500/30 rounded-2xl backdrop-blur-sm">
      <div className="flex items-center justify-center gap-3 mb-4">
        <Shield className="w-6 h-6 text-blue-400" />
        <span className="text-blue-300 font-medium">Secure Access Required</span>
      </div>
      <p className="text-blue-200 mb-4 text-center">
        Connect your MetaMask wallet to access the EstateFlow platform and start your real estate investment journey.
      </p>
      <div className="flex justify-center">
        <MetaMaskButton />
      </div>
    </div>
  );
}
