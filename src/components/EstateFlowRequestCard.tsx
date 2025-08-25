import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, DollarSign, TrendingUp } from "lucide-react";
import { getPropertyImage, getFallbackImage } from "@/utils/imageUtils";

interface EstateFlowRequest {
  id: string;
  propertyName: string;
  loanAmount: string;
  description: string;
  collateralType: string;
  loanTerm: string;
  yieldPreference: string;
  imageUrl: string;
  status: 'Open' | 'Pending' | 'Completed';
  interestRate: string;
  creator: string;
  createdAt: Date;
  proofs?: string;
}

interface EstateFlowRequestCardProps {
  request: EstateFlowRequest;
  onViewDetails?: (requestId: string) => void;
  className?: string;
}

export default function EstateFlowRequestCard({ 
  request, 
  onViewDetails,
  className = "" 
}: EstateFlowRequestCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open':
        return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'Pending':
        return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'Completed':
        return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      default:
        return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const formatCurrency = (amount: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(parseFloat(amount));
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  return (
    <Card className={`bg-gray-900/50 border-gray-800/50 backdrop-blur-sm hover:bg-gray-900/80 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 hover:shadow-xl group cursor-default ${className}`}>
      <CardContent className="p-0">
        {/* Property Image */}
        <div className="relative h-48 overflow-hidden rounded-t-lg">
          <img
            src={getPropertyImage(request.propertyName, request.imageUrl)}
            alt={request.propertyName}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            onError={(e) => {
              // Use fallback image if the main image fails
              const fallbackImage = getFallbackImage(request.propertyName);
              if (e.currentTarget.src !== fallbackImage) {
                e.currentTarget.src = fallbackImage;
              } else {
                // If fallback also fails, use a generic placeholder
                e.currentTarget.src = "https://placehold.co/400x200/1f2937/9ca3af?text=Property+Image";
              }
            }}
          />
          
          {/* Status Badge */}
          <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm ${getStatusColor(request.status)}`}>
            {request.status}
          </div>

          {/* New Badge for recently created requests */}
          {Date.now() - request.createdAt.getTime() < 24 * 60 * 60 * 1000 && (
            <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium bg-purple-500/80 text-white border border-purple-400/50 backdrop-blur-sm animate-pulse">
              New
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="p-6">
          {/* Property Name */}
          <div className="flex items-center gap-2 mb-3">
            <Home className="w-5 h-5 text-purple-400" />
            <h3 className="text-xl font-semibold text-white group-hover:text-purple-300 transition-colors">
              {request.propertyName}
            </h3>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-green-400" />
              <div>
                <p className="text-xs text-gray-400">Loan Amount</p>
                <p className="text-lg font-bold text-green-400">
                  {formatCurrency(request.loanAmount)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-400" />
              <div>
                <p className="text-xs text-gray-400">Interest Rate</p>
                <p className="text-lg font-bold text-blue-400">
                  {request.interestRate}%
                </p>
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Repayment:</span>
              <span className="text-white">{request.loanTerm} months</span>
            </div>
            
            {request.proofs && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Proofs:</span>
                <span className="text-white">{request.proofs}</span>
              </div>
            )}
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Created:</span>
              <span className="text-white">{formatDate(request.createdAt)}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-300 text-sm mb-4 line-clamp-2">
            {request.description}
          </p>

          {/* Action Button */}
          <Button
            onClick={() => onViewDetails?.(request.id)}
            className="w-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white transition-all duration-300 transform hover:scale-105"
          >
            View More Info
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

