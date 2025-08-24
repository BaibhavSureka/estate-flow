import { Button } from "@/components/ui/button";
import { useWalletNavigation } from "@/hooks/useWalletNavigation";
import { ArrowRight } from "lucide-react";

interface GetStartedButtonProps {
  className?: string;
  size?: "default" | "sm" | "lg";
}

export default function GetStartedButton({ className = "", size = "lg" }: GetStartedButtonProps) {
  const { isConnected, handleGetStarted } = useWalletNavigation();

  // Only show this button when wallet is NOT connected
  if (isConnected) {
    return null;
  }

  return (
    <Button
      onClick={handleGetStarted}
      size={size}
      disabled={true}
      className={`bg-gray-600 text-gray-400 cursor-not-allowed opacity-50 px-8 py-4 text-lg font-semibold shadow-2xl transition-all duration-300 transform group relative overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
      <span className="relative z-10">Connect Wallet First</span>
      <ArrowRight className="w-5 h-5 ml-2 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
    </Button>
  );
}
