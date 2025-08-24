import { Button } from "@/components/ui/button";
import { useWalletNavigation } from "@/hooks/useWalletNavigation";

interface ActionButtonProps {
  variant: "buyHouse" | "offerEstateFlow";
  className?: string;
  size?: "default" | "sm" | "lg";
}

export default function ActionButton({ variant, className = "", size = "default" }: ActionButtonProps) {
  const { isConnected, handleBuyHouse, handleOfferEstateFlow } = useWalletNavigation();

  const buttonConfig = {
    buyHouse: {
      text: "Buy A House",
      onClick: handleBuyHouse,
      variant: "outline" as const,
      className: "border-green-500/50 text-green-400 hover:bg-green-500/10 hover:text-green-300 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:shadow-green-500/25",
    },
    offerEstateFlow: {
      text: "Offer an EstateFlow",
      onClick: handleOfferEstateFlow,
      variant: "default" as const,
      className: "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg shadow-green-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1",
    },
  };

  const config = buttonConfig[variant];

  return (
    <Button
      onClick={config.onClick}
      variant={config.variant}
      size={size}
      disabled={!isConnected}
      className={`${config.className} ${className} ${
        !isConnected ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {config.text}
    </Button>
  );
}
